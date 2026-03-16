import { z } from 'zod';
import { authContent } from '@src/locales/en/auth';
import { profileContent } from '@src/locales/en/profile';

const {
  auth: { login: loginLang, register: regLang },
} = authContent;
const {
  profile: {
    form: { labels },
    errors: profErrors,
  },
} = profileContent;

const emailRule = z.string().min(1, loginLang.errors.email).email(loginLang.errors.email);

const passwordRule = z.string().min(8, loginLang.errors.password);

const requiredProfile = (label: string): z.ZodString => z.string().min(1, profErrors.required(label));

export const loginSchema = z.object({
  email: emailRule,
  password: z.string().min(1, loginLang.errors.password),
});

export const registerSchema = z
  .object({
    username: z.string().min(3, regLang.errors.username),
    email: emailRule,
    password: passwordRule,
    confirmPassword: z.string().min(1, regLang.errors.confirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: regLang.errors.confirmPassword,
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  firstName: requiredProfile(labels.firstName),
  lastName: requiredProfile(labels.lastName),
  company: requiredProfile(labels.company),
  email: emailRule,
  phone: z
    .string()
    .regex(/^[0-9+\-() ]*$/, profErrors.invalidPhone)
    .optional()
    .or(z.literal('')),
  site: z.string().url(profErrors.invalidUrl).optional().or(z.literal('')),
  country: requiredProfile(labels.country),
  language: requiredProfile(labels.language),
  timezone: requiredProfile(labels.timezone),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
