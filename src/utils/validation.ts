export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const doPasswordsMatch = (pass: string, confirmPass: string): boolean => {
  return pass === confirmPass;
};

export const isValidUsername = (username: string): boolean => {
  return username.trim().length >= 3;
};
