'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth, initiateAnonymousSignIn } from '@/firebase';

export function useAuthRedirect() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      // If not loading and no user, sign in anonymously
      if (auth) {
        initiateAnonymousSignIn(auth);
      }
    }
  }, [user, isUserLoading, router, auth]);

  return { user, isLoading: isUserLoading };
}
