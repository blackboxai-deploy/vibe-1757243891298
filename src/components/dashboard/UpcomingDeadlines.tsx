"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTasks } from "@/hooks/use-tasks";
import { useProjects } from "@/hooks/use-projects";
import { useTeam } from "@/hooks/use-team";
import Link from "next/link";

export function UpcomingDeadlines() {
  const { tasks } = useTasks();
  const { projects } = useProjects();
  const { teamMembers } = useTeam();

  // Get tasks with upcoming deadlines (next 14 days)
  const now = new Date();
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(now.getDate() + 14);

  const upcomingTasks = tasks
    .filter(task => {
      if (!task.dueDate || task.status === 'completed') return false;
      const dueDate = new Date(task.dueDate);
      return dueDate >= now && dueDate <= twoWeeksFromNow;
    })
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 6);

  const getDaysUntilDue = (dueDate: Date) => {
    const diff = dueDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'high': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return 'text-red-600 dark:text-red-400';
    if (days <= 3) return 'text-orange-600 dark:text-orange-400';
    if (days <= 7) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getAssigneeName = (assigneeId: string) => {
    const assignee = teamMembers.find(member => member.id === assigneeId);
    return assignee?.name || 'Unassigned';
  };

  const getProjectName = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name || 'Unknown Project';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Next 14 Days
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => {
                const daysUntil = getDaysUntilDue(new Date(task.dueDate!));
                return (
                  <div key={task.id} className="border rounded-lg p-3 bg-white dark:bg-gray-800 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm text-gray-900 dark:text-white">
                          {task.title}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          📁 {getProjectName(task.projectId)}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        👤 {getAssigneeName(task.assigneeId || '')}
                      </span>
                      <span className={getUrgencyColor(daysUntil)}>
                        {daysUntil === 0 ? '🔥 Due today' : 
                         daysUntil === 1 ? '⚡ Due tomorrow' : 
                         `📅 ${daysUntil} days left`}
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        task.status === 'todo' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' :
                        task.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                        task.status === 'review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {task.status === 'todo' ? '📋 To Do' :
                         task.status === 'in-progress' ? '🔄 In Progress' :
                         task.status === 'review' ? '👀 In Review' :
                         '✅ Completed'}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  No upcoming deadlines!
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  You&apos;re all caught up for the next 2 weeks
                </p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="mt-4 pt-4 border-t">
          <Link href="/calendar">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              📅 View Full Calendar →
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}