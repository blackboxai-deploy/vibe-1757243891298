"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    {
      id: "1",
      title: "Task Completed",
      message: "API Integration Testing was marked as completed",
      time: "2 min ago",
      read: false
    },
    {
      id: "2", 
      title: "New Comment",
      message: "Sarah Johnson commented on Website Redesign",
      time: "1 hour ago",
      read: false
    },
    {
      id: "3",
      title: "Deadline Reminder",
      message: "Content Strategy Planning is due tomorrow",
      time: "3 hours ago",
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-700 dark:bg-gray-800 lg:px-8">
      {/* Mobile menu button */}
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <span className="text-xl">☰</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
            PF
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">
            ProjectFlow
          </span>
        </div>
      </div>

      {/* Page title for desktop */}
      <div className="hidden lg:block">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <Badge variant="secondary" className="text-xs">
            5 Active Projects
          </Badge>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search projects, tasks, or team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <span className="text-sm">🔍</span>
          </div>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <span className="text-lg">🔔</span>
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex-col items-start p-4 space-y-1">
                  <div className="flex w-full items-start justify-between">
                    <div className="flex items-start space-x-2">
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Button variant="ghost" size="sm" className="text-xs">
                View all notifications
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                JS
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Smith</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.smith@company.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="mr-2">👤</span>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">⚙️</span>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="mr-2">❓</span>
              Help & Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <span className="mr-2">🚪</span>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}