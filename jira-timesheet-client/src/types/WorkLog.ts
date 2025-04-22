export interface WorkLog {
  issueKey: string;
  summary: string;
  dailyLogs: { [key: string]: number };
  total: number;
}

export interface DailyLog {
  date: string;
  totalTimeSpentSeconds: number;
  totalTimeSpent: string;
}

export interface DailyWorkLogs {
  daily: DailyLog[];
}

export interface TaskWorkLog {
  issueKey: string;
  summary: string;
  dailyLogs: { [key: string]: number };  // key is date, value is hours
  total: number;
}

export interface DailyTotals {
  [key: string]: number;  // key is date, value is total hours for that day
}

interface Author {
  accountId: string;
  displayName: string;
  emailAddress: string;
  active: boolean;
}

interface WorkLogEntry {
  key: string;
  id: string;
  issueId: string;
  summary: string;
  author: Author;
  timeSpent: string;
  timeSpentSeconds: number;
  started: string;
}

interface DailyEntry {
  date: string;
  totalTimeSpentSeconds: number;
  totalTimeSpent: string;
  worklogs: WorkLogEntry[];
}

export interface WorkLogResponse {
  daily: DailyEntry[];
} 