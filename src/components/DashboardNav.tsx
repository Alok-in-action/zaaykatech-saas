'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { LogOut } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface DashboardNavProps {
  title: string;
  role: 'admin' | 'agent' | 'owner';
  links?: NavLink[];
}

export default function DashboardNav({ title, role, links = [] }: DashboardNavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Logo />
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 px-2.5 py-1 rounded-full">
            {role}
          </span>
          <h1 className="hidden md:block font-headline text-lg font-bold text-foreground">
            {title}
          </h1>
        </div>

        <nav className="flex items-center gap-4">
          <div className="hidden sm:flex gap-4 mr-4">
            <Link
              href={`/${role}/dashboard`}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
