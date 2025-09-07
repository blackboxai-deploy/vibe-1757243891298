"use client";

import { User, Project, Task, Activity, DashboardStats, CalendarEvent, ProjectProgress } from './types';
import { addDays, subDays } from 'date-fns';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    avatar: 'https://placehold.co/150x150?text=Professional+businessman+headshot+clean+background',
    role: 'owner',
    status: 'active',
    joinedAt: subDays(new Date(), 180)
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    avatar: 'https://placehold.co/150x150?text=Professional+businesswoman+portrait+corporate+style',
    role: 'admin',
    status: 'active',
    joinedAt: subDays(new Date(), 120)
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    avatar: 'https://placehold.co/150x150?text=Professional+developer+headshot+tech+style',
    role: 'member',
    status: 'active',
    joinedAt: subDays(new Date(), 90)
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    avatar: 'https://placehold.co/150x150?text=Professional+designer+portrait+creative+style',
    role: 'member',
    status: 'active',
    joinedAt: subDays(new Date(), 60)
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'alex.r@company.com',
    avatar: 'https://placehold.co/150x150?text=Professional+manager+headshot+modern+style',
    role: 'member',
    status: 'active',
    joinedAt: subDays(new Date(), 30)
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI/UX approach and improved performance.',
    status: 'active',
    priority: 'high',
    progress: 75,
    startDate: subDays(new Date(), 45),
    dueDate: addDays(new Date(), 15),
    createdAt: subDays(new Date(), 50),
    updatedAt: new Date(),
    ownerId: '1',
    teamMembers: ['1', '2', '4'],
    color: '#3B82F6',
    tasksCount: 12,
    completedTasksCount: 9
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms with cross-platform compatibility.',
    status: 'active',
    priority: 'critical',
    progress: 45,
    startDate: subDays(new Date(), 30),
    dueDate: addDays(new Date(), 60),
    createdAt: subDays(new Date(), 35),
    updatedAt: subDays(new Date(), 1),
    ownerId: '2',
    teamMembers: ['1', '2', '3', '5'],
    color: '#10B981',
    tasksCount: 18,
    completedTasksCount: 8
  },
  {
    id: '3',
    name: 'Marketing Campaign Q1',
    description: 'Comprehensive marketing strategy and execution for first quarter including digital and traditional media.',
    status: 'planning',
    priority: 'medium',
    progress: 20,
    startDate: addDays(new Date(), 7),
    dueDate: addDays(new Date(), 90),
    createdAt: subDays(new Date(), 10),
    updatedAt: subDays(new Date(), 2),
    ownerId: '4',
    teamMembers: ['2', '4', '5'],
    color: '#F59E0B',
    tasksCount: 8,
    completedTasksCount: 2
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migration from legacy database system to modern cloud-based solution with improved scalability.',
    status: 'completed',
    priority: 'high',
    progress: 100,
    startDate: subDays(new Date(), 90),
    dueDate: subDays(new Date(), 10),
    createdAt: subDays(new Date(), 100),
    updatedAt: subDays(new Date(), 10),
    ownerId: '3',
    teamMembers: ['1', '3'],
    color: '#8B5CF6',
    tasksCount: 15,
    completedTasksCount: 15
  },
  {
    id: '5',
    name: 'Customer Support Portal',
    description: 'Self-service customer support portal with knowledge base, ticket system, and live chat integration.',
    status: 'on-hold',
    priority: 'low',
    progress: 30,
    startDate: subDays(new Date(), 20),
    dueDate: addDays(new Date(), 45),
    createdAt: subDays(new Date(), 25),
    updatedAt: subDays(new Date(), 5),
    ownerId: '5',
    teamMembers: ['3', '4', '5'],
    color: '#EF4444',
    tasksCount: 10,
    completedTasksCount: 3
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design with improved user experience.',
    status: 'completed',
    priority: 'high',
    projectId: '1',
    assigneeId: '4',
    createdById: '1',
    dueDate: subDays(new Date(), 5),
    createdAt: subDays(new Date(), 20),
    updatedAt: subDays(new Date(), 5),
    estimatedHours: 16,
    actualHours: 18,
    tags: ['design', 'ui/ux', 'homepage'],
    attachments: [],
    subtasks: [
      { id: '1-1', title: 'Create wireframes', completed: true, createdAt: subDays(new Date(), 18) },
      { id: '1-2', title: 'Design mockups', completed: true, createdAt: subDays(new Date(), 15) },
      { id: '1-3', title: 'Review with stakeholders', completed: true, createdAt: subDays(new Date(), 10) }
    ],
    dependencies: []
  },
  {
    id: '2',
    title: 'Implement Authentication System',
    description: 'Develop secure user authentication with OAuth integration and password reset functionality.',
    status: 'in-progress',
    priority: 'critical',
    projectId: '2',
    assigneeId: '3',
    createdById: '2',
    dueDate: addDays(new Date(), 7),
    createdAt: subDays(new Date(), 15),
    updatedAt: new Date(),
    estimatedHours: 24,
    actualHours: 16,
    tags: ['backend', 'security', 'authentication'],
    attachments: [],
    subtasks: [
      { id: '2-1', title: 'Set up OAuth providers', completed: true, createdAt: subDays(new Date(), 12) },
      { id: '2-2', title: 'Implement login/logout', completed: true, createdAt: subDays(new Date(), 8) },
      { id: '2-3', title: 'Add password reset', completed: false, createdAt: subDays(new Date(), 5) },
      { id: '2-4', title: 'Security testing', completed: false, createdAt: subDays(new Date(), 3) }
    ],
    dependencies: []
  },
  {
    id: '3',
    title: 'Content Strategy Planning',
    description: 'Develop comprehensive content calendar and strategy for Q1 marketing initiatives.',
    status: 'todo',
    priority: 'medium',
    projectId: '3',
    assigneeId: '5',
    createdById: '4',
    dueDate: addDays(new Date(), 14),
    createdAt: subDays(new Date(), 5),
    updatedAt: subDays(new Date(), 2),
    estimatedHours: 12,
    tags: ['marketing', 'content', 'strategy'],
    attachments: [],
    subtasks: [
      { id: '3-1', title: 'Market research', completed: false, createdAt: subDays(new Date(), 3) },
      { id: '3-2', title: 'Competitor analysis', completed: false, createdAt: subDays(new Date(), 3) },
      { id: '3-3', title: 'Content calendar creation', completed: false, createdAt: subDays(new Date(), 2) }
    ],
    dependencies: []
  },
  {
    id: '4',
    title: 'API Integration Testing',
    description: 'Comprehensive testing of all API endpoints with automated test suite implementation.',
    status: 'review',
    priority: 'high',
    projectId: '2',
    assigneeId: '1',
    createdById: '3',
    dueDate: addDays(new Date(), 3),
    createdAt: subDays(new Date(), 10),
    updatedAt: subDays(new Date(), 1),
    estimatedHours: 20,
    actualHours: 22,
    tags: ['testing', 'api', 'automation'],
    attachments: [],
    subtasks: [
      { id: '4-1', title: 'Write unit tests', completed: true, createdAt: subDays(new Date(), 8) },
      { id: '4-2', title: 'Integration test suite', completed: true, createdAt: subDays(new Date(), 5) },
      { id: '4-3', title: 'Performance testing', completed: true, createdAt: subDays(new Date(), 2) },
      { id: '4-4', title: 'Code review', completed: false, createdAt: subDays(new Date(), 1) }
    ],
    dependencies: ['2']
  },
  {
    id: '5',
    title: 'Responsive Design Implementation',
    description: 'Ensure website design works seamlessly across all device sizes and screen resolutions.',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    assigneeId: '4',
    createdById: '1',
    dueDate: addDays(new Date(), 10),
    createdAt: subDays(new Date(), 12),
    updatedAt: new Date(),
    estimatedHours: 18,
    actualHours: 10,
    tags: ['frontend', 'responsive', 'css'],
    attachments: [],
    subtasks: [
      { id: '5-1', title: 'Mobile breakpoints', completed: true, createdAt: subDays(new Date(), 10) },
      { id: '5-2', title: 'Tablet optimization', completed: false, createdAt: subDays(new Date(), 7) },
      { id: '5-3', title: 'Desktop refinement', completed: false, createdAt: subDays(new Date(), 5) }
    ],
    dependencies: ['1']
  }
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'task_completed',
    title: 'Task Completed',
    description: 'Design Homepage Layout was marked as completed',
    userId: '4',
    entityType: 'task',
    entityId: '1',
    timestamp: subDays(new Date(), 1),
    metadata: { taskTitle: 'Design Homepage Layout', projectName: 'Website Redesign' }
  },
  {
    id: '2',
    type: 'task_updated',
    title: 'Task Updated',
    description: 'API Integration Testing moved to review stage',
    userId: '1',
    entityType: 'task',
    entityId: '4',
    timestamp: subDays(new Date(), 1),
    metadata: { taskTitle: 'API Integration Testing', fromStatus: 'in-progress', toStatus: 'review' }
  },
  {
    id: '3',
    type: 'project_updated',
    title: 'Project Progress',
    description: 'Website Redesign project progress updated to 75%',
    userId: '1',
    entityType: 'project',
    entityId: '1',
    timestamp: subDays(new Date(), 2),
    metadata: { projectName: 'Website Redesign', progress: 75 }
  },
  {
    id: '4',
    type: 'task_assigned',
    title: 'Task Assigned',
    description: 'Content Strategy Planning assigned to Alex Rodriguez',
    userId: '4',
    entityType: 'task',
    entityId: '3',
    timestamp: subDays(new Date(), 2),
    metadata: { taskTitle: 'Content Strategy Planning', assigneeName: 'Alex Rodriguez' }
  },
  {
    id: '5',
    type: 'task_created',
    title: 'New Task Created',
    description: 'Responsive Design Implementation added to Website Redesign',
    userId: '1',
    entityType: 'task',
    entityId: '5',
    timestamp: subDays(new Date(), 3),
    metadata: { taskTitle: 'Responsive Design Implementation', projectName: 'Website Redesign' }
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalProjects: 5,
  activeProjects: 2,
  totalTasks: 23,
  completedTasks: 12,
  overdueTasks: 2,
  teamMembers: 5,
  projectsCompleted: 1,
  averageCompletionTime: 42 // days
};

// Mock Calendar Events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'API Integration Testing Due',
    description: 'Final review and completion of API testing',
    start: addDays(new Date(), 3),
    end: addDays(new Date(), 3),
    type: 'deadline',
    color: '#EF4444',
    allDay: true,
    relatedId: '4'
  },
  {
    id: '2',
    title: 'Website Redesign Milestone',
    description: 'Project milestone review meeting',
    start: addDays(new Date(), 7),
    end: addDays(new Date(), 7),
    type: 'project',
    color: '#3B82F6',
    allDay: false,
    relatedId: '1'
  },
  {
    id: '3',
    title: 'Content Strategy Review',
    description: 'Review and approval of Q1 content strategy',
    start: addDays(new Date(), 14),
    end: addDays(new Date(), 14),
    type: 'task',
    color: '#F59E0B',
    allDay: false,
    relatedId: '3'
  }
];

// Utility functions for data management
export const getCurrentUser = (): User => mockUsers[0]; // John Smith as current user

export const getProjectProgress = (): ProjectProgress[] => {
  return mockProjects.map(project => ({
    projectId: project.id,
    projectName: project.name,
    progress: project.progress,
    tasksCompleted: project.completedTasksCount,
    totalTasks: project.tasksCount,
    daysRemaining: Math.ceil((project.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
    status: project.status
  }));
};

export const getOverdueTasks = (): Task[] => {
  const today = new Date();
  return mockTasks.filter(task => 
    task.dueDate && 
    task.dueDate < today && 
    task.status !== 'completed'
  );
};

export const getUpcomingTasks = (days: number = 7): Task[] => {
  const today = new Date();
  const future = addDays(today, days);
  return mockTasks.filter(task => 
    task.dueDate && 
    task.dueDate >= today && 
    task.dueDate <= future && 
    task.status !== 'completed'
  );
};

export const getTasksByProject = (projectId: string): Task[] => {
  return mockTasks.filter(task => task.projectId === projectId);
};

export const getTasksByAssignee = (assigneeId: string): Task[] => {
  return mockTasks.filter(task => task.assigneeId === assigneeId);
};

export const getRecentActivities = (limit: number = 10): Activity[] => {
  return mockActivities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
};

// Local storage utilities
export const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getFromLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
};

// Data update functions (simulate API calls)
export const updateTaskStatus = (taskId: string, status: Task['status']) => {
  const taskIndex = mockTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    mockTasks[taskIndex].status = status;
    mockTasks[taskIndex].updatedAt = new Date();
    
    // Update project progress
    const projectId = mockTasks[taskIndex].projectId;
    updateProjectProgress(projectId);
    
    saveToLocalStorage('tasks', mockTasks);
    return mockTasks[taskIndex];
  }
  return null;
};

export const updateProjectProgress = (projectId: string) => {
  const projectTasks = getTasksByProject(projectId);
  const completedTasks = projectTasks.filter(task => task.status === 'completed');
  const progress = projectTasks.length > 0 ? Math.round((completedTasks.length / projectTasks.length) * 100) : 0;
  
  const projectIndex = mockProjects.findIndex(p => p.id === projectId);
  if (projectIndex !== -1) {
    mockProjects[projectIndex].progress = progress;
    mockProjects[projectIndex].completedTasksCount = completedTasks.length;
    mockProjects[projectIndex].updatedAt = new Date();
    saveToLocalStorage('projects', mockProjects);
  }
};