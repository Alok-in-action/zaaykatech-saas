import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, Home, DollarSign, Mail } from 'lucide-react';
import Footer from '@/components/Footer';
import { NavBar } from '@/components/ui/tubelight-navbar';

const tiers = [
  {
    name: 'Starter',
    price: '$29',
    pricePeriod: '/ month',
    description: 'For new restaurants getting started with digital menus.',
    features: [
      'Unlimited QR Menus',
      'Mobile Ordering',
      'Basic Analytics',
      'Email Support',
    ],
    cta: 'Choose Starter',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$79',
    pricePeriod: '/ month',
    description: 'For growing businesses that need more power and customization.',
    features: [
      'Everything in Starter',
      'Advanced Analytics',
      'Custom Branding',
      'Priority Support',
      'AI Call Assistant (Add-on)',
    ],
    cta: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Business',
    price: 'Custom',
    pricePeriod: '',
    description: 'For large establishments or chains with specific needs.',
    features: [
      'Everything in Pro',
      'Multi-location Management',
      'Dedicated Account Manager',
      'API Access',
      'Offline Onboarding Support',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const navItems = [
    { name: 'Features', url: '/#features', icon: Sparkles },
    { name: 'How It Works', url: '/#how-it-works', icon: Home },
    { name: 'Pricing', url: '/pricing', icon: DollarSign },
    { name: 'Contact', url: '/#contact', icon: Mail },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <NavBar items={navItems} />
      <main className="flex-grow">
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">Find the Perfect Plan for Your Business</h1>
              <p className="text-lg md:text-xl text-muted-foreground mt-4">
                Simple, transparent pricing that scales with you. Choose a yearly plan and get 2 months free.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`flex flex-col h-full shadow-lg transition-transform hover:scale-105 ${
                    tier.popular ? 'border-primary border-2 relative' : ''
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold rounded-full">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <CardHeader className="pt-12">
                    <CardTitle className="font-headline text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.pricePeriod}</span>
                    </div>
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <Check className="size-5 text-green-500" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                      {tier.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12 text-sm text-muted-foreground">
                <p>Cash/UPI-based plan activations are available for all plans. Please <a href="#contact" className="underline text-primary">contact us</a> for more details.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
