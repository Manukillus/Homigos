'use server';

import {
  findRoommateMatches,
  type RoommatePreferencesInput,
} from '@/ai/flows/roommate-matching';
import { preferencesSchema } from '@/lib/schemas';

export async function getRoommateMatches(formData: unknown) {
  const validatedData = preferencesSchema.safeParse(formData);

  if (!validatedData.success) {
    return {
      error: 'Invalid form data.',
      data: null,
    };
  }

  try {
    const input: RoommatePreferencesInput = validatedData.data;
    const matches = await findRoommateMatches(input);
    return { error: null, data: matches };
  } catch (error) {
    console.error('Error finding roommate matches:', error);
    return {
      error: 'An unexpected error occurred. Please try again later.',
      data: null,
    };
  }
}
