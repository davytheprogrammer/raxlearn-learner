import { useCallback, useEffect, useState } from 'react';
import {
  getUserProfile,
  updateUserProfile,
  addTaskProgress,
  toggleBookmark,
  isProjectBookmarked,
  getTaskProgress,
  type UserProfile,
  type UserProgress,
} from '@/lib/storage';

export function useUserProgress() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize profile from storage
  useEffect(() => {
    try {
      setIsLoading(true);
      const userProfile = getUserProfile();
      setProfile(userProfile);
      setError(null);
    } catch (err) {
      console.error('[useUserProgress] Failed to load profile:', err);
      setError('Failed to load user profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePreferences = useCallback(
    (preferences: Partial<UserProfile['preferences']>) => {
      if (!profile) return;
      try {
        const updated = updateUserProfile({
          ...profile,
          preferences: { ...profile.preferences, ...preferences },
        });
        setProfile(updated);
      } catch (err) {
        console.error('[useUserProgress] Failed to update preferences:', err);
        setError('Failed to update preferences');
      }
    },
    [profile]
  );

  const completeTask = useCallback(
    (pathId: string, projectId: string, taskId: string) => {
      if (!profile) return;
      try {
        const updated = addTaskProgress({
          pathId,
          projectId,
          taskId,
          completed: true,
          completedAt: new Date().toISOString(),
        });
        setProfile(updated);
      } catch (err) {
        console.error('[useUserProgress] Failed to mark task complete:', err);
        setError('Failed to complete task');
      }
    },
    [profile]
  );

  const isTaskComplete = useCallback(
    (taskId: string) => {
      if (!profile) return false;

      // Since we only have taskId but not pathId and projectId, we need to find the task in the user progress
      // by taskId alone, since each taskId should be unique across the entire system
      const progressEntry = profile.userProgress.find(p => p.taskId === taskId);
      return progressEntry ? progressEntry.completed : false;
    },
    [profile]
  );

  const bookmarkProject = useCallback(
    (projectId: string) => {
      if (!profile) return;
      try {
        const updated = toggleBookmark(projectId);
        setProfile(updated);
      } catch (err) {
        console.error('[useUserProgress] Failed to toggle bookmark:', err);
        setError('Failed to bookmark project');
      }
    },
    [profile]
  );

  const isBookmarked = useCallback(
    (projectId: string) => isProjectBookmarked(projectId),
    []
  );

  const getProgress = useCallback(
    (pathId: string, projectId: string, taskId: string) => getTaskProgress(pathId, projectId, taskId),
    []
  );

  const getCompletionPercentage = useCallback(
    (pathId: string) => {
      if (!profile) return 0;
      const pathProgress = profile.userProgress.filter((p) => p.pathId === pathId);
      const completedCount = pathProgress.filter((p) => p.completed).length;
      return pathProgress.length > 0 ? (completedCount / pathProgress.length) * 100 : 0;
    },
    [profile]
  );

  const getBookmarkedProjectsData = useCallback(() => {
    if (!profile) return [];

    // We import skillPaths dynamically or just assume the caller has it to map data
    // For the hook, we just return the raw IDs for the component to map
    return profile.bookmarkedProjects;
  }, [profile]);

  const getActiveTechOptions = useCallback(() => {
    if (!profile) return [];

    // Extracts unique project IDs the user has interacted with
    const activeProjectIds = [...new Set(profile.userProgress.map(p => p.projectId))];

    // Calculate completions per project implicitly mapped by active projects
    const progressMap = activeProjectIds.map(projectId => {
      const taskCompletions = profile.userProgress.filter(p => p.projectId === projectId && p.completed).length;
      return { projectId, taskCompletions };
    });

    return progressMap;
  }, [profile]);

  const getTotalTasksCompleted = useCallback(() => {
    if (!profile) return 0;
    return profile.userProgress.filter(p => p.completed).length;
  }, [profile]);

  // Gamification Engine
  const getLevelAndXP = useCallback(() => {
    if (!profile) return { level: 1, xp: 0, nextLevelXP: 100, progress: 0 };

    // Base rules: 50 XP per task completed.
    const totalTasks = profile.userProgress.filter(p => p.completed).length;
    const totalXP = totalTasks * 50;

    // Level formula: level = Math.floor(sqrt(totalXP / 100)) + 1
    // Simplifies to: Level 1 (0-99 XP), Level 2 (100-399 XP), Level 3 (400-899 XP)
    let currentLevel = 1;
    let nextLevelXP = 100;
    let baseLevelXP = 0;

    while (totalXP >= nextLevelXP) {
      currentLevel++;
      baseLevelXP = nextLevelXP;
      // Exponential scaling for the next level
      nextLevelXP = baseLevelXP + (currentLevel * 100);
    }

    const xpIntoLevel = totalXP - baseLevelXP;
    const xpRequiredForNextLevel = nextLevelXP - baseLevelXP;
    const progress = (xpIntoLevel / xpRequiredForNextLevel) * 100;

    return {
      level: currentLevel,
      xp: totalXP,
      xpIntoLevel,
      xpRequiredForNextLevel,
      nextLevelXP,
      progress
    };

  }, [profile]);

  return {
    profile,
    isLoading,
    error,
    updatePreferences,
    completeTask,
    bookmarkProject,
    isBookmarked,
    getProgress,
    getCompletionPercentage,
    isTaskComplete,
    getBookmarkedProjectsData,
    getActiveTechOptions,
    getTotalTasksCompleted,
    getLevelAndXP
  };
}
