'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, Banknote, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function PaymentProcessor() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const billName = searchParams.get('bill');
  const billAmount = searchParams.get('amount');

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!billName || !billAmount) {
      setPaymentStatus('error');
      toast({
        title: 'Payment Error',
        description: 'Missing bill information. Please go back and try again.',
        variant: 'destructive',
      });
      router.replace('/dashboard/billing');
    }
  }, [billName, billAmount, router, toast]);

  const handleConfirmPayment = () => {
    setPaymentStatus('processing');
    // Simulate API call to process payment
    setTimeout(() => {
      try {
        const storedBills = localStorage.getItem('homigos-bills');
        if (storedBills) {
          const bills = JSON.parse(storedBills);
          const updatedBills = bills.map((bill: any) =>
            bill.name === billName ? { ...bill, status: 'Paid' } : bill
          );
          localStorage.setItem('homigos-bills', JSON.stringify(updatedBills));
          setPaymentStatus('success');
          toast({
            title: 'Payment Successful!',
            description: `Your payment of ₹${billAmount} for ${billName} has been processed.`,
          });
        } else {
            throw new Error("No bills found in storage.");
        }
      } catch (error) {
        console.error('Payment processing failed', error);
        setPaymentStatus('error');
         toast({
            title: 'Payment Failed',
            description: 'Could not update bill status. Please try again.',
            variant: 'destructive',
        });
      }
    }, 2000);
  };

  const renderContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="text-center">
            <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold">Processing your payment...</p>
            <p className="text-muted-foreground">Please do not close this window.</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <p className="text-lg font-semibold">Payment Successful!</p>
            <p className="text-muted-foreground">You will be redirected shortly.</p>
          </div>
        );
      case 'error':
        return (
            <div className="text-center">
                <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                <p className="text-lg font-semibold">Something went wrong</p>
                <p className="text-muted-foreground">We couldn't process your payment. Please try again.</p>
            </div>
        );
      case 'idle':
      default:
        return (
          <>
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Banknote /> Confirm Your Payment
              </CardTitle>
              <CardDescription>
                You are paying for <strong>{billName}</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-center py-8">
                ₹{Number(billAmount).toLocaleString('en-IN')}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                This amount will be debited from your linked bank account.
              </p>
            </CardContent>
          </>
        );
    }
  };

  const renderFooter = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <Button onClick={() => router.push('/dashboard/billing')} className="w-full">
            Back to Billing
          </Button>
        );
      case 'error':
         return (
          <Button onClick={() => router.push('/dashboard/billing')} className="w-full" variant="destructive">
            Return to Billing
          </Button>
        );
      case 'idle':
      default:
        return (
          <Button onClick={handleConfirmPayment} disabled={paymentStatus !== 'idle'} className="w-full">
            Confirm and Pay ₹{Number(billAmount).toLocaleString('en-IN')}
          </Button>
        );
    }
  };

  if (!billName || !billAmount) {
     return (
         <div className="flex h-[80vh] items-center justify-center">
             <Loader2 className="h-12 w-12 animate-spin text-primary" />
         </div>
     )
  }

  return (
    <div className="flex-1 bg-secondary/20 p-6 flex items-center justify-center">
      <Card className="w-full max-w-md">
        {renderContent()}
        <CardFooter>{renderFooter()}</CardFooter>
      </Card>
    </div>
  );
}


export default function PayPage() {
    return (
        <div className="flex flex-col h-screen">
            <Header title="Make Payment" />
            <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary"/></div>}>
                <PaymentProcessor />
            </Suspense>
        </div>
    )
}
