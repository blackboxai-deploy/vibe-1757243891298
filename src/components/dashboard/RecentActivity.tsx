"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockActivities, mockUsers } from "@/lib/data";
// import { formatDistanceToNow } from "date-fns";

const formatDistanceToNow = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

export function RecentActivity() {
  const activities = mockActivities.slice(0, 8); // Show latest 8 activities

  const getActivityIcon = (type: string) => {
    const icons = {
      'task_completed': '✅',
      'task_updated': '📝',
      'task_created': '➕',
      'task_assigned': '👤',
      'project_created': '📁',
      'project_updated': '🔄',
      'comment_added': '💬',
      'file_uploaded': '📎'
    };
    return icons[type as keyof typeof icons] || '📌';
  };

  const getActivityColor = (type: string) => {
    const colors = {
      'task_completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'task_updated': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'task_created': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'task_assigned': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'project_created': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
      'project_updated': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'comment_added': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'file_uploaded': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  const getUserById = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <Badge variant="secondary" className="text-xs">
            Live Updates
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {activities.map((activity) => {
              const user = getUserById(activity.userId);
              return (
                <div key={activity.id} className="flex items-start space-x-4">
                  {/* Activity Icon */}
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>

                    {/* User info */}
                    {user && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          by {user.name}
                        </span>
                      </div>
                    )}

                    {/* Additional metadata */}
                    {activity.metadata && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {activity.metadata.projectName && (
                          <Badge variant="outline" className="text-xs">
                            {activity.metadata.projectName}
                          </Badge>
                        )}
                        {activity.metadata.taskTitle && (
                          <Badge variant="outline" className="text-xs">
                            {activity.metadata.taskTitle}
                          </Badge>
                        )}
                        {activity.metadata.progress && (
                          <Badge variant="outline" className="text-xs">
                            {activity.metadata.progress}% complete
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* View all button */}
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}