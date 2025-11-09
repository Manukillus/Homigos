'use client';

import ChoresTracker from '@/components/dashboard/chores-tracker';
import Header from '@/components/header';
import { Loader2 } from 'lucide-react';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';

export default function ChoresPage() {
  const { isLoading } = useAuthRedirect();
  if (isLoading) {
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
        <ChoresTracker />
      </div>
    </>
  );
}
