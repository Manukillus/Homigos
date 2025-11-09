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
    status: 'Paid' | 'Unpaid' | 'Due';
    description: string;
    dueDate: string;
    roommateGroupId: string;
}

export interface Complaint {
  id: string;
  userId: string;
  title: string;
  description: string;
  submissionDate: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  roommateGroupId: string;
}
