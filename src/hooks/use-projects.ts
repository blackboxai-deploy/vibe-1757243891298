"use client";

import { useState, useEffect } from 'react';
import { Project, CreateProjectForm, FilterOptions } from '@/lib/types';
import { 
  mockProjects, 
  saveToLocalStorage, 
  getFromLocalStorage,
  updateProjectProgress 
} from '@/lib/data';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load projects from localStorage or use mock data
  useEffect(() => {
    try {
      const stored = getFromLocalStorage('projects', mockProjects);
      setProjects(stored);
      setLoading(false);
    } catch (err) {
      setError('Failed to load projects');
      setProjects(mockProjects);
      setLoading(false);
    }
  }, []);

  const createProject = async (projectData: CreateProjectForm): Promise<Project> => {
    try {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectData.name,
        description: projectData.description,
        status: 'planning',
        priority: projectData.priority,
        progress: 0,
        startDate: projectData.startDate,
        dueDate: projectData.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: '1', // Current user
        teamMembers: projectData.teamMembers,
        color: projectData.color,
        tasksCount: 0,
        completedTasksCount: 0
      };

      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      saveToLocalStorage('projects', updatedProjects);
      
      return newProject;
    } catch (err) {
      setError('Failed to create project');
      throw err;
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>): Promise<Project> => {
    try {
      const updatedProjects = projects.map(project =>
        project.id === projectId
          ? { ...project, ...updates, updatedAt: new Date() }
          : project
      );
      
      setProjects(updatedProjects);
      saveToLocalStorage('projects', updatedProjects);
      
      const updatedProject = updatedProjects.find(p => p.id === projectId);
      if (!updatedProject) throw new Error('Project not found');
      
      return updatedProject;
    } catch (err) {
      setError('Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (projectId: string): Promise<void> => {
    try {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      saveToLocalStorage('projects', updatedProjects);
    } catch (err) {
      setError('Failed to delete project');
      throw err;
    }
  };

  const getProject = (projectId: string): Project | undefined => {
    return projects.find(project => project.id === projectId);
  };

  const filterProjects = (filters: FilterOptions): Project[] => {
    return projects.filter(project => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(project.status as any)) return false;
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(project.priority)) return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !project.name.toLowerCase().includes(searchLower) &&
          !project.description.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange) {
        const projectDate = project.dueDate;
        if (
          projectDate < filters.dateRange.start ||
          projectDate > filters.dateRange.end
        ) {
          return false;
        }
      }

      return true;
    });
  };

  const getProjectsByStatus = (status: Project['status']): Project[] => {
    return projects.filter(project => project.status === status);
  };

  const getActiveProjects = (): Project[] => {
    return projects.filter(project => 
      project.status === 'active' || project.status === 'planning'
    );
  };

  const refreshProjectProgress = (projectId: string) => {
    updateProjectProgress(projectId);
    const updated = getFromLocalStorage('projects', mockProjects);
    setProjects(updated);
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    getProject,
    filterProjects,
    getProjectsByStatus,
    getActiveProjects,
    refreshProjectProgress,
    setError
  };
}