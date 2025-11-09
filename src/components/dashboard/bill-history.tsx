'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { History } from 'lucide-react';

const billHistory = [
  {
    month: 'October 2023',
    items: [
      { name: 'Wi-Fi', amount: 999, date: '2023-10-05', status: 'Due' },
      { name: 'Electricity', amount: 1450, date: '2023-10-12', status: 'Due' },
      { name: 'Water', amount: 550, date: '2023-10-15', status: 'Due' },
      { name: 'Groceries', amount: 3800, date: '2023-10-20', status: 'Due' },
    ],
  },
  {
    month: 'September 2023',
    items: [
        { name: 'Wi-Fi', amount: 999, date: '2023-09-05', status: 'Due' },
        { name: 'Electricity', amount: 1600, date: '2023-09-12', status: 'Due' },
        { name: 'Water', amount: 580, date: '2023-09-15', status: 'Due' },
        { name: 'Groceries', amount: 4200, date: '2023-09-20', status: 'Due' },
    ],
  },
];

export default function BillHistory() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <History className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">Bill History</CardTitle>
            <CardDescription>
              A record of your past payments.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {billHistory.map((monthData) => (
            <div key={monthData.month}>
              <h3 className="font-semibold mb-2">{monthData.month}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date Paid</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthData.items.map((bill) => (
                    <TableRow key={bill.name}>
                      <TableCell className="font-medium">{bill.name}</TableCell>
                      <TableCell>₹{bill.amount}</TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={'destructive'}>
                          {bill.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
