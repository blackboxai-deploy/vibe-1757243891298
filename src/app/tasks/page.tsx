"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { KanbanBoard } from "@/components/tasks/KanbanBoard";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { useTasks } from "@/hooks/use-tasks";
import { useProjects } from "@/hooks/use-projects";
import { FilterOptions } from "@/lib/types";

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!task.title.toLowerCase().includes(query) && 
          !task.description.toLowerCase().includes(query) &&
          !task.tags.some(tag => tag.toLowerCase().includes(query))) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(task.status as any)) return false;
    }

    // Priority filter
    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(task.priority)) return false;
    }

    // Project filter
    if (filters.project && filters.project.length > 0) {
      if (!filters.project.includes(task.projectId)) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-2">❌ Error loading tasks</div>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all your tasks across projects
          </p>
        </div>
        <div className="flex space-x-2">
          <div className="flex rounded-lg border">
            <Button 
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="rounded-r-none"
            >
              📋 Kanban
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              📄 List
            </Button>
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="w-full md:w-auto"
          >
            <span className="mr-2">➕</span>
            New Task
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <Input
            placeholder="Search tasks by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <TaskFilters 
          filters={filters} 
          onFiltersChange={setFilters}
          projects={projects}
        />
      </div>

      {/* Tasks Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {tasks.length}
            </div>
            <div className="text-sm text-blue-800 dark:text-blue-300">
              Total Tasks
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 dark:bg-gray-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
              {tasks.filter(t => t.status === 'todo').length}
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-300">
              To Do
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-yellow-800 dark:text-yellow-300">
              In Progress
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 dark:bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {tasks.filter(t => t.status === 'review').length}
            </div>
            <div className="text-sm text-purple-800 dark:text-purple-300">
              In Review
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-sm text-green-800 dark:text-green-300">
              Completed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {viewMode === 'kanban' ? (
        <KanbanBoard tasks={filteredTasks} />
      ) : (
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tasks found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Create your first task to get started
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <span className="mr-2">➕</span>
                Create Your First Task
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {/* List view would go here */}
              <p className="text-center text-gray-500">List view coming soon...</p>
            </div>
          )}
        </div>
      )}

      {/* Create Task Dialog */}
      <CreateTaskDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}