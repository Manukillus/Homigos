'use client';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';

export default function ComplaintForm() {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      complaint: '',
    },
  });

  const onSubmit = () => {
    // In a real app, this would trigger a server action to send an email.
    toast({
      title: 'Complaint Submitted',
      description:
        "Your complaint has been sent to the house owner. We'll look into it shortly.",
    });
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <ShieldAlert className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">
              File a Complaint
            </CardTitle>
            <CardDescription>
              Your message will be sent to the house owner.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="complaint"
              rules={{ required: 'Complaint message cannot be empty.' }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue... (e.g., The Wi-Fi is down again.)"
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit Complaint</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
