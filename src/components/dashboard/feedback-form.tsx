'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';

export default function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      feedback: '',
    },
  });

  const onSubmit = () => {
    toast({
      title: 'Thank You!',
      description: 'Your feedback has been submitted successfully.',
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageCircle className="mr-2 h-4 w-4" />
          Give Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle className="font-headline flex items-center gap-2">
                <Star className="text-primary" />
                Give Feedback
              </DialogTitle>
              <DialogDescription>
                We'd love to hear your thoughts on Homigos. What can we
                improve?
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="feedback"
                rules={{ required: 'Feedback message cannot be empty.' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you think..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Feedback</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
