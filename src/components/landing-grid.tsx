'use client';
import Link from 'next/link';
import { HomigosIcon } from './icons';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const gridItems = [
  {
    id: 'find-roommate',
    title: 'Find Your Tribe',
    description: 'AI-powered matching to find compatible roommates.',
    href: '/dashboard/find-roommate',
    image: PlaceHolderImages.find((img) => img.id === 'heroImage'),
  },
  {
    id: 'manage-bills',
    title: 'Manage Bills',
    description: 'Split bills and track payments seamlessly.',
    href: '/dashboard/billing',
    image: PlaceHolderImages.find((img) => img.id === 'avatar1'),
  },
  {
    id: 'organize-chores',
    title: 'Organize Chores',
    description: 'Assign and track household chores.',
    href: '/dashboard/chores',
    image: PlaceHolderImages.find((img) => img.id === 'avatar2'),
  },
  {
    id: 'group-chat',
    title: 'Group Chat',
    description: 'Communicate with your housemates.',
    href: '/dashboard/chat',
    image: PlaceHolderImages.find((img) => img.id === 'avatar3'),
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
          <Button asChild variant="ghost" className="font-code">
            <Link href="/dashboard">
              Go to App <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gridItems.map((item, index) => (
            <Link key={item.id} href={item.href}>
              <div
                className={`group relative aspect-[4/3] bg-cover bg-center p-6 flex flex-col justify-between text-white ${
                  index % 2 !== 0 ? 'md:mt-16' : ''
                }`}
                style={{ backgroundImage: `url(${item.image?.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300" />
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold uppercase tracking-wider">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/80">
                    {item.description}
                  </p>
                </div>
                <div className="relative z-10 flex justify-end">
                  <ArrowRight className="h-6 w-6 text-white/80 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="w-full border-t border-border/40 p-4 text-center text-xs text-muted-foreground font-code">
        <p>
          &copy; {new Date().getFullYear()} Homigos. Shared Living, Simplified.
        </p>
      </footer>
    </div>
  );
}
