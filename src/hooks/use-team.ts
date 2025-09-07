"use client";

import { useState, useEffect } from 'react';
import { User, TeamMemberForm } from '@/lib/types';
import { mockUsers, saveToLocalStorage, getFromLocalStorage } from '@/lib/data';

export function useTeam() {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load team members from localStorage or use mock data
  useEffect(() => {
    try {
      const stored = getFromLocalStorage('teamMembers', mockUsers);
      setTeamMembers(stored);
      setLoading(false);
    } catch (err) {
      setError('Failed to load team members');
      setTeamMembers(mockUsers);
      setLoading(false);
    }
  }, []);

  const addTeamMember = async (memberData: TeamMemberForm): Promise<User> => {
    try {
      const newMember: User = {
        id: Date.now().toString(),
        name: memberData.name,
        email: memberData.email,
        role: memberData.role,
        status: 'active',
        joinedAt: new Date(),
        avatar: `https://placehold.co/150x150?text=${memberData.name.split(' ').map(n => n[0]).join('')}+Profile+Avatar`
      };

      const updatedMembers = [...teamMembers, newMember];
      setTeamMembers(updatedMembers);
      saveToLocalStorage('teamMembers', updatedMembers);
      
      return newMember;
    } catch (err) {
      setError('Failed to add team member');
      throw err;
    }
  };

  const updateTeamMember = async (memberId: string, updates: Partial<User>): Promise<User> => {
    try {
      const updatedMembers = teamMembers.map(member =>
        member.id === memberId
          ? { ...member, ...updates }
          : member
      );
      
      setTeamMembers(updatedMembers);
      saveToLocalStorage('teamMembers', updatedMembers);
      
      const updatedMember = updatedMembers.find(m => m.id === memberId);
      if (!updatedMember) throw new Error('Team member not found');
      
      return updatedMember;
    } catch (err) {
      setError('Failed to update team member');
      throw err;
    }
  };

  const removeTeamMember = async (memberId: string): Promise<void> => {
    try {
      const updatedMembers = teamMembers.filter(member => member.id !== memberId);
      setTeamMembers(updatedMembers);
      saveToLocalStorage('teamMembers', updatedMembers);
    } catch (err) {
      setError('Failed to remove team member');
      throw err;
    }
  };

  const getTeamMember = (memberId: string): User | undefined => {
    return teamMembers.find(member => member.id === memberId);
  };

  const getTeamMemberByEmail = (email: string): User | undefined => {
    return teamMembers.find(member => member.email === email);
  };

  const getTeamMembersByRole = (role: User['role']): User[] => {
    return teamMembers.filter(member => member.role === role);
  };

  const getActiveTeamMembers = (): User[] => {
    return teamMembers.filter(member => member.status === 'active');
  };

  const searchTeamMembers = (query: string): User[] => {
    const searchLower = query.toLowerCase();
    return teamMembers.filter(member =>
      member.name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower)
    );
  };

  const updateTeamMemberStatus = async (memberId: string, status: User['status']): Promise<User> => {
    return updateTeamMember(memberId, { status });
  };

  const updateTeamMemberRole = async (memberId: string, role: User['role']): Promise<User> => {
    return updateTeamMember(memberId, { role });
  };

  const getCurrentUser = (): User | undefined => {
    // Assuming the first user is the current user (John Smith)
    return teamMembers.find(member => member.id === '1');
  };

  const getTeamStats = () => {
    const active = teamMembers.filter(m => m.status === 'active').length;
    const inactive = teamMembers.filter(m => m.status === 'inactive').length;
    const owners = teamMembers.filter(m => m.role === 'owner').length;
    const admins = teamMembers.filter(m => m.role === 'admin').length;
    const members = teamMembers.filter(m => m.role === 'member').length;
    const viewers = teamMembers.filter(m => m.role === 'viewer').length;

    return {
      total: teamMembers.length,
      active,
      inactive,
      byRole: { owners, admins, members, viewers }
    };
  };

  return {
    teamMembers,
    loading,
    error,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    getTeamMember,
    getTeamMemberByEmail,
    getTeamMembersByRole,
    getActiveTeamMembers,
    searchTeamMembers,
    updateTeamMemberStatus,
    updateTeamMemberRole,
    getCurrentUser,
    getTeamStats,
    setError
  };
}