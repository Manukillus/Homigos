import ComplaintForm from '@/components/dashboard/complaint-form';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const issues = [
  {
    id: 1,
    title: 'Leaky faucet in kitchen',
    status: 'Resolved',
    date: '2023-10-28',
  },
  {
    id: 2,
    title: 'Wi-fi not working',
    status: 'In Progress',
    date: '2023-11-02',
  },
  {
    id: 3,
    title: 'Broken chair in living room',
    status: 'Open',
    date: '2023-11-05',
  },
];

export default function IssuesPage() {
  return (
    <>
      <Header title="Issues" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Issues History</CardTitle>
              <CardDescription>
                Track the status of reported issues.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-center justify-between rounded-md border p-4"
                  >
                    <div>
                      <p className="font-medium">{issue.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Reported on {issue.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        issue.status === 'Resolved'
                          ? 'default'
                          : issue.status === 'In Progress'
                          ? 'secondary'
                          : 'destructive'
                      }
                      className={issue.status === 'Resolved' ? 'bg-green-600 text-white' : ''}
                    >
                      {issue.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <ComplaintForm />
        </div>
      </div>
    </>
  );
}
