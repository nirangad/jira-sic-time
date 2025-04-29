import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';

interface Author {
  displayName: string;
  emailAddress: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

interface WorklogEntry {
  key: string;
  id: string;
  issueId: string;
  summary: string;
  self: string;
  author: Author;
  updateAuthor: Author;
  created: string;
  updated: string;
  started: string;
  timeSpent: string;
  timeSpentSeconds: number;
}

interface DailyWorklog {
  date: string;
  totalTimeSpent: string;
  totalTimeSpentSeconds: number;
  worklogs: WorklogEntry[];
}

export interface DailyWorklogsResponse {
  daily: DailyWorklog[];
}

@Injectable()
export class JiraService implements OnModuleInit {
  private jiraHost: string;
  private jiraEmail: string;
  private jiraApiToken: string;

  onModuleInit() {
    this.validateEnvironment();
  }

  private validateEnvironment() {
    const requiredEnvVars = {
      JIRA_HOST: process.env.JIRA_HOST,
      JIRA_EMAIL: process.env.JIRA_EMAIL,
      JIRA_API_TOKEN: process.env.JIRA_API_TOKEN,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(', ')}`
      );
    }

    this.jiraHost = requiredEnvVars.JIRA_HOST as string;
    this.jiraEmail = requiredEnvVars.JIRA_EMAIL as string;
    this.jiraApiToken = requiredEnvVars.JIRA_API_TOKEN as string;
  }

  private getAuthHeader(): string {
    const auth = Buffer.from(`${this.jiraEmail}:${this.jiraApiToken}`).toString(
      'base64'
    );
    return `Basic ${auth}`;
  }

  private async fetchJiraData() {
    const jql = 'worklogAuthor = currentUser() AND worklogDate >= startOfMonth() AND worklogDate <= endOfMonth()';
    
    const response = await axios.get(
      `https://${this.jiraHost}/rest/api/3/search`,
      {
        headers: {
          'Authorization': this.getAuthHeader(),
          'Accept': 'application/json',
        },
        params: {
          jql,
          fields: 'worklog,summary,key',
          maxResults: 100,
        },
      }
    );

    return response.data.issues;
  }

  private formatTimeSpent(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }

  async getDailyWorklogsForCurrentMonth(): Promise<DailyWorklogsResponse> {
    try {
      const issues = await this.fetchJiraData();
      console.table(issues);


      // Create a map to store worklogs by date
      const dailyWorklogsMap: { [key: string]: DailyWorklog } = {};
      
      // Process each issue and its worklogs
      issues.forEach((issue: any) => {
        const worklogs = issue.fields.worklog?.worklogs || [];
        console.log("Work Logs", worklogs.length, issue.fields.key);
        
        worklogs.forEach((worklog: any) => {
          const date = worklog.started.split('T')[0]; // Use started date for grouping
          
          if (!dailyWorklogsMap[date]) {
            dailyWorklogsMap[date] = {
              date,
              totalTimeSpentSeconds: 0,
              totalTimeSpent: '0h',
              worklogs: [],
            };
          }
          
          const worklogEntry: WorklogEntry = {
            key: issue.key,
            id: worklog.id,
            issueId: issue.id,
            summary: issue.fields.summary,
            self: worklog.self,
            author: worklog.author,
            updateAuthor: worklog.updateAuthor,
            created: worklog.created,
            updated: worklog.updated,
            started: worklog.started,
            timeSpent: worklog.timeSpent,
            timeSpentSeconds: worklog.timeSpentSeconds,
          };
          
          dailyWorklogsMap[date].worklogs.push(worklogEntry);
          dailyWorklogsMap[date].totalTimeSpentSeconds += worklog.timeSpentSeconds;
          dailyWorklogsMap[date].totalTimeSpent = this.formatTimeSpent(dailyWorklogsMap[date].totalTimeSpentSeconds);
        });
      });

      // Convert map to array and sort by date
      const dailyWorklogs = Object.values(dailyWorklogsMap);
      dailyWorklogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      return {
        daily: dailyWorklogs,
      };
    } catch (error) {
      console.error('Error fetching JIRA daily worklogs:', error);
      throw error;
    }
  }
} 