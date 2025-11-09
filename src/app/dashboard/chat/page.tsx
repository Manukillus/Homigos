'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import GroupChat from '@/components/dashboard/group-chat';
import Header from '@/components/header';
import { Loader2 } from 'lucide-react';
import { collection, query, where } from 'firebase/firestore';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import type { RoommateGroup } from '@/lib/types';

export default function ChatPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  useAuthRedirect();

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

  if (isUserLoading || isGroupsLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Header title="Chat" />
      <div className="flex-1 overflow-hidden">
        <div className="h-full">
          <GroupChat roommates={currentGroup?.roommates || []} />
        </div>
      </div>
    </div>
  );
}
