'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  preferencesSchema,
  type PreferencesFormValues,
} from '@/lib/schemas';
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
} from '@/lib/constants';
import { Textarea } from './ui/textarea';

type PreferenceFormProps = {
  onSubmit: (data: PreferencesFormValues) => void;
  isSubmitting: boolean;
};

export default function PreferenceForm({
  onSubmit,
  isSubmitting,
}: PreferenceFormProps) {
  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      roommatePreferences: {
        gender: 'Any',
        smoking: 'Doesn’t matter',
        drinking: 'Doesn’t matter',
        cleanliness: 'Average',
        sleep: 'Flexible',
        guests: 'Occasionally',
        cooking: 'Rarely',
        noise: 'Doesn’t matter',
      },
      roomPreferences: {
        food: 'Doesn’t matter',
        furnishing: 'Semi-furnished',
        bathroom: 'No',
        budget: '',
        location: '',
        amenities: '',
      },
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Roommate Preferences
            </CardTitle>
            <CardDescription>
              What are you looking for in a roommate?
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="roommatePreferences.gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender Preference</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GENDER_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roommatePreferences.smoking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Smoking</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select smoking preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SMOKING_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roommatePreferences.drinking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Drinking</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select drinking preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DRINKING_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roommatePreferences.cleanliness"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cleanliness Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cleanliness level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CLEANLINESS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roommatePreferences.sleep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sleep Schedule</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sleep schedule" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SLEEP_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roommatePreferences.guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests Allowed</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guest preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GUESTS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roommatePreferences.cooking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cooking Habits</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select cooking habits" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COOKING_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roommatePreferences.noise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Noise Tolerance</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select noise tolerance" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {NOISE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Room Preferences
            </CardTitle>
            <CardDescription>
              Tell us about your ideal living space.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="roomPreferences.food"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Preference</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select food preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FOOD_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomPreferences.furnishing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Furnishing</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select furnishing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FURNISHING_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomPreferences.bathroom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attached Bathroom</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bathroom preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BATHROOM_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomPreferences.budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (₹ per month)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10000 - 15000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomPreferences.location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Koramangala, Bangalore" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomPreferences.amenities"
              render={({ field }) => (
                <FormItem className="lg:col-span-3">
                  <FormLabel>Amenities Required</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Wi-Fi, AC, Kitchen, Washing Machine..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Finding your match...' : 'Find Roommates'}
        </Button>
      </form>
    </Form>
  );
}
