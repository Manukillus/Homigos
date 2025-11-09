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
import { Checkbox } from '@/components/ui/checkbox';
import { ClipboardList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { RoommateGroup } from '@/lib/types';
import { Loader2 } from 'lucide-react';


const initialChores = [
  { chore: 'Clean Kitchen', day: 'Monday', completed: false },
  { chore: 'Take out Trash', day: 'Tuesday', completed: false },
  { chore: 'Clean Bathroom', day: 'Wednesday', completed: false },
  { chore: 'Vaccum Living Room', day: 'Thursday', completed: false },
  { chore: 'Groceries', day: 'Friday', completed: false },
];

export default function ChoresTracker() {
  const { toast } = useToast();
  const [chores, setChores] = useState(initialChores);
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
  const roommates = groups?.[0]?.roommates || [];

  const allMembers = [{ name: 'You' }, ...roommates];

  const handleChoreToggle = (choreName: string) => {
    setChores(prevChores => {
      const newChores = prevChores.map(chore => {
        if (chore.chore === choreName) {
          const updatedChore = { ...chore, completed: !chore.completed };
          if(updatedChore.completed) {
            toast({
              title: 'Chore Completed!',
              description: `You've completed: ${chore.chore}`,
            });
          }
          return updatedChore;
        }
        return chore;
      });
      return newChores;
    });
  };

  if (isGroupsLoading) {
    return (
         <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                <ClipboardList className="h-8 w-8 text-primary" />
                <CardTitle className="font-headline text-xl">Chore Chart</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center">
                 <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
         </Card>
    )
  }

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
