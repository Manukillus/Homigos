'use client';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

type ComplaintFormValues = {
  title: string;
  description: string;
}

type ComplaintFormProps = {
  onSubmit: (data: ComplaintFormValues) => void;
}

export default function ComplaintForm({ onSubmit }: ComplaintFormProps) {
  const form = useForm<ComplaintFormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleFormSubmit = (data: ComplaintFormValues) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 pt-4">
          <FormField
          control={form.control}
          name="title"
          rules={{ required: 'Title cannot be empty.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Leaky faucet in kitchen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          rules={{ required: 'Complaint message cannot be empty.' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue... You can mention a user with @"
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Button type="submit">Submit Complaint</Button>
        </div>
      </form>
    </Form>
  );
}
