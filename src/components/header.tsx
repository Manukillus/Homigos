'use client';
import { Button } from './ui/button';
import { ArrowLeft, Bell, User, LogOut } from 'lucide-react';
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
import { ThemeToggle } from './theme-toggle';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import Link from 'next/link';

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
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
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
            <ThemeToggle />
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://images.unsplash.com/photo-1750535135451-7c20e24b60c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwZXJzb24lMjBhdmF0YXJ8ZW58MHx8fHwxNzYyNjM2NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                        <User className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
