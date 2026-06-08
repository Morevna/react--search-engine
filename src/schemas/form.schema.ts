import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((val) => /^[A-ZА-Я]/.test(val), {
        message: 'First letter must be uppercase',
      }),

    age: z
      .number({ message: 'Age must be a number' })
      .positive('Age must be a positive number')
      .max(120, 'Too old'),

    email: z
      .string()
      .min(1, 'Email is required')
      .refine(
        (val) => {
          const parts = val.split('@');
          if (parts.length !== 2) return false;
          const [local, domain] = parts;
          if (!local || !domain) return false;
          return domain.includes('.');
        },
        { message: 'Invalid email structure (e.g., user@example.com)' }
      ),

    gender: z.enum(['male', 'female', 'other'], {
      message: 'Please select a gender',
    }),

    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),

    country: z.string().min(1, 'Country is required'),

    image: z.string().min(1, 'Profile image is required'),

    terms: z.literal(true, {
      message: 'You must accept the terms',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match',
        path: ['confirmPassword'],
      });
    }
  });

export type FormSchemaType = z.infer<typeof formSchema>;
