import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Handshake, ShieldCheck } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HomigosIcon } from './icons';

const heroImage = PlaceHolderImages.find((img) => img.id === 'heroImage');

const features = [
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: 'Find Your Tribe',
    description:
      'Our AI-powered matching helps you find compatible roommates based on your lifestyle and preferences.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Manage Your Home',
    description:
      'Split bills, assign chores, and communicate seamlessly with your housemates all in one place.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Live Harmoniously',
    description:
      'Resolve issues with a transparent complaint system and foster a positive living environment.',
  },
];

export default function LandingHero() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <HomigosIcon className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold inline-block">
              Homigos
            </span>
          </Link>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 md:px-6">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Shared Living, Simplified.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Homigos is your all-in-one solution for harmonious co-living.
                    From finding the perfect roommate to managing daily chores and
                    expenses, we make shared spaces work.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/find-roommate">
                      Find Your Roommate <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={600}
                    height={400}
                    className="rounded-xl object-cover shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary -mx-4 px-4 md:-mx-6 md:px-6">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                    Everything You Need for a Happy Home
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Managing a shared home is chaotic. Homigos brings order with
                    powerful, easy-to-use tools.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      {feature.icon}
                      <CardTitle className="font-headline text-xl">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
