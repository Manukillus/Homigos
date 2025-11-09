'use client';

import BillHistory from '@/components/dashboard/bill-history';
import BillsTracker from '@/components/dashboard/bills-tracker';
import Header from '@/components/header';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { Loader2 } from 'lucide-react';

export default function BillingPage() {
  const { isLoading } = useAuthRedirect();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen">
      <Header title="Billing" />
      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        <BillsTracker />
        <BillHistory />
      </main>
    </div>
  );
}
