"use client";

import { useState, useEffect } from 'react';
import { Task, CreateTaskForm, UpdateTaskForm, FilterOptions } from '@/lib/types';
import { 
  mockTasks, 
  saveToLocalStorage, 
  getFromLocalStorage, 
  updateTaskStatus as updateTaskStatusUtil,
  updateProjectProgress
} from '@/lib/data';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from localStorage or use mock data
  useEffect(() => {
    try {
      const stored = getFromLocalStorage('tasks', mockTasks);
      setTasks(stored);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setTasks(mockTasks);
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData: CreateTaskForm): Promise<Task> => {
    try {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title,
        description: taskData.description,
        status: 'todo',
        priority: taskData.priority,
        projectId: taskData.projectId,
        assigneeId: taskData.assigneeId,
        createdById: '1', // Current user
        dueDate: taskData.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        estimatedHours: taskData.estimatedHours,
        tags: taskData.tags,
        attachments: [],
        subtasks: [],
        dependencies: []
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks);
      
      // Update project progress
      updateProjectProgress(taskData.projectId);
      
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (taskId: string, updates: UpdateTaskForm): Promise<Task> => {
    try {
      const updatedTasks = tasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      );
      
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks);
      
      const updatedTask = updatedTasks.find(t => t.id === taskId);
      if (!updatedTask) throw new Error('Task not found');
      
      // Update project progress if status changed
      if (updates.status) {
        updateProjectProgress(updatedTask.projectId);
      }
      
      return updatedTask;
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const updateTaskStatus = async (taskId: string, status: Task['status']): Promise<Task> => {
    try {
      const task = updateTaskStatusUtil(taskId, status);
      if (!task) throw new Error('Task not found');
      
      // Refresh tasks from storage
      const updatedTasks = getFromLocalStorage('tasks', mockTasks);
      setTasks(updatedTasks);
      
      return task;
    } catch (err) {
      setError('Failed to update task status');
      throw err;
    }
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    try {
      const taskToDelete = tasks.find(t => t.id === taskId);
      if (!taskToDelete) throw new Error('Task not found');
      
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      saveToLocalStorage('tasks', updatedTasks);
      
      // Update project progress
      updateProjectProgress(taskToDelete.projectId);
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  const getTask = (taskId: string): Task | undefined => {
    return tasks.find(task => task.id === taskId);
  };

  const getTasksByProject = (projectId: string): Task[] => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getTasksByAssignee = (assigneeId: string): Task[] => {
    return tasks.filter(task => task.assigneeId === assigneeId);
  };

  const getTasksByStatus = (status: Task['status']): Task[] => {
    return tasks.filter(task => task.status === status);
  };

  const filterTasks = (filters: FilterOptions): Task[] => {
    return tasks.filter(task => {
      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(task.status as any)) return false;
      }

      // Priority filter
      if (filters.priority && filters.priority.length > 0) {
        if (!filters.priority.includes(task.priority)) return false;
      }

      // Assignee filter
      if (filters.assignee && filters.assignee.length > 0) {
        if (!task.assigneeId || !filters.assignee.includes(task.assigneeId)) return false;
      }

      // Project filter
      if (filters.project && filters.project.length > 0) {
        if (!filters.project.includes(task.projectId)) return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !task.title.toLowerCase().includes(searchLower) &&
          !task.description.toLowerCase().includes(searchLower) &&
          !task.tags.some(tag => tag.toLowerCase().includes(searchLower))
        ) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange && task.dueDate) {
        if (
          task.dueDate < filters.dateRange.start ||
          task.dueDate > filters.dateRange.end
        ) {
          return false;
        }
      }

      return true;
    });
  };

  const getOverdueTasks = (): Task[] => {
    const today = new Date();
    return tasks.filter(task => 
      task.dueDate && 
      task.dueDate < today && 
      task.status !== 'completed'
    );
  };

  const getUpcomingTasks = (days: number = 7): Task[] => {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + days);
    
    return tasks.filter(task => 
      task.dueDate && 
      task.dueDate >= today && 
      task.dueDate <= future && 
      task.status !== 'completed'
    );
  };

  const getTasksGroupedByStatus = () => {
    return {
      todo: getTasksByStatus('todo'),
      'in-progress': getTasksByStatus('in-progress'),
      review: getTasksByStatus('review'),
      completed: getTasksByStatus('completed')
    };
  };

  const addSubtask = async (taskId: string, title: string): Promise<Task> => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');

    const newSubtask = {
      id: `${taskId}-${Date.now()}`,
      title,
      completed: false,
      createdAt: new Date()
    };

    return updateTask(taskId, {
      subtasks: [...task.subtasks, newSubtask]
    });
  };

  const toggleSubtask = async (taskId: string, subtaskId: string): Promise<Task> => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found');

    const updatedSubtasks = task.subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );

    return updateTask(taskId, { subtasks: updatedSubtasks });
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    getTask,
    getTasksByProject,
    getTasksByAssignee,
    getTasksByStatus,
    filterTasks,
    getOverdueTasks,
    getUpcomingTasks,
    getTasksGroupedByStatus,
    addSubtask,
    toggleSubtask,
    setError
  };
}