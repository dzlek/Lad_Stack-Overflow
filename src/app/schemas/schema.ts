import { z } from 'zod';

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/\d/, 'Password must contain a number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;

export const createSnippetSchema = z.object({
  language: z.string().min(1, 'Language is required'),
  code: z.string().min(1, 'Code is required'),
});

export type FormData = z.infer<typeof createSnippetSchema>;
