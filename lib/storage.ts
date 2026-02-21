/**
 * Storage utility for guest mode user data persistence
 * Handles localStorage operations with proper error handling and fallbacks
 */

// Simple encoding function to obfuscate data stored in localStorage
const encodeData = (data: string): string => {
  // Simple base64 encoding with additional transformation
  return typeof window !== 'undefined'
    ? btoa(data).split('').reverse().join('')
    : data;
};

const decodeData = (encodedData: string): string => {
  // Reverse the transformation and decode
  if (typeof window === 'undefined' || !encodedData) return encodedData;
  try {
    return atob(encodedData.split('').reverse().join(''));
  } catch {
    // If decoding fails, return original data (for backward compatibility)
    return encodedData;
  }
};

export interface UserProgress {
  pathId: string;
  projectId: string;
  taskId: string;
  completed: boolean;
  completedAt: string;
}

export interface UserProfile {
  guestId: string;
  preferredLanguage: string;
  completedPaths: string[];
  inProgressPaths: string[];
  bookmarkedProjects: string[];
  userProgress: UserProgress[];
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    emailUpdates: boolean;
  };
  lastUpdated: string;
}

const STORAGE_KEY = 'raxlearn_user_profile';
const GUEST_ID_KEY = 'raxlearn_guest_id';

export function generateGuestId(): string {
  return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getOrCreateGuestId(): string {
  if (typeof window === 'undefined') return '';

  try {
    const storedGuestId = localStorage.getItem(GUEST_ID_KEY);
    const guestId = storedGuestId ? decodeData(storedGuestId) : null;
    if (!guestId) {
      const newGuestId = generateGuestId();
      localStorage.setItem(GUEST_ID_KEY, encodeData(newGuestId));
      return newGuestId;
    }
    return guestId;
  } catch (error) {
    console.error('[Storage] Failed to get guest ID:', error);
    const newGuestId = generateGuestId();
    localStorage.setItem(GUEST_ID_KEY, encodeData(newGuestId));
    return newGuestId;
  }
}

export function getDefaultUserProfile(): UserProfile {
  const guestId = getOrCreateGuestId();
  const profile = {
    guestId,
    preferredLanguage: typeof window !== 'undefined' ? navigator.language.split('-')[0] : 'en',
    completedPaths: [],
    inProgressPaths: [],
    bookmarkedProjects: [],
    userProgress: [],
    preferences: {
      theme: 'light',
      notifications: true,
      emailUpdates: false,
    },
    lastUpdated: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, encodeData(JSON.stringify(profile)));
  }
  return profile;
}

export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') return getDefaultUserProfile();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const profile = getDefaultUserProfile();
      localStorage.setItem(STORAGE_KEY, encodeData(JSON.stringify(profile)));
      return profile;
    }
    return JSON.parse(decodeData(stored));
  } catch (error) {
    console.error('[Storage] Failed to read user profile:', error);
    return getDefaultUserProfile();
  }
}

export function updateUserProfile(updates: Partial<UserProfile>): UserProfile {
  if (typeof window === 'undefined') return getDefaultUserProfile();

  try {
    const current = getUserProfile();
    const updated: UserProfile = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, encodeData(JSON.stringify(updated)));
    return updated;
  } catch (error) {
    console.error('[Storage] Failed to update user profile:', error);
    return getUserProfile();
  }
}

export function addTaskProgress(progress: UserProgress): UserProfile {
  const profile = getUserProfile();
  const existingIndex = profile.userProgress.findIndex(
    (p) => p.taskId === progress.taskId && p.pathId === progress.pathId
  );

  if (existingIndex >= 0) {
    profile.userProgress[existingIndex] = { ...progress, completedAt: new Date().toISOString() };
  } else {
    profile.userProgress.push({ ...progress, completedAt: new Date().toISOString() });
  }

  return updateUserProfile(profile);
}

export function toggleBookmark(projectId: string): UserProfile {
  const profile = getUserProfile();
  const index = profile.bookmarkedProjects.indexOf(projectId);
  
  if (index >= 0) {
    profile.bookmarkedProjects.splice(index, 1);
  } else {
    profile.bookmarkedProjects.push(projectId);
  }

  return updateUserProfile(profile);
}

export function isProjectBookmarked(projectId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const profile = getUserProfile();
    return profile.bookmarkedProjects.includes(projectId);
  } catch (error) {
    console.error('[Storage] Failed to check bookmark:', error);
    return false;
  }
}

export function getTaskProgress(pathId: string, projectId: string, taskId: string): UserProgress | null {
  if (typeof window === 'undefined') return null;

  try {
    const profile = getUserProfile();
    return profile.userProgress.find((p) => p.pathId === pathId && p.projectId === projectId && p.taskId === taskId) || null;
  } catch (error) {
    console.error('[Storage] Failed to get task progress:', error);
    return null;
  }
}

export function clearAllData(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(GUEST_ID_KEY);
    console.log('[Storage] All user data cleared');
  } catch (error) {
    console.error('[Storage] Failed to clear data:', error);
  }
}

export function exportUserData(): string {
  if (typeof window === 'undefined') return '';

  try {
    const profile = getUserProfile();
    return JSON.stringify(profile, null, 2);
  } catch (error) {
    console.error('[Storage] Failed to export user data:', error);
    return '';
  }
}
