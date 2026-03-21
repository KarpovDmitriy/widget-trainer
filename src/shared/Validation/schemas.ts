import { i18CheckPath } from '@utils/zod-i18.typecheck';
import { z } from 'zod';

const emailRule = z
  .string()
  .min(1, i18CheckPath('auth.login.errors.email'))
  .email(i18CheckPath('auth.login.errors.email'));

const passwordRule = z.string().min(8, i18CheckPath('auth.login.errors.password'));

const requiredProfile = z.string().min(1, i18CheckPath('profile.errors.required'));

export const loginSchema = z.object({
  email: emailRule,
  password: z.string().min(1, i18CheckPath('auth.login.errors.password')),
});

export const registerSchema = z
  .object({
    username: z.string().min(3, i18CheckPath('auth.register.errors.username')),
    email: emailRule,
    password: passwordRule,
    confirmPassword: z.string().min(1, i18CheckPath('auth.register.errors.confirmPassword')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18CheckPath('auth.register.errors.confirmPassword'),
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  firstName: requiredProfile,
  lastName: requiredProfile,
  company: requiredProfile,
  email: emailRule,
  phone: z
    .string()
    .regex(/^[0-9+\-() ]*$/, i18CheckPath('profile.errors.invalidPhone'))
    .optional()
    .or(z.literal('')),
  site: z.string().url(i18CheckPath('profile.errors.invalidUrl')).optional().or(z.literal('')),
  country: requiredProfile,
  language: requiredProfile,
  timezone: requiredProfile,
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
