import AccountForm from '@/components/dashboard/account-form';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <div className="p-6">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Update your name and email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
