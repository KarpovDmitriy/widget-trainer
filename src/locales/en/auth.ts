export const authContent = {
  auth: {
    aside: {
      title: 'Widget Trainer',
      subtitle: 'Interactive Trainer for Developers',
      description:
        'A modern educational platform that transforms complex programming concepts into an engaging gaming experience.',
      features: [
        { label: 'Interactive Mini-Games:', text: 'Master Call Stack, Event Loop, and Memory Management.' },
        { label: 'Diverse Formats:', text: 'From classic quizzes to "Fill in the Blanks" code challenges.' },
        { label: 'Progress Tracking:', text: 'Analyze your growth with detailed session history.' },
      ],
      footer: 'Deep dive into coding with visual tasks and gamified learning.',
    },

    login: {
      title: 'Log in',
      googleBtn: 'Sign in with Google',
      separator: 'Or with email',
      forgotPassword: 'Forgot Password?',
      submitBtn: 'Log in',
      errors: {
        email: 'Please enter a valid email',
        password: 'At least 8 characters required',
      },

      form: {
        email: 'E-mail',
        password: 'Password',
      },
    },

    register: {
      title: 'Sign Up',
      subtitle: 'Already have an account?',
      signInLink: 'Sign in here',
      submitBtn: 'Submit',
      errors: {
        username: 'Min. 3 characters',
        email: 'Enter a valid email',
        password: 'Min. 8 characters',
        confirmPassword: 'Passwords must match',
      },
      form: {
        username: 'Username',
        placeholderUsername: 'John Doe',
        email: 'E-mail',
        password: 'Password',
        confirmPassword: 'Confirm password',
      },
    },
  },
};
