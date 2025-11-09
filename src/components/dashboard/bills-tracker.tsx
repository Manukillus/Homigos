'use client';

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
import { Receipt, Send } from 'lucide-react';

const bills = [
  { name: 'Wi-Fi', amount: 999, due: '5th of month', status: 'Paid' },
  { name: 'Electricity', amount: 1500, due: '12th of month', status: 'Due' },
  { name: 'Water', amount: 600, due: '15th of month', status: 'Due' },
  { name: 'Groceries', amount: 4000, due: '20th of month', status: 'Paid' },
];

export default function BillsTracker() {
  const { toast } = useToast();

  const handleSendReminders = () => {
    toast({
      title: 'Reminders Sent!',
      description: 'Payment reminders have been sent to your roommates.',
    });
  };

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
                  <Badge
                    variant={bill.status === 'Paid' ? 'default' : 'destructive'}
                    className={`${
                      bill.status === 'Paid'
                        ? 'bg-green-600'
                        : 'bg-red-600'
                    } text-white`}
                  >
                    {bill.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
