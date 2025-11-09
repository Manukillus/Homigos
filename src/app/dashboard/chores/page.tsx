'use client';

import { useState, useEffect } from 'react';
import type { Roommate } from '@/lib/types';
import ChoresTracker from '@/components/dashboard/chores-tracker';
import Header from '@/components/header';
import { Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export default function ChoresPage() {
  const [household, setHousehold] = useState<Roommate[] | null>(null);

  useEffect(() => {
    try {
      const storedHousehold = localStorage.getItem('homigos-household');
      setHousehold(storedHousehold ? JSON.parse(storedHousehold) : []);
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

  return (
    <>
      <Header title="Chores" />
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChoresTracker roommates={household} showRewards={true} />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className='flex-row items-center gap-4 space-y-0'>
              <Gift className="h-8 w-8 text-primary" />
              <CardTitle className='font-headline text-xl'>Monthly Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete chores to earn points. The roommate with the most points at the end of the month gets a reward!
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded-md bg-secondary">
                  <p className="font-semibold">🥇 1st Place</p>
                  <p className="text-sm text-muted-foreground">₹500 Amazon Gift Card</p>
                </div>
                <div className="p-3 rounded-md bg-secondary">
                  <p className="font-semibold">🥈 2nd Place</p>
                  <p className="text-sm text-muted-foreground">₹250 Swiggy Voucher</p>
                </div>
                <div className="p-3 rounded-md bg-secondary">
                  <p className="font-semibold">🥉 3rd Place</p>
                  <p className="text-sm text-muted-foreground">Free coffee</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
