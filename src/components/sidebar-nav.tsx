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
  Settings,
} from 'lucide-react';
import { Separator } from './ui/separator';

const navItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/dashboard/find-roommate',
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

const settingsNavItems = [
    {
        href: '/dashboard/settings',
        icon: Settings,
        label: 'Settings',
    }
]

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
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                  asChild
                >
                  <div>
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='p-2'>
        <Separator className="my-2" />
         <SidebarMenu>
            {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={{ children: item.label }}
                      asChild
                    >
                      <div>
                        <item.icon />
                        <span>{item.label}</span>
                      </div>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
                 <Link href="/" passHref>
                    <SidebarMenuButton tooltip={{children: 'Logout'}} asChild>
                        <div>
                          <LogOut />
                          <span>Logout</span>
                        </div>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
