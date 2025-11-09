import Link from 'next/link';
import { HomigosIcon } from '@/components/icons';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex">
          <Link href="/" className="flex items-center space-x-2">
            <HomigosIcon className="h-6 w-6 text-primary" />
            <span className="font-headline text-2xl font-bold inline-block">
              Homigos
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
