import { z } from 'zod';
import { ETHNICITIES } from '@/lib/constants';

const sliderSchema = z.number().min(1).max(10);

export const sketchSchema = z.object({
  gender: z.enum(['Male', 'Female', 'Other'], {
    required_error: 'Please select a gender.',
  }),
  age: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  ethnicity: z.string().refine(val => ETHNICITIES.includes(val), {
    message: 'Please select a valid ethnicity.',
  }),
  // Eyes
  eyePosition: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  eyeSlant: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  eyeSize: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  // Nose
  noseWidth: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  noseBridge: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  // Lips
  lipThickness: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  lipWidth: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  // Jawline
  jawShape: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  jawProminence: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  // Other
  wrinkles: z.array(z.number()).min(1).max(1).transform(val => val[0]),
  facialHair: z.array(z.number()).min(1).max(1).transform(val => val[0]),
});

export type SketchFormValues = z.infer<typeof sketchSchema>;
