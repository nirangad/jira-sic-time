import { Controller, Get, Param } from '@nestjs/common';
import { JiraService, DailyWorklogsResponse } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

    @Get('worklogs/current-month')
    async getDailyWorklogsForCurrentMonth(): Promise<DailyWorklogsResponse> {
      return this.jiraService.getDailyWorklogsForCurrentMonth();
    }

    @Get('worklogs/:year/:month')
    async getWorklogsForMonth(@Param('year') year: string, @Param('month') month: string): Promise<DailyWorklogsResponse> {
      return this.jiraService.getWorklogsForMonth(parseInt(year), parseInt(month));
    }
}