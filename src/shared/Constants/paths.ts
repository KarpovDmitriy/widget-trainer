export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  LIBRARY: '/library',
  PROFILE: '/profile',
  PRACTICE: (topicId: string | number = ':topicId') => `/practice/${topicId}`,
} as const;
