"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/use-projects";
import Link from "next/link";

export function ProjectProgress() {
  const { projects } = useProjects();
  
  // Show only active projects, sorted by progress
  const activeProjects = projects
    .filter(p => p.status === 'active' || p.status === 'planning')
    .sort((a, b) => a.progress - b.progress)
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    const colors = {
      'planning': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'active': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'on-hold': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[status as keyof typeof colors] || colors.planning;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'border-l-gray-400',
      'medium': 'border-l-yellow-400',
      'high': 'border-l-orange-400',
      'critical': 'border-l-red-400'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getDaysRemaining = (dueDate: Date) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Project Progress</CardTitle>
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="text-xs">
              View All Projects →
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProjects.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">No active projects</p>
            <Button size="sm">Create Your First Project</Button>
          </div>
        ) : (
          activeProjects.map((project) => {
            const daysRemaining = getDaysRemaining(project.dueDate);
            const isOverdue = daysRemaining < 0;
            const isUrgent = daysRemaining <= 7 && daysRemaining >= 0;
            
            return (
              <div 
                key={project.id} 
                className={`rounded-lg border-l-4 bg-gray-50 p-4 dark:bg-gray-800 ${getPriorityColor(project.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h4>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {project.description}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        📅 Due {new Date(project.dueDate).toLocaleDateString()}
                      </span>
                      <span>
                        👥 {project.teamMembers.length} members
                      </span>
                      <span>
                        ✓ {project.completedTasksCount}/{project.tasksCount} tasks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress 
                    value={project.progress} 
                    className="h-2"
                  />
                </div>

                {/* Due Date Warning */}
                {(isOverdue || isUrgent) && (
                  <div className={`mt-3 flex items-center space-x-2 text-xs ${
                    isOverdue 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    <span>{isOverdue ? '⚠️' : '⏰'}</span>
                    <span>
                      {isOverdue 
                        ? `Overdue by ${Math.abs(daysRemaining)} days`
                        : `Due in ${daysRemaining} days`
                      }
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mt-3 flex space-x-2">
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Add Task
                  </Button>
                </div>
              </div>
            );
          })
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {projects.filter(p => p.status === 'active').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {projects.filter(p => p.status === 'planning').length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Planning</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Avg Progress</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}