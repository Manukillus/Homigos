'use client';
import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardList, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ChoresTrackerProps = {
  roommates: Roommate[];
  showRewards: boolean;
};

const initialChores = [
  { chore: 'Clean Kitchen', day: 'Monday', completed: false, points: 10 },
  { chore: 'Take out Trash', day: 'Tuesday', completed: false, points: 5 },
  { chore: 'Clean Bathroom', day: 'Wednesday', completed: false, points: 15 },
  { chore: 'Vaccum Living Room', day: 'Thursday', completed: false, points: 10 },
  { chore: 'Groceries', day: 'Friday', completed: false, points: 5 },
];

export default function ChoresTracker({ roommates, showRewards }: ChoresTrackerProps) {
  const { toast } = useToast();
  const [chores, setChores] = useState(initialChores);
  const allMembers = [{ name: 'You' }, ...roommates];

  const handleChoreToggle = (choreName: string) => {
    setChores(prevChores => {
      const newChores = prevChores.map(chore => {
        if (chore.chore === choreName) {
          const updatedChore = { ...chore, completed: !chore.completed };
          if(updatedChore.completed) {
            toast({
              title: 'Chore Completed!',
              description: `You earned ${chore.points} points for completing: ${chore.chore}`,
            });
          }
          return updatedChore;
        }
        return chore;
      });
      return newChores;
    });
  };

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
              {showRewards && <TableHead>Points</TableHead>}
              <TableHead className="text-right">Completed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chores.map((chore, index) => (
              <TableRow key={chore.chore} className={chore.completed ? 'bg-secondary/50' : ''}>
                <TableCell className={`font-medium ${chore.completed ? 'text-muted-foreground line-through' : ''}`}>{chore.chore}</TableCell>
                <TableCell className={chore.completed ? 'text-muted-foreground' : ''}>
                  {allMembers[index % allMembers.length].name}
                </TableCell>
                <TableCell className={chore.completed ? 'text-muted-foreground' : ''}>{chore.day}</TableCell>
                {showRewards && (
                  <TableCell className={`flex items-center gap-1 ${chore.completed ? 'text-muted-foreground' : 'text-primary font-bold'}`}>
                    <Award className="h-4 w-4" />
                    {chore.points}
                  </TableCell>
                )}
                <TableCell className="text-right">
                   <Checkbox
                    checked={chore.completed}
                    onCheckedChange={() => handleChoreToggle(chore.chore)}
                    id={`chore-${chore.chore}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
