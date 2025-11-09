import BillsTracker from '@/components/dashboard/bills-tracker';
import Header from '@/components/header';

export default function BillingPage() {
  return (
    <>
      <Header title="Billing" />
      <div className="p-6">
        <BillsTracker />
      </div>
    </>
  );
}
