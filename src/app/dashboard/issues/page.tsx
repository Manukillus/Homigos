'use client';

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
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
  addDocumentNonBlocking,
} from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { RoommateGroup, Complaint } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function IssuesPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const groupsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(
            collection(firestore, 'roommateGroups'),
            where(`members.${user.uid}`, '==', 'member')
          )
        : null,
    [user, firestore]
  );

  const { data: groups, isLoading: isGroupsLoading } =
    useCollection<RoommateGroup>(groupsQuery);
  const currentGroup = groups?.[0];

  const complaintsQuery = useMemoFirebase(
    () =>
      firestore && currentGroup
        ? collection(firestore, 'roommateGroups', currentGroup.id, 'complaints')
        : null,
    [firestore, currentGroup]
  );

  const { data: complaints, isLoading: isComplaintsLoading } =
    useCollection<Complaint>(complaintsQuery);

  const handleAddComplaint = async (complaint: {
    title: string;
    description: string;
  }) => {
    if (!firestore || !currentGroup || !user) {
      toast({
        title: 'Error',
        description: 'Could not submit complaint. Please try again.',
        variant: 'destructive',
      });
      return;
    }
    const complaintsCollection = collection(
      firestore,
      'roommateGroups',
      currentGroup.id,
      'complaints'
    );
    const newComplaint: Omit<Complaint, 'id'> = {
      ...complaint,
      status: 'In Progress',
      submissionDate: new Date().toISOString(),
      userId: user.uid,
      roommateGroupId: currentGroup.id,
    };
    await addDocumentNonBlocking(complaintsCollection, newComplaint);
    toast({
      title: 'Complaint Submitted',
      description:
        'Your complaint has been submitted and is now being tracked.',
    });
  };

  const isLoading = isUserLoading || isGroupsLoading || isComplaintsLoading;

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
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {(complaints || []).map((issue) => (
                    <div
                      key={issue.id}
                      className="flex items-center justify-between rounded-md border p-4"
                    >
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Reported on{' '}
                          {new Date(issue.submissionDate).toLocaleDateString()}
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
                        className={
                          issue.status === 'Resolved'
                            ? 'bg-green-600 text-white'
                            : ''
                        }
                      >
                        {issue.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <ComplaintForm onSubmit={handleAddComplaint} />
        </div>
      </div>
    </>
  );
}
