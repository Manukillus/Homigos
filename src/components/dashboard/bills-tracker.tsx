'use client';

import { useToast } from '@/hooks/use-toast';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Receipt, Send, CreditCard, Users, User } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
} from '@/firebase';
import { collection, query, where, doc, addDoc } from 'firebase/firestore';
import type { RoommateGroup, Bill } from '@/lib/types';
import Link from 'next/link';

const initialBills: Omit<Bill, 'id' | 'roommateGroupId' | 'dueDate'>[] = [
  { name: 'Electricity', amount: 1500, due: '12th of month', status: 'Unpaid', description: 'Electricity Bill' },
  { name: 'Water', amount: 600, due: '15th of month', status: 'Unpaid', description: 'Water Bill' },
  { name: 'Wi-Fi', amount: 999, due: '5th of month', status: 'Unpaid', description: 'Wi-Fi Bill' },
  { name: 'Groceries', amount: 4000, due: '20th of month', status: 'Unpaid', description: 'Groceries' },
];

export default function BillsTracker() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const groupsQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(
            collection(firestore, 'roommateGroups'),
            where(`members.${user.uid}`, '==', 'member')
          )
        : null,
    [user, firestore]
  );

  const { data: groups, isLoading: isGroupsLoading } =
    useCollection<RoommateGroup>(groupsQuery);
  const currentGroup = groups?.[0];

  const billsQuery = useMemoFirebase(
    () =>
      firestore && currentGroup
        ? collection(firestore, 'roommateGroups', currentGroup.id, 'bills')
        : null,
    [firestore, currentGroup]
  );

  const { data: bills, isLoading: isBillsLoading } = useCollection<Bill>(billsQuery);

  // Function to seed initial bills if none exist
  const seedBills = async (groupId: string) => {
    if (!firestore) return;
    const billsCollectionRef = collection(
      firestore,
      'roommateGroups',
      groupId,
      'bills'
    );
    for (const bill of initialBills) {
      await addDoc(billsCollectionRef, {
        ...bill,
        dueDate: new Date().toISOString(),
        roommateGroupId: groupId
      });
    }
  };


  if (
    !isGroupsLoading &&
    currentGroup &&
    !isBillsLoading &&
    (!bills || bills.length === 0)
  ) {
    seedBills(currentGroup.id);
  }
  
  const unpaidBills = bills?.filter((bill) => bill.status === 'Unpaid') || [];
  const totalDue = unpaidBills.reduce((acc, bill) => acc + bill.amount, 0);
  const totalMembers = (currentGroup?.roommates?.length || 0) + 1;
  const amountPerPerson = totalDue / totalMembers;

  const handleSendReminders = () => {
    toast({
      title: 'Reminders Sent!',
      description: 'Payment reminders have been sent to your roommates.',
    });
  };

  if (isGroupsLoading || isBillsLoading) {
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
        <div className="bg-secondary p-4 rounded-lg mb-6">
            <CardHeader className="p-2">
                <CardTitle className="text-lg">Total Due</CardTitle>
                <CardDescription>
                    The total amount for all unpaid bills this month.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
                <div className="text-3xl font-bold">₹{totalDue.toLocaleString('en-IN')}</div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Users className="text-muted-foreground" />
                        <span>{totalMembers} Roommates</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <User className="text-muted-foreground" />
                        <span>₹{amountPerPerson.toLocaleString('en-IN', {maximumFractionDigits: 0})}/person</span>
                    </div>
                </div>
            </CardContent>
        </div>


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
            {(bills || []).map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">{bill.name}</TableCell>
                <TableCell>₹{bill.amount}</TableCell>
                <TableCell>{bill.due}</TableCell>
                <TableCell className="text-right">
                  {bill.status === 'Paid' ? (
                    <Badge variant="default" className="bg-green-600 text-white">
                      Paid
                    </Badge>
                  ) : (
                    <Button asChild variant="destructive" size="sm">
                      <Link
                        href={`/dashboard/billing/pay?billId=${
                          bill.id
                        }&billName=${encodeURIComponent(
                          bill.name
                        )}&amount=${bill.amount}&roommateGroupId=${currentGroup?.id}`}
                      >
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
