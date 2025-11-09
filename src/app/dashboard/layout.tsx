import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/sidebar-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNav />
        <main className="flex-1 bg-secondary/20">{children}</main>
      </div>
    </SidebarProvider>
  );
}
