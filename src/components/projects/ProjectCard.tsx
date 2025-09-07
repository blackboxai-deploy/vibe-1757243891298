"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Project } from "@/lib/types";
import { useTeam } from "@/hooks/use-team";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { teamMembers } = useTeam();
  
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
      'low': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'high': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    };
    return colors[priority as keyof typeof colors] || colors.low;
  };

  const getDaysRemaining = () => {
    const now = new Date();
    const due = new Date(project.dueDate);
    const diff = due.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysRemaining = getDaysRemaining();
  const isOverdue = daysRemaining < 0;
  const isUrgent = daysRemaining <= 7 && daysRemaining >= 0;

  const getTeamMembersByIds = (memberIds: string[]) => {
    return memberIds.map(id => teamMembers.find(member => member.id === id)).filter(Boolean);
  };

  const projectTeam = getTeamMembersByIds(project.teamMembers);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div 
            className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: project.color }}
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-lg">⋯</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <span className="mr-2">✏️</span>
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="mr-2">📋</span>
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="mr-2">📤</span>
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <span className="mr-2">🗑️</span>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <Link href={`/projects/${project.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              {project.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Badge className={getStatusColor(project.status)}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
          </Badge>
          <Badge className={getPriorityColor(project.priority)}>
            {project.priority}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {project.progress}%
            </span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="font-semibold text-gray-900 dark:text-white">
              {project.completedTasksCount}/{project.tasksCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
            <div className="font-semibold text-gray-900 dark:text-white">
              {project.teamMembers.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Members</div>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {projectTeam.slice(0, 4).map((member) => (
              <Avatar key={member?.id} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={member?.avatar} alt={member?.name} />
                <AvatarFallback className="text-xs">
                  {member?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.teamMembers.length > 4 && (
              <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-background flex items-center justify-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  +{project.teamMembers.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            📅 Due {new Date(project.dueDate).toLocaleDateString()}
          </span>
          {(isOverdue || isUrgent) && (
            <span className={`text-xs ${
              isOverdue 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-yellow-600 dark:text-yellow-400'
            }`}>
              {isOverdue 
                ? `⚠️ ${Math.abs(daysRemaining)} days overdue`
                : `⏰ ${daysRemaining} days left`
              }
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Link href={`/projects/${project.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <span className="text-sm">➕</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}