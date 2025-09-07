"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "@/lib/types";
import { useProjects } from "@/hooks/use-projects";
import { useTeam } from "@/hooks/use-team";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { projects } = useProjects();
  const { teamMembers } = useTeam();

  const project = projects.find(p => p.id === task.projectId);
  const assignee = teamMembers.find(m => m.id === task.assigneeId);

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'high': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getDaysRemaining = () => {
    if (!task.dueDate) return null;
    const now = new Date();
    const due = new Date(task.dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysRemaining = getDaysRemaining();
  const isOverdue = daysRemaining !== null && daysRemaining < 0;
  const isUrgent = daysRemaining !== null && daysRemaining <= 3 && daysRemaining >= 0;

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
              {task.title}
            </h4>
            <Badge className={getPriorityColor(task.priority)} size="sm">
              {task.priority}
            </Badge>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" size="sm" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 2 && (
                <Badge variant="outline" size="sm" className="text-xs">
                  +{task.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {/* Project */}
          {project && (
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {project.name}
              </span>
            </div>
          )}

          {/* Subtasks Progress */}
          {task.subtasks.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>📋</span>
              <span>
                {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              {assignee && (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={assignee.avatar} alt={assignee.name} />
                  <AvatarFallback className="text-xs">
                    {assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={`text-xs ${
                isOverdue 
                  ? 'text-red-600 dark:text-red-400 font-medium' 
                  : isUrgent 
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {isOverdue ? (
                  <span>⚠️ Overdue</span>
                ) : daysRemaining === 0 ? (
                  <span>📅 Due today</span>
                ) : daysRemaining === 1 ? (
                  <span>📅 Due tomorrow</span>
                ) : (
                  <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}