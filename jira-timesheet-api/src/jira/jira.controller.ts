import { Controller, Get } from '@nestjs/common';
import { JiraService, DailyWorklogsResponse } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('worklogs/current-month/daily')
  async getDailyWorklogsForCurrentMonth(): Promise<DailyWorklogsResponse> {
    return this.jiraService.getDailyWorklogsForCurrentMonth();
  }
} 