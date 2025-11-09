import { type RoommateMatchesOutput } from '@/ai/flows/roommate-matching';

export type Roommate = RoommateMatchesOutput[number];

export interface RoommateGroup {
  id: string;
  roommates: Roommate[];
  rentSplit: number;
  members: {
    [key: string]: 'owner' | 'member';
  }
}

export interface Bill {
    id: string;
    name: string;
    amount: number;
    due: string;
    status: 'Paid' | 'Unpaid';
    description: string;
    dueDate: string;
    roommateGroupId: string;
}
