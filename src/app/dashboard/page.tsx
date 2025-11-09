'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Roommate } from '@/lib/types';
import RentSplit from '@/components/dashboard/rent-split';
import ChoresTracker from '@/components/dashboard/chores-tracker';
import BillsTracker from '@/components/dashboard/bills-tracker';
import GroupChat from '@/components/dashboard/group-chat';
import ComplaintForm from '@/components/dashboard/complaint-form';
import FeedbackForm from '@/components/dashboard/feedback-form';
import { Button } from '@/components/ui/button';
import { Loader2, Home } from 'lucide-react';

export default function DashboardPage() {
  const [household, setHousehold] = useState<Roommate[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedHousehold = localStorage.getItem('homigos-household');
      if (storedHousehold) {
        setHousehold(JSON.parse(storedHousehold));
      } else {
        setHousehold([]); // No household found
      }
    } catch (error) {
      console.error('Failed to parse household data from localStorage', error);
      setHousehold([]);
    }
  }, []);

  if (household === null) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (household.length === 0) {
    return (
      <div className="container flex h-[80vh] flex-col items-center justify-center text-center">
        <Home className="h-24 w-24 text-muted-foreground/50" />
        <h2 className="mt-6 font-headline text-2xl font-semibold">
          No Household Found
        </h2>
        <p className="mt-2 text-muted-foreground">
          It looks like you haven't created a household yet.
        </p>
        <Button asChild className="mt-6">
          <Link href="/find-roommate">Find Roommates to Get Started</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="space-y-1">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            Your Household Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your shared living space with ease.
          </p>
        </div>
        <FeedbackForm />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BillsTracker />
          <ChoresTracker roommates={household} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <RentSplit roommates={household} />
          <ComplaintForm />
        </div>
        <div className="lg:col-span-3">
          <GroupChat roommates={household} />
        </div>
      </div>
    </div>
  );
}
