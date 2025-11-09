'use client';

import { useState } from 'react';
import type { Roommate } from '@/lib/types';
import type { PreferencesFormValues } from '@/lib/schemas';
import { getRoommateMatches } from '@/app/actions';
import PreferenceForm from '@/components/preference-form';
import RoommateResults from '@/components/roommate-results';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Header from '@/components/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Step = 'form' | 'loading' | 'results';

export default function FindRoommatePage() {
  const [step, setStep] = useState<Step>('form');
  const [matches, setMatches] = useState<Roommate[]>([]);
  const { toast } = useToast();

  const handleFormSubmit = async (data: PreferencesFormValues) => {
    setStep('loading');
    const result = await getRoommateMatches(data);
    if (result.error || !result.data) {
      toast({
        title: 'Error',
        description: result.error || 'Failed to get roommate matches.',
        variant: 'destructive',
      });
      setStep('form');
    } else {
      setMatches(result.data);
      setStep('results');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'form':
        return (
          <>
            <div className="space-y-2 mb-8">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Find Your Perfect Roommate
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed">
                Fill out your preferences below and let our AI do the heavy
                lifting.
              </p>
            </div>
            <PreferenceForm
              onSubmit={handleFormSubmit}
              isSubmitting={false}
            />
          </>
        );
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <h2 className="font-headline text-2xl font-semibold">
              Matching you with your future Homigos...
            </h2>
            <p className="text-muted-foreground">
              This might take a moment.
            </p>
          </div>
        );
      case 'results':
        return <RoommateResults matches={matches} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header title="Find a Roommate" />
      <div className="flex-1 bg-secondary/20 p-6">
        <div className="container py-12">{renderStep()}</div>
      </div>
    </>
  );
}
