'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Roommate } from '@/lib/types';
import RentSplit from '@/components/dashboard/rent-split';
import ChoresTracker from '@/components/dashboard/chores-tracker';
import BillsTracker from '@/components/dashboard/bills-tracker';
import { Button } from '@/components/ui/button';
import { Loader2, Home } from 'lucide-react';
import Header from '@/components/header';

export default function DashboardPage() {
  const [household, setHousehold] = useState<Roommate[] | null>(null);

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
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (household.length === 0) {
    return (
      <>
        <Header title="Dashboard" />
        <div className="container flex h-[80vh] flex-col items-center justify-center text-center">
          <Home className="h-24 w-24 text-muted-foreground/50" />
          <h2 className="mt-6 font-headline text-2xl font-semibold">
            No Household Found
          </h2>
          <p className="mt-2 text-muted-foreground">
            It looks like you haven&apos;t created a household yet.
          </p>
          <Button asChild className="mt-6">
            <Link href="/find-roommate">Find Roommates to Get Started</Link>
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
            <ChoresTracker roommates={household} showRewards={false} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <RentSplit roommates={household} />
          </div>
        </div>
      </div>
    </>
  );
}
