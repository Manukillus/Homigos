'use server';

/**
 * @fileOverview Matches roommates based on user preferences using AI.
 *
 * - findRoommateMatches - Function to find roommate matches based on preferences.
 * - RoommatePreferencesInput - The input type for the findRoommateMatches function.
 * - RoommateMatchesOutput - The output type for the findRoommateMatches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RoommatePreferencesInputSchema = z.object({
  roommatePreferences: z.object({
    gender: z.enum(['Male', 'Female', 'Any']).describe('Gender preference (Male / Female / Any)'),
    smoking: z.enum(['Yes', 'No', 'Occasionally', 'Doesn’t matter']).describe('Smoking preference'),
    drinking: z.enum(['Yes', 'No', 'Occasionally', 'Doesn’t matter']).describe('Drinking preference'),
    cleanliness: z.enum(['Very neat', 'Average', 'Doesn’t matter']).describe('Cleanliness level'),
    sleep: z.enum(['Early sleeper', 'Night owl', 'Flexible']).describe('Sleep schedule'),
    guests: z.enum(['Yes', 'No', 'Occasionally']).describe('Guests allowed'),
    cooking: z.enum(['Cooks often', 'Rarely', 'Eats out']).describe('Cooking habits'),
    noise: z.enum(['Quiet', 'Social', 'Doesn’t matter']).describe('Noise tolerance'),
  }).describe('Roommate Preferences'),
  roomPreferences: z.object({
    food: z.enum(['Veg', 'Non-veg', 'Eggetarian', 'Doesn’t matter']).describe('Food preference'),
    furnishing: z.enum(['Fully furnished', 'Semi-furnished', 'Unfurnished']).describe('Furnishing'),
    bathroom: z.enum(['Yes', 'No']).describe('Attached bathroom'),
    budget: z.string().describe('Budget range (₹ per month)'),
    location: z.string().describe('Preferred location / distance from workplace/college'),
    amenities: z.string().describe('Amenities required: (Wi-Fi, AC, Kitchen, Washing Machine, etc.)'),
  }).describe('Room Preferences'),
});
export type RoommatePreferencesInput = z.infer<typeof RoommatePreferencesInputSchema>;

const RoommateMatchesOutputSchema = z.array(
  z.object({
    name: z.string().describe('Name of the potential roommate'),
    matchScore: z.number().describe('A score indicating how well the roommate matches the preferences'),
    rationale: z.string().describe('Explanation of why this roommate is a good match'),
  })
).describe('List of potential roommates and their match scores');
export type RoommateMatchesOutput = z.infer<typeof RoommateMatchesOutputSchema>;

export async function findRoommateMatches(input: RoommatePreferencesInput): Promise<RoommateMatchesOutput> {
  return roommateMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'roommateMatchingPrompt',
  input: {schema: RoommatePreferencesInputSchema},
  output: {schema: RoommateMatchesOutputSchema},
  prompt: `You are an AI assistant designed to find the best roommate matches for users based on their preferences.

  The user has provided the following preferences:

  Roommate Preferences:
  - Gender: {{{roommatePreferences.gender}}}
  - Smoking: {{{roommatePreferences.smoking}}}
  - Drinking: {{{roommatePreferences.drinking}}}
  - Cleanliness: {{{roommatePreferences.cleanliness}}}
  - Sleep schedule: {{{roommatePreferences.sleep}}}
  - Guests allowed: {{{roommatePreferences.guests}}}
  - Cooking habits: {{{roommatePreferences.cooking}}}
  - Noise tolerance: {{{roommatePreferences.noise}}}

  Room Preferences:
  - Food: {{{roomPreferences.food}}}
  - Furnishing: {{{roomPreferences.furnishing}}}
  - Bathroom: {{{roomPreferences.bathroom}}}
  - Budget: {{{roomPreferences.budget}}}
  - Location: {{{roomPreferences.location}}}
  - Amenities: {{{roomPreferences.amenities}}}

  Find 3 potential roommates that best match these preferences. Generate a list of potential roommates. The output should be a JSON array, each object includes the roommate's name, a match score between 0 and 1, and a rationale explaining why they are a good fit. Make the names Indian.
  `,
});

const roommateMatchingFlow = ai.defineFlow(
  {
    name: 'roommateMatchingFlow',
    inputSchema: RoommatePreferencesInputSchema,
    outputSchema: RoommateMatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
