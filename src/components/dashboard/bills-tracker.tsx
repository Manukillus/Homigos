'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Receipt, Send, CreditCard } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const initialBills = [
  { name: 'Wi-Fi', amount: 999, due: '5th of month', status: 'Due' },
  { name: 'Electricity', amount: 1500, due: '12th of month', status: 'Due' },
  { name: 'Water', amount: 600, due: '15th of month', status: 'Due' },
  { name: 'Groceries', amount: 4000, due: '20th of month', status: 'Due' },
];

type Bill = {
  name: string;
  amount: number;
  due: string;
  status: 'Paid' | 'Due' | 'Unpaid';
};

export default function BillsTracker() {
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[] | null>(null);

  useEffect(() => {
    try {
      const storedBills = localStorage.getItem('homigos-bills');
      if (storedBills) {
        setBills(JSON.parse(storedBills));
      } else {
        setBills(initialBills);
        localStorage.setItem('homigos-bills', JSON.stringify(initialBills));
      }
    } catch (error) {
      console.error('Failed to access localStorage', error);
      setBills(initialBills);
    }
  }, []);

  const handleSendReminders = () => {
    toast({
      title: 'Reminders Sent!',
      description: 'Payment reminders have been sent to your roommates.',
    });
  };

  if (bills === null) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <Receipt className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-xl">Bills</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="h-48 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Receipt className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-xl">Bills</CardTitle>
        </div>
        <Button variant="outline" size="sm" onClick={handleSendReminders}>
          <Send className="mr-2 h-4 w-4" />
          Send Reminders
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bill</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.name}>
                <TableCell className="font-medium">{bill.name}</TableCell>
                <TableCell>₹{bill.amount}</TableCell>
                <TableCell>{bill.due}</TableCell>
                <TableCell className="text-right">
                  {bill.status === 'Paid' ? (
                    <Badge
                      variant="destructive"
                    >
                      Unpaid
                    </Badge>
                  ) : (
                    <Button asChild variant="destructive" size="sm">
                       <Link href={`/dashboard/billing/pay?bill=${encodeURIComponent(bill.name)}&amount=${bill.amount}`}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay
                      </Link>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
