"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { useProjects } from "@/hooks/use-projects";
import { FilterOptions } from "@/lib/types";

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const filteredProjects = projects.filter(project => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!project.name.toLowerCase().includes(query) && 
          !project.description.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(project.status as any)) return false;
    }

    // Priority filter
    if (filters.priority && filters.priority.length > 0) {
      if (!filters.priority.includes(project.priority)) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg mb-2">❌ Error loading projects</div>
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
            Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track all your projects in one place
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="w-full md:w-auto"
        >
          <span className="mr-2">➕</span>
          New Project
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <Input
            placeholder="Search projects by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <ProjectFilters 
          filters={filters} 
          onFiltersChange={setFilters}
        />
      </div>

      {/* Projects Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {projects.length}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-300">
            Total Projects
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {projects.filter(p => p.status === 'active').length}
          </div>
          <div className="text-sm text-green-800 dark:text-green-300">
            Active
          </div>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {projects.filter(p => p.status === 'planning').length}
          </div>
          <div className="text-sm text-yellow-800 dark:text-yellow-300">
            Planning
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length) || 0}%
          </div>
          <div className="text-sm text-purple-800 dark:text-purple-300">
            Avg Progress
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          {projects.length === 0 ? (
            <>
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Get started by creating your first project
              </p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <span className="mr-2">➕</span>
                Create Your First Project
              </Button>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your search criteria or filters
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setFilters({});
                }}
              >
                Clear Filters
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {/* Create Project Dialog */}
      <CreateProjectDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}