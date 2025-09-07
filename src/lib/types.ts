export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';
export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
export type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: TeamRole;
  status: 'active' | 'inactive';
  joinedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number; // 0-100
  startDate: Date;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  teamMembers: string[]; // User IDs
  color: string;
  tasksCount: number;
  completedTasksCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  assigneeId?: string;
  createdById: string;
  startDate?: Date;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  attachments: string[];
  subtasks: Subtask[];
  dependencies: string[]; // Task IDs
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Activity {
  id: string;
  type: 'project_created' | 'project_updated' | 'task_created' | 'task_updated' | 'task_completed' | 'task_assigned' | 'comment_added' | 'file_uploaded';
  title: string;
  description: string;
  userId: string;
  entityType: 'project' | 'task' | 'comment';
  entityId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  taskId?: string;
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
  mentions: string[]; // User IDs
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  userId: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  teamMembers: number;
  projectsCompleted: number;
  averageCompletionTime: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'task' | 'project' | 'meeting' | 'deadline';
  color: string;
  allDay: boolean;
  relatedId: string; // Task or Project ID
}

export interface FilterOptions {
  status?: TaskStatus[] | ProjectStatus[];
  priority?: Priority[];
  assignee?: string[];
  project?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  search?: string;
}

// Form validation schemas types
export interface CreateProjectForm {
  name: string;
  description: string;
  priority: Priority;
  startDate: Date;
  dueDate: Date;
  teamMembers: string[];
  color: string;
}

export interface CreateTaskForm {
  title: string;
  description: string;
  priority: Priority;
  projectId: string;
  assigneeId?: string;
  dueDate?: Date;
  estimatedHours?: number;
  tags: string[];
}

export interface UpdateTaskForm extends Partial<CreateTaskForm> {
  status?: TaskStatus;
  actualHours?: number;
}

export interface TeamMemberForm {
  name: string;
  email: string;
  role: TeamRole;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Chart data types for reports
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

export interface ProjectProgress {
  projectId: string;
  projectName: string;
  progress: number;
  tasksCompleted: number;
  totalTasks: number;
  daysRemaining: number;
  status: ProjectStatus;
}