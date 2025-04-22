import { useEffect, useState } from 'react';
import { WorkLogResponse } from '../types/WorkLog';
import './TimeSheet.css';

interface TaskSummary {
  issueKey: string;
  summary: string;
  dailyHours: { [key: string]: number };
  total: number;
}

interface FormattedData {
  tasks: TaskSummary[];
  dailyTotals: { [key: string]: number };
  grandTotal: number;
  dates: string[];
}

const TimeSheet = () => {
  const [workLogs, setWorkLogs] = useState<FormattedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkLogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/jira/worklogs/current-month/daily');
        if (!response.ok) {
          throw new Error('Failed to fetch work logs');
        }
        const data: WorkLogResponse = await response.json();
        const formattedData = transformData(data);
        setWorkLogs(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkLogs();
  }, []);

  const transformData = (data: WorkLogResponse): FormattedData => {
    const taskMap = new Map<string, TaskSummary>();
    const dailyTotals: { [key: string]: number } = {};
    let grandTotal = 0;
    const dates = data.daily.map(d => d.date).sort();

    // Initialize task map with empty daily hours
    data.daily.forEach(day => {
      day.worklogs.forEach(log => {
        if (!taskMap.has(log.key)) {
          taskMap.set(log.key, {
            issueKey: log.key,
            summary: log.summary,
            dailyHours: {},
            total: 0
          });
        }
      });
    });

    // Fill in the hours
    data.daily.forEach(day => {
      const dailyTotal = day.worklogs.reduce((acc, log) => {
        const hours = log.timeSpentSeconds / 3600;
        const task = taskMap.get(log.key)!;
        task.dailyHours[day.date] = (task.dailyHours[day.date] || 0) + hours;
        task.total += hours;
        return acc + hours;
      }, 0);

      dailyTotals[day.date] = dailyTotal;
      grandTotal += dailyTotal;
    });

    return {
      tasks: Array.from(taskMap.values()),
      dailyTotals,
      grandTotal,
      dates
    };
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!workLogs) return <div>No data available</div>;

  const monthYear = workLogs.dates.length > 0 ? formatDate(workLogs.dates[0]) : '';

  return (
    <div className="timesheet-container">
      <div className="timesheet-header">
        <h2>JIRA Tasks</h2>
        <h2>{monthYear}</h2>
      </div>
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>Issue Key</th>
            <th>Issue Summary</th>
            {workLogs.dates.map(date => (
              <th key={date} className="hours">
                {new Date(date).getDate()}
              </th>
            ))}
            <th className="hours">Task Total</th>
          </tr>
        </thead>
        <tbody>
          {workLogs.tasks.map(task => (
            <tr key={task.issueKey}>
              <td className="issue-key">{task.issueKey}</td>
              <td>{task.summary}</td>
              {workLogs.dates.map(date => (
                <td key={date} className="hours">
                  {task.dailyHours[date] ? `${task.dailyHours[date]}h` : ''}
                </td>
              ))}
              <td className="hours task-total">{task.total}h</td>
            </tr>
          ))}
          <tr className="totals-row">
            <td colSpan={2}>Totals</td>
            {workLogs.dates.map(date => (
              <td key={date} className="hours">
                {workLogs.dailyTotals[date] ? `${workLogs.dailyTotals[date]}h` : ''}
              </td>
            ))}
            <td className="hours task-total">{workLogs.grandTotal}h</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimeSheet; 