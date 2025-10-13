import { z } from 'zod';
import { ETHNICITIES } from '@/lib/constants';

export const sketchSchema = z.object({
  gender: z.enum(['Male', 'Female', 'Other'], {
    required_error: 'Please select a gender.',
  }),
  age: z.number().min(18).max(80),
  ethnicity: z.string().refine(val => ETHNICITIES.includes(val), {
    message: 'Please select a valid ethnicity.',
  }),
  // Eyes
  eyePosition: z.number().min(1).max(10),
  eyeSlant: z.number().min(1).max(10),
  eyeSize: z.number().min(1).max(10),
  // Nose
  noseWidth: z.number().min(1).max(10),
  noseBridge: z.number().min(1).max(10),
  // Lips
  lipThickness: z.number().min(1).max(10),
  lipWidth: z.number().min(1).max(10),
  // Jawline
  jawShape: z.number().min(1).max(10),
  jawProminence: z.number().min(1).max(10),
  // Other
  wrinkles: z.number().min(1).max(10),
  facialHair: z.number().min(1).max(10),
});

export type SketchFormValues = z.infer<typeof sketchSchema>;
