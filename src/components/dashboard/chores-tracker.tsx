import type { Roommate } from '@/lib/types';
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
import { ClipboardList } from 'lucide-react';

type ChoresTrackerProps = {
  roommates: Roommate[];
};

const chores = [
  { chore: 'Clean Kitchen', day: 'Monday' },
  { chore: 'Take out Trash', day: 'Tuesday' },
  { chore: 'Clean Bathroom', day: 'Wednesday' },
  { chore: 'Vaccum Living Room', day: 'Thursday' },
  { chore: 'Groceries', day: 'Friday' },
];

export default function ChoresTracker({ roommates }: ChoresTrackerProps) {
  const allMembers = [{ name: 'You' }, ...roommates];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <ClipboardList className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-xl">Chore Chart</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Chore</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Day</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chores.map((chore, index) => (
              <TableRow key={chore.chore}>
                <TableCell className="font-medium">{chore.chore}</TableCell>
                <TableCell>
                  {allMembers[index % allMembers.length].name}
                </TableCell>
                <TableCell>{chore.day}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
