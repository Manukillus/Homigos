import FeedbackForm from '@/components/dashboard/feedback-form';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FeedbackPage() {
  return (
    <>
      <Header title="Feedback" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Room Feedback</CardTitle>
              <CardDescription>
                How can we improve the living space?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Roommate Feedback</CardTitle>
              <CardDescription>
                Provide anonymous feedback about your roommates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
