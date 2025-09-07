"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: "🏠",
    description: "Overview and statistics"
  },
  {
    name: "Projects",
    href: "/projects",
    icon: "📁",
    description: "Manage your projects",
    badge: "5"
  },
  {
    name: "Tasks",
    href: "/tasks", 
    icon: "✓",
    description: "Task management and tracking",
    badge: "23"
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: "📅",
    description: "Timeline and scheduling"
  },
  {
    name: "Team",
    href: "/team",
    icon: "👥",
    description: "Team member management"
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "📊",
    description: "Analytics and insights"
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "⚙️",
    description: "App preferences and configuration"
  }
];

const quickActions = [
  {
    name: "New Project",
    icon: "➕",
    action: "create-project"
  },
  {
    name: "New Task",
    icon: "📝",
    action: "create-task"
  },
  {
    name: "Invite Member",
    icon: "👤",
    action: "invite-member"
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo and branding */}
      <div className="flex h-16 items-center justify-center px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
            PF
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            ProjectFlow
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        {/* Main Navigation */}
        <nav className="space-y-1">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Main
            </p>
          </div>
          
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge 
                    variant={pathname === item.href ? "default" : "secondary"}
                    className="ml-auto"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </nav>

        <Separator className="my-6" />

        {/* Quick Actions */}
        <div className="space-y-1">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Quick Actions
            </p>
          </div>
          
          {quickActions.map((action) => (
            <Button
              key={action.name}
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 h-auto font-normal"
              onClick={() => {
                // Handle quick actions
                console.log(`Quick action: ${action.action}`);
              }}
            >
              <span className="text-lg">{action.icon}</span>
              <span>{action.name}</span>
            </Button>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Recent Projects */}
        <div className="space-y-1">
          <div className="mb-4">
            <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Recent Projects
            </p>
          </div>
          
          <div className="space-y-1">
            <Link href="/projects/1">
              <div className="group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="truncate">Website Redesign</span>
              </div>
            </Link>
            
            <Link href="/projects/2">
              <div className="group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="truncate">Mobile App Development</span>
              </div>
            </Link>
            
            <Link href="/projects/3">
              <div className="group flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="truncate">Marketing Campaign Q1</span>
              </div>
            </Link>
          </div>
        </div>
      </ScrollArea>

      {/* User profile section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            JS
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              John Smith
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Project Owner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}