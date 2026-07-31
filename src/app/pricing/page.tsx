"use client";
import { Home as HomeIcon, Info, Briefcase, IndianRupee, MessageCircle, LogIn } from 'lucide-react';
import Footer from '@/components/Footer';
import { PillBase } from '@/components/ui/3d-adaptive-navigation-bar';
import { ModeToggle } from '@/components/mode-toggle';
import { NavBar } from '@/components/ui/tubelight-navbar';
import PricingCards from '@/components/ui/pricing-component';

const desktopNavItems = [
  { name: 'Home', url: '/', icon: HomeIcon },
  { name: 'Why Us', url: '/#features', icon: Info },
  { name: 'Our Work', url: '/#work', icon: Briefcase },
  { name: 'Pricing', url: '/pricing', icon: IndianRupee },
  { name: 'Contact', url: '/#contact', icon: MessageCircle },
  { name: 'Login', url: '/login', icon: LogIn }
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Desktop Navigation (Top) */}
      <div className="hidden md:block">
        <NavBar items={desktopNavItems} />
      </div>

      {/* Mobile Navigation & Theme Toggle Wrapper */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-4 w-fit pointer-events-none">
        <div className="pointer-events-auto">
          <PillBase />
        </div>
        <div className="bg-background/80 backdrop-blur-md rounded-full border border-border p-1 shadow-lg pointer-events-auto">
          <ModeToggle />
        </div>
      </div>
      <main className="flex-grow">
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Pricing</p>
              <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground">
                One annual fee. No hidden charges. Everything your restaurant needs to go digital.
              </p>
            </div>
            <PricingCards />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
