"use client";

import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ProjectProgress } from "@/components/dashboard/ProjectProgress";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      {/* Stats Overview */}
      <StatsCards />

      {/* Main Dashboard Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Project Progress - spans 2 columns on large screens */}
        <div className="lg:col-span-2">
          <ProjectProgress />
        </div>

        {/* Upcoming Deadlines */}
        <div className="lg:col-span-1">
          <UpcomingDeadlines />
        </div>

        {/* Recent Activity - spans full width on mobile, 2 columns on large screens */}
        <div className="md:col-span-2 lg:col-span-3">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex flex-col items-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors dark:border-gray-600 dark:hover:border-gray-500">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl">
              📁
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">New Project</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Start a new project</p>
            </div>
          </button>

          <button className="flex flex-col items-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors dark:border-gray-600 dark:hover:border-gray-500">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-2xl">
              ✓
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Add Task</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create a new task</p>
            </div>
          </button>

          <button className="flex flex-col items-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors dark:border-gray-600 dark:hover:border-gray-500">
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-2xl">
              👥
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Invite Team</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Add team members</p>
            </div>
          </button>

          <button className="flex flex-col items-center space-y-2 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors dark:border-gray-600 dark:hover:border-gray-500">
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">View Reports</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Analytics & insights</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}