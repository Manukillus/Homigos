import { z } from 'zod';
import {
  BATHROOM_OPTIONS,
  CLEANLINESS_OPTIONS,
  COOKING_OPTIONS,
  DRINKING_OPTIONS,
  FOOD_OPTIONS,
  FURNISHING_OPTIONS,
  GENDER_OPTIONS,
  GUESTS_OPTIONS,
  NOISE_OPTIONS,
  SLEEP_OPTIONS,
  SMOKING_OPTIONS,
} from './constants';

export const preferencesSchema = z.object({
  roommatePreferences: z.object({
    gender: z.enum(GENDER_OPTIONS),
    smoking: z.enum(SMOKING_OPTIONS),
    drinking: z.enum(DRINKING_OPTIONS),
    cleanliness: z.enum(CLEANLINESS_OPTIONS),
    sleep: z.enum(SLEEP_OPTIONS),
    guests: z.enum(GUESTS_OPTIONS),
    cooking: z.enum(COOKING_OPTIONS),
    noise: z.enum(NOISE_OPTIONS),
  }),
  roomPreferences: z.object({
    food: z.enum(FOOD_OPTIONS),
    furnishing: z.enum(FURNISHING_OPTIONS),
    bathroom: z.enum(BATHROOM_OPTIONS),
    budget: z.string().min(1, 'Budget is required.'),
    location: z.string().min(1, 'Location is required.'),
    amenities: z.string().min(1, 'Amenities are required.'),
  }),
});

export type PreferencesFormValues = z.infer<typeof preferencesSchema>;
