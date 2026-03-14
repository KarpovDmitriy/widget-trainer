export const profileContent = {
  header: {
    title: 'Profile',
    tabs: {
      overview: 'Overview',
      settings: 'Settings',
    },
  },
  overview: {
    labels: {
      fullName: 'Full Name',
      company: 'Company',
      phone: 'Phone',
      site: 'Website',
      country: 'Country',
      language: 'Language',
      timezone: 'TimeZone',
      email: 'Email',
    },
    placeholders: {
      notSpecified: '-',
    },
    headers: {
      details: 'Profile Details',
    },
  },
  form: {
    labels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      company: 'Company',
      site: 'Website',
      phone: 'Phone',
      country: 'Country',
      language: 'Language',
      timezone: 'TimeZone',
    },
    headers: {
      settings: 'Edit Profile',
    },
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
      back: 'Back',
    },
  },
  notifications: {
    success: 'Profile updated successfully!',
    error: 'Failed to save profile. Please try again.',
  },
  errors: {
    fetchFailed: 'Unable to load profile data',
    saveFailed: '[Profile] failed to save profile',
    // Новые ключи для схем:
    invalidPhone: 'Invalid phone number format',
    invalidUrl: 'Please enter a valid URL',
    required: (label: string): string => `${label} is required`, // Динамическая строка
  },
};
