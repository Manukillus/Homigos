'use client';

import Link from 'next/link';
import RentSplit from '@/components/dashboard/rent-split';
import ChoresTracker from '@/components/dashboard/chores-tracker';
import BillsTracker from '@/components/dashboard/bills-tracker';
import { Button } from '@/components/ui/button';
import { Loader2, Home } from 'lucide-react';
import Header from '@/components/header';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
} from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { RoommateGroup } from '@/lib/types';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  useAuthRedirect();

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

  if (isUserLoading || isGroupsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentGroup) {
    return (
      <>
        <Header title="Dashboard" />
        <div className="container flex h-[80vh] flex-col items-center justify-center text-center">
          <Home className="h-24 w-24 text-muted-foreground/50" />
          <h2 className="mt-6 font-headline text-2xl font-semibold">
            No Household Found
          </h2>
          <p className="mt-2 text-muted-foreground">
            It looks like you haven&apos;t created or joined a household yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/dashboard/find-roommate">
              Find Roommates to Get Started
            </Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BillsTracker />
            <ChoresTracker />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <RentSplit roommates={currentGroup.roommates} />
          </div>
        </div>
      </div>
    </>
  );
}
