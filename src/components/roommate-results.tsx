'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Roommate,
  RoommateGroup,
} from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { PartyPopper, Loader2 } from 'lucide-react';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';

type RoommateResultsProps = {
  matches: Roommate[];
};

const avatarPlaceholders = PlaceHolderImages.filter((img) =>
  img.id.startsWith('avatar')
);

export default function RoommateResults({ matches }: RoommateResultsProps) {
  const [selectedRoommates, setSelectedRoommates] = useState<Roommate[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const handleSelectToggle = (roommate: Roommate) => {
    setSelectedRoommates((prev) =>
      prev.some((r) => r.name === roommate.name)
        ? prev.filter((r) => r.name !== roommate.name)
        : [...prev, roommate]
    );
  };

  const handleCreateHousehold = async () => {
    if (selectedRoommates.length === 0) {
      toast({
        title: 'No Roommates Selected',
        description:
          'Please select at least one roommate to create a household.',
        variant: 'destructive',
      });
      return;
    }
    if (!firestore || !user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a household.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);

    const roommateIds = selectedRoommates.map((r) => r.name); // Using name as ID for now
    const newGroup: Omit<RoommateGroup, 'id'> = {
      roommates: selectedRoommates,
      rentSplit: 45000 / (selectedRoommates.length + 1),
      members: {
        [user.uid]: 'member',
      },
    };

    try {
      const groupsCollection = collection(firestore, 'roommateGroups');
      await addDocumentNonBlocking(groupsCollection, newGroup);

      toast({
        title: 'Congratulations!',
        description: 'Your new household is ready. Welcome home!',
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating household:', error);
      toast({
        title: 'Household Creation Failed',
        description: 'Could not create the household. Please try again.',
        variant: 'destructive',
      });
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <PartyPopper className="mx-auto h-12 w-12 text-primary" />
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl mt-4">
          We found your potential Homigos!
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-2">
          Select the roommates you&apos;d like to form a household with.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((roommate, index) => {
          const avatar = avatarPlaceholders[index % avatarPlaceholders.length];
          const isSelected = selectedRoommates.some(
            (r) => r.name === roommate.name
          );
          const rationalePoints = roommate.rationale.split('- ').filter(p => p.trim() !== '');

          return (
            <Card
              key={roommate.name}
              className={`transition-all ${
                isSelected ? 'border-primary ring-2 ring-primary' : ''
              }`}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {avatar && (
                  <Image
                    src={avatar.imageUrl}
                    alt={roommate.name}
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-primary"
                    data-ai-hint={avatar.imageHint}
                  />
                )}
                <div className="w-full">
                  <CardTitle className="font-headline text-xl">
                    {roommate.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress
                      value={roommate.matchScore * 100}
                      className="w-full h-2"
                    />
                    <Badge variant="outline" className="whitespace-nowrap">
                      {Math.round(roommate.matchScore * 100)}% Match
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription asChild>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {rationalePoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div
                  className="flex items-center space-x-2 w-full justify-center p-4 rounded-md bg-secondary cursor-pointer hover:bg-muted"
                  onClick={() => handleSelectToggle(roommate)}
                >
                  <Checkbox
                    id={`select-${roommate.name}`}
                    checked={isSelected}
                    aria-label={`Select ${roommate.name}`}
                  />
                  <Label
                    htmlFor={`select-${roommate.name}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Select {roommate.name}
                  </Label>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          size="lg"
          onClick={handleCreateHousehold}
          disabled={selectedRoommates.length === 0 || isCreating}
        >
          {isCreating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Create Household ({selectedRoommates.length} selected)
        </Button>
      </div>
    </div>
  );
}
