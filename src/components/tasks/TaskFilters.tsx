"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterOptions, Project } from "@/lib/types";
import { useTeam } from "@/hooks/use-team";

interface TaskFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  projects: Project[];
}

export function TaskFilters({ filters, onFiltersChange, projects }: TaskFiltersProps) {
  const { teamMembers } = useTeam();

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const updateFilter = (key: keyof FilterOptions, value: string, checked: boolean) => {
    const currentValues = (filters[key] as string[]) || [];
    let newValues: string[];

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    onFiltersChange({
      ...filters,
      [key]: newValues.length > 0 ? newValues : undefined
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status?.length) count += filters.status.length;
    if (filters.priority?.length) count += filters.priority.length;
    if (filters.project?.length) count += filters.project.length;
    if (filters.assignee?.length) count += filters.assignee.length;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="flex items-center space-x-2 flex-wrap gap-2">
      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            Status
            {filters.status?.length && (
              <Badge className="ml-2 h-4 w-4 rounded-full p-0 text-xs">
                {filters.status.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statusOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={filters.status?.includes(option.value as any) || false}
              onCheckedChange={(checked) => 
                updateFilter('status', option.value, checked)
              }
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Priority Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            Priority
            {filters.priority?.length && (
              <Badge className="ml-2 h-4 w-4 rounded-full p-0 text-xs">
                {filters.priority.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {priorityOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={filters.priority?.includes(option.value as any) || false}
              onCheckedChange={(checked) => 
                updateFilter('priority', option.value, checked)
              }
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Project Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            Project
            {filters.project?.length && (
              <Badge className="ml-2 h-4 w-4 rounded-full p-0 text-xs">
                {filters.project.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>Filter by Project</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {projects.map((project) => (
            <DropdownMenuCheckboxItem
              key={project.id}
              checked={filters.project?.includes(project.id) || false}
              onCheckedChange={(checked) => 
                updateFilter('project', project.id, checked)
              }
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="truncate">{project.name}</span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Assignee Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            Assignee
            {filters.assignee?.length && (
              <Badge className="ml-2 h-4 w-4 rounded-full p-0 text-xs">
                {filters.assignee.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>Filter by Assignee</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {teamMembers.map((member) => (
            <DropdownMenuCheckboxItem
              key={member.id}
              checked={filters.assignee?.includes(member.id) || false}
              onCheckedChange={(checked) => 
                updateFilter('assignee', member.id, checked)
              }
            >
              {member.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear ({activeFilterCount})
        </Button>
      )}
    </div>
  );
}