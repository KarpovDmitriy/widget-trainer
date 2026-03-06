export const profileContent = {
  nav: {
    overview: 'Overview',
    settings: 'Settings',
    back: '← Back',
  },
  headers: {
    details: 'Profile Details',
    settings: 'Profile Settings',
  },
  labels: {
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
    company: 'Company',
    phone: 'Phone',
    site: 'Site',
    country: 'Country',
    language: 'Language',
    timezone: 'Timezone',
    email: 'Email',
  },
  actions: {
    save: 'Save Changes',
    cancel: 'Cancel',
  },
  errors: {
    required: (field: string): string => `${field} is required`,
    invalidPhone: 'Invalid phone format',
    invalidUrl: 'Must be a valid URL (e.g., https://example.com)',
  },

  notifications: {
    success: 'Settings updated!',
  },
};
