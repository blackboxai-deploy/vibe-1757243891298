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
import { FilterOptions } from "@/lib/types";

interface ProjectFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function ProjectFilters({ filters, onFiltersChange }: ProjectFiltersProps) {
  const statusOptions = [
    { value: 'planning', label: 'Planning' },
    { value: 'active', label: 'Active' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
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
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="flex items-center space-x-2">
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

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear ({activeFilterCount})
        </Button>
      )}

      {/* Filter indicator */}
      {activeFilterCount > 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
        </div>
      )}
    </div>
  );
}