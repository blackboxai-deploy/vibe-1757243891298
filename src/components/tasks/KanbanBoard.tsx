"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "./TaskCard";
import { Task } from "@/lib/types";

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  const columns = [
    { id: 'todo', title: 'To Do', emoji: '📋' },
    { id: 'in-progress', title: 'In Progress', emoji: '🔄' },
    { id: 'review', title: 'In Review', emoji: '👀' },
    { id: 'completed', title: 'Completed', emoji: '✅' }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getColumnColor = (status: string) => {
    const colors = {
      'todo': 'border-t-gray-400',
      'in-progress': 'border-t-blue-400',
      'review': 'border-t-yellow-400',
      'completed': 'border-t-green-400'
    };
    return colors[status as keyof typeof colors] || 'border-t-gray-400';
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);
        return (
          <Card key={column.id} className={`border-t-4 ${getColumnColor(column.id)}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <span>{column.emoji}</span>
                  <span>{column.title}</span>
                </div>
                <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                  {columnTasks.length}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {columnTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-2xl mb-2">{column.emoji}</div>
                  <p className="text-sm">No tasks</p>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}

              {/* Add Task Button */}
              <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm">
                <span className="mr-2">➕</span>
                Add task
              </button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}