'use client';

import { useState, useEffect } from 'react';
import type { Roommate } from '@/lib/types';
import ChoresTracker from '@/components/dashboard/chores-tracker';
import Header from '@/components/header';
import { Loader2 } from 'lucide-react';

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
      <div className="p-6">
          <ChoresTracker roommates={household} />
      </div>
    </>
  );
}
