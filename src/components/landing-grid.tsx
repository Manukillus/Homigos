'use client';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { HomigosIcon } from './icons';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const gridItems = [
  {
    id: 'find-roommate',
    title: 'Find Your Tribe',
    description:
      'AI-powered matching to find compatible roommates.',
    href: '/dashboard/find-roommate',
    imageId: 'heroImage',
    imageHint: 'friends living room',
  },
  {
    id: 'manage-bills',
    title: 'Manage Bills',
    description: 'Split bills and track payments seamlessly.',
    href: '/dashboard/billing',
    imageId: 'avatar1',
    imageHint: 'calculator money',
  },
  {
    id: 'organize-chores',
    title: 'Organize Chores',
    description: 'Assign and track household chores.',
    href: '/dashboard/chores',
imageId: 'avatar2',
    imageHint: 'cleaning checklist',
  },
  {
    id: 'group-chat',
    title: 'Group Chat',
    description: 'Communicate with your housemates.',
    href: '/dashboard/chat',
    imageId: 'avatar3',
    imageHint: 'chat bubbles',
  },
];

export default function LandingGrid() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-code text-foreground">
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <HomigosIcon className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold inline-block">
              Homigos
            </span>
          </Link>
          <Button asChild variant="ghost">
            <Link href="/dashboard">Go to App <ArrowRight className="ml-2" /></Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gridItems.map((item, index) => {
            const placeholder = PlaceHolderImages.find(
              (img) => img.id === item.imageId
            );
            return (
              <Link key={item.id} href={item.href} className={index % 2 !== 0 ? 'md:mt-16' : ''}>
                <div className="group relative aspect-[4/3] overflow-hidden">
                  {placeholder && (
                    <Image
                      src={placeholder.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={item.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h2 className="text-xl font-semibold uppercase tracking-wider">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <footer className="w-full border-t border-border/40 p-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Homigos. Shared Living, Simplified.</p>
      </footer>
    </div>
  );
}
