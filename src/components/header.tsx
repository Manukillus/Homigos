'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { ArrowLeft, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from './ui/badge';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const notifications = [
    { title: 'Rent is due tomorrow', description: 'Due: ₹22,500' },
    { title: 'New chore assigned', description: 'Clean Kitchen on Monday' },
    { title: 'Bill reminder', description: 'Electricity bill is due in 3 days' },
];


export default function Header({ title, showBackButton = false }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeft />
            </Button>
          )}
          <h1 className="font-headline text-2xl font-bold tracking-tighter">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell />
                        {notifications.length > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{notifications.length}</Badge>
                        )}
                        <span className='sr-only'>Notifications</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='w-80'>
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <DropdownMenuItem key={index} className='flex flex-col items-start gap-1'>
                                <p className='font-semibold'>{notification.title}</p>
                                <p className='text-xs text-muted-foreground'>{notification.description}</p>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <DropdownMenuItem>No new notifications</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
