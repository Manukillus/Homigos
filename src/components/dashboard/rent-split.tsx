import type { Roommate } from '@/lib/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { DollarSign } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type RentSplitProps = {
  roommates: Roommate[];
};

const avatarPlaceholders = PlaceHolderImages.filter((img) =>
  img.id.startsWith('avatar')
);
const TOTAL_RENT = 45000;

export default function RentSplit({ roommates }: RentSplitProps) {
  const allMembers = [{ name: 'You' }, ...roommates];
  const rentPerPerson = TOTAL_RENT / allMembers.length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <DollarSign className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-xl">Rent Split</CardTitle>
            <CardDescription>
              Total Rent: ₹{TOTAL_RENT.toLocaleString('en-IN')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {allMembers.map((member, index) => {
          const avatar = avatarPlaceholders[index % avatarPlaceholders.length];
          return (
            <div
              key={member.name}
              className="flex items-center justify-between rounded-md bg-secondary p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={avatar?.imageUrl} alt={member.name} />
                  <AvatarFallback>
                    {member.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.name}</span>
              </div>
              <span className="font-semibold">
                ₹{rentPerPerson.toLocaleString('en-IN', {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
