"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTasks } from "@/hooks/use-tasks";
import { useProjects } from "@/hooks/use-projects";
import { useTeam } from "@/hooks/use-team";

export function StatsCards() {
  const { tasks } = useTasks();
  const { projects } = useProjects();
  const { teamMembers } = useTeam();

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      change: "+2",
      changeType: "increase" as const,
      icon: "📁",
      description: "Active and completed projects"
    },
    {
      title: "Active Tasks",
      value: tasks.filter(t => t.status !== 'completed').length,
      change: "-3",
      changeType: "decrease" as const,
      icon: "✓",
      description: "Tasks in progress"
    },
    {
      title: "Completed Tasks",
      value: tasks.filter(t => t.status === 'completed').length,
      change: "+8",
      changeType: "increase" as const,
      icon: "✅",
      description: "Tasks completed this month"
    },
    {
      title: "Team Members",
      value: teamMembers.filter(m => m.status === 'active').length,
      change: "+1",
      changeType: "increase" as const,
      icon: "👥",
      description: "Active team members"
    },
    {
      title: "Overdue Tasks",
      value: tasks.filter(t => {
        if (!t.dueDate || t.status === 'completed') return false;
        return new Date(t.dueDate) < new Date();
      }).length,
      change: "-1",
      changeType: "decrease" as const,
      icon: "⚠️",
      description: "Tasks past due date"
    },
    {
      title: "Projects On Track",
      value: projects.filter(p => p.status === 'active' && p.progress >= 50).length,
      change: "+1",
      changeType: "increase" as const,
      icon: "🎯",
      description: "Projects meeting milestones"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </CardTitle>
            <div className="text-xl opacity-70">
              {stat.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
              <Badge 
                variant={stat.changeType === 'increase' ? 'default' : 'secondary'}
                className={`text-xs ${
                  stat.changeType === 'increase' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {stat.change}
              </Badge>
              <span>vs last month</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}