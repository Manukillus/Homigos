import BillHistory from '@/components/dashboard/bill-history';
import BillsTracker from '@/components/dashboard/bills-tracker';
import Header from '@/components/header';

export default function BillingPage() {
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
