import BillsTracker from '@/components/dashboard/bills-tracker';
import Header from '@/components/header';

export default function BillingPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Billing" />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="container mx-auto">
          <BillsTracker />
        </div>
      </div>
    </div>
  );
}
