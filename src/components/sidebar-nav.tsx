'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { HomigosIcon } from './icons';
import {
  LayoutDashboard,
  UserPlus,
  MessageSquare,
  Receipt,
  ClipboardList,
  ShieldAlert,
  Star,
  LogOut,
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const navItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/find-roommate',
    icon: UserPlus,
    label: 'Add Roommates',
  },
  {
    href: '/dashboard/chat',
    icon: MessageSquare,
    label: 'Chat',
  },
  {
    href: '/dashboard/billing',
    icon: Receipt,
    label: 'Billing',
  },
  {
    href: '/dashboard/chores',
    icon: ClipboardList,
    label: 'Chores',
  },
  {
    href: '/dashboard/issues',
    icon: ShieldAlert,
    label: 'Issues',
  },
  {
    href: '/dashboard/feedback',
    icon: Star,
    label: 'Feedback',
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <HomigosIcon className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold">Homigos</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='p-2'>
        <Separator className="my-2" />
         <SidebarMenu>
            <SidebarMenuItem>
                 <Link href="/" passHref legacyBehavior>
                    <SidebarMenuButton tooltip={{children: 'Logout'}}>
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
