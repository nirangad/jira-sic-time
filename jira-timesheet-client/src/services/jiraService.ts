import { WorkLogResponse } from '../types/WorkLog';

// Using relative paths since nginx will handle the proxying
const BASE_URL = '';

export const fetchCurrentMonthWorkLogs = async (): Promise<WorkLogResponse> => {
  const response = await fetch(`${BASE_URL}/jira/worklogs/current-month`);
  if (!response.ok) {
    throw new Error('Failed to fetch work logs');
  }
  return response.json();
};

export const fetchWorkLogsByMonth = async (year: number, month: number): Promise<WorkLogResponse> => {
  // Month should be 1-12
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }
  
  const response = await fetch(`${BASE_URL}/jira/worklogs/${year}/${month}`);
  if (!response.ok) {
    throw new Error('Failed to fetch work logs');
  }
  return response.json();
}; 