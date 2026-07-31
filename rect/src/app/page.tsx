'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card as ShadCard, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  QrCode,
  Smartphone,
  UtensilsCrossed,
  BarChart,
  Bot,
  CreditCard,
  ChevronRight,
  Star,
  CheckCircle2,
  Home,
  DollarSign,
  Mail,
} from 'lucide-react';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import '@/components/ProfileCard.css';
import SpotlightCard from '@/components/SpotlightCard';
import '@/components/SpotlightCard.css';
import CardSwap, { Card } from '@/components/CardSwap';
import '@/components/CardSwap.css';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Sparkles } from 'lucide-react';

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1756312148347-611b60723c7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1757865579201-693dd2080c73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1756786605218-28f7dd95a493?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzh8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757519740947-eef07a74c4ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDh8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzB8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757207445614-d1e12b8f753e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODZ8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757269746970-dc477517268f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjN8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1755119902709-a53513bcbedc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDF8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1756312148347-611b60723c7a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1757865579201-693dd2080c73?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2MXx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1756786605218-28f7dd95a493?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzh8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757519740947-eef07a74c4ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNDh8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNzB8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757207445614-d1e12b8f753e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODZ8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1757269746970-dc477517268f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjN8fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1755119902709-a53513bcbedc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNDF8fHxlbnwwfHx8fHw%3D",
];


const features = [
  {
    icon: <QrCode className="size-8 text-primary" />,
    title: 'Dynamic QR Menus',
    description: 'Beautiful, interactive digital menus that can be updated in real-time.',
  },
  {
    icon: <Smartphone className="size-8 text-primary" />,
    title: 'Mobile Ordering',
    description: 'Customers scan, browse, and order directly from their phones, increasing efficiency.',
  },
  {
    icon: <UtensilsCrossed className="size-8 text-primary" />,
    title: 'Seamless Integrations',
    description: 'Works with your existing kitchen workflow for a smooth operational transition.',
  },
  {
    icon: <BarChart className="size-8 text-primary" />,
    title: 'Actionable Analytics',
    description: 'Gain insights into your sales, popular items, and customer behavior.',
  },
  {
    icon: <Bot className="size-8 text-primary" />,
    title: 'AI Call Assistant',
    description: 'An AI-powered voice bot to take phone orders, reducing missed opportunities.',
  },
  {
    icon: <CreditCard className="size-8 text-primary" />,
    title: 'Flexible Subscriptions',
    description: 'Affordable, tiered plans that grow with your business needs.',
  },
];

const howItWorks = [
    {
        step: 1,
        title: "Scan the QR Code",
        description: "Customers scan a unique QR code at their table or in their room.",
    },
    {
        step: 2,
        title: "Browse & Order",
        description: "They view your beautiful digital menu and place their order with a few taps.",
    },
    {
        step: 3,
        title: "Order Sent to Kitchen",
        description: "The order is instantly sent to your kitchen or room service for preparation.",
    },
    {
        step: 4,
        title: "Delight Your Customers",
        description: "Serve delicious food quickly, enhancing the customer experience.",
    }
]

const testimonials = [
  {
    name: 'Alok khamora',
    role: 'Owner, Curry & Co.',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'woman portrait',
    text: "ZaaykaTech has revolutionized our service. Orders are faster, more accurate, and our customers love the modern experience. It's a must-have for any restaurant.",
  },
  {
    name: 'Raj Verma',
    role: 'Manager, The Grand Hotel',
    avatar: 'https://placehold.co/100x100.png',
    dataAiHint: 'man portrait',
    text: 'The room service ordering system is brilliant. It has reduced call volumes and improved order accuracy. Our guests appreciate the convenience.',
  },
];

const usedByLogos = [
  { name: 'Logo 1', src: '/logos/1.jpg', dataAiHint: 'logo' },
  { name: 'Logo 2', src: '/logos/2.jpg', dataAiHint: 'logo' },
  { name: 'Logo 3', src: '/logos/3.jpg', dataAiHint: 'logo' },
  { name: 'Logo 4', src: '/logos/4.jpg', dataAiHint: 'logo' },
  { name: 'Logo 5', src: '/logos/5.jpg', dataAiHint: 'logo' },
  { name: 'Logo 6', src: '/logos/6.jpg', dataAiHint: 'logo' },
  { name: 'Logo 7', src: '/logos/7.jpg', dataAiHint: 'logo' },
  { name: 'Logo 8', src: '/logos/8.jpg', dataAiHint: 'logo' },
];

const navItems = [
    { name: 'Features', url: '#features', icon: Sparkles },
    { name: 'How It Works', url: '#how-it-works', icon: Home },
    { name: 'Pricing', url: '/pricing', icon: DollarSign },
    { name: 'Contact', url: '#contact', icon: Mail },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <NavBar items={navItems} />
      <main className="flex-grow">
        {/* Hero Section */}
        <AnimatedMarqueeHero
          tagline="THE FUTURE OF DINING IS HERE"
          title="THE FUTURE OF DINING IS HERE"
          description="Elevate your dining experience with smart, interactive QR menus and seamless mobile ordering. ZaaykaTech helps you serve more customers, faster."
          images={DEMO_IMAGES}
        />

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 h-full">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Simple Steps to a Smarter Service</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Our process is designed for simplicity and efficiency, both for you and your customers.
                    </p>
                </div>
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {howItWorks.map((item) => (
                        <SpotlightCard key={item.step} className="text-center p-6 rounded-xl transition-transform hover:scale-105 border bg-card">
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary font-bold text-xl font-headline">
                                    {item.step}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </SpotlightCard>
                  ))}
                </div>
            </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 h-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Packed with Powerful Features</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Everything you need to modernize your dining experience.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <SpotlightCard key={index} className="text-center p-6 rounded-xl transition-transform hover:scale-105 border bg-card">
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold font-headline mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section id="bento" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">A Magical Experience</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Interactive cards with delightful animations.</p>
            </div>
            <div className="h-[auto] md:h-[600px] relative">
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
              >
                <Card customClass="p-6 flex flex-col justify-between !bg-secondary/30 text-white">
                    <div>
                        <div className="card__label bg-white/10 rounded-full px-4 py-2 text-sm w-fit font-bold">Scan & Explore Instantly</div>
                        <h3 className="text-2xl mt-4 font-semibold">No App. No Wait.</h3>
                    </div>
                    <p className="text-white/70">Just scan the QR code on your table or hotel room and dive into a beautifully designed, easy-to-read digital menu — available in your local language. It’s fast, modern, and effortless.</p>
                </Card>
                <Card customClass="p-6 flex flex-col justify-between !bg-secondary/30 text-white">
                    <div>
                        <div className="card__label bg-white/10 rounded-full px-4 py-2 text-sm w-fit font-bold">Order Like a VIP</div>
                        <h3 className="text-2xl mt-4 font-semibold">No calling. No shouting.</h3>
                    </div>
                     <p className="text-white/70">Choose your dishes, customize them if needed, and place the order with a tap. Your order goes straight to the kitchen or hotel staff — just like 5-star room service.</p>
                </Card>
                <Card customClass="p-6 flex flex-col justify-between !bg-secondary/30 text-white">
                     <div>
                        <div className="card__label bg-white/10 rounded-full px-4 py-2 text-sm w-fit font-bold">Track & Relax</div>
                        <h3 className="text-2xl mt-4 font-semibold">Know what’s cooking.</h3>
                    </div>
                   <p className="text-white/70">No more “Bhaiya, mera order aya kya?” moments. Get a live order status so you can relax while your food is being freshly prepared.</p>
                </Card>
                 <Card customClass="p-6 flex flex-col justify-between !bg-secondary/30 text-white">
                     <div>
                        <div className="card__label bg-white/10 rounded-full px-4 py-2 text-sm w-fit font-bold">Personalized & Language-Friendly</div>
                        <h3 className="text-2xl mt-4 font-semibold">Built for Bharat.</h3>
                    </div>
                   <p className="text-white/70">Menus are offered in Hindi and your regional language, making everyone — from kids to elders — feel included and empowered to order on their own.</p>
                </Card>
              </CardSwap>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section id="team" className="py-16 md:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet the Team</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">The brilliant minds behind ZaaykaTech.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <ProfileCard
                      name="Alok khamora"
                      title="Founder & CEO"
                      handle="alokkhamora"
                      status="Online"
                      contactText="Contact"
                      avatarUrl="https://placehold.co/200x200.png"
                      data-ai-hint="woman portrait"
                      showUserInfo={true}
                      enableTilt={true}
                    />
                </div>
            </div>
        </section>


        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Loved by Restaurants and Hotels</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <ShadCard key={index} className="bg-secondary/30 border-l-4 border-primary">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <Avatar className="size-16 border-2 border-primary/50 shrink-0">
                        <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.dataAiHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-foreground/90 mb-4 italic">"{testimonial.text}"</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-bold font-headline text-lg">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                            <div className="flex text-primary">
                                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="size-5" />)}
                            </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </ShadCard>
              ))}
            </div>
          </div>
        </section>

        {/* As Used In Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-xl text-muted-foreground font-semibold mb-8">
              Trusted by leading Cafe & Restaurants
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {usedByLogos.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.src}
                  alt={logo.name}
                  width={150}
                  height={50}
                  className="opacity-60 hover:opacity-100 transition-opacity max-w-full h-auto"
                  data-ai-hint={logo.dataAiHint}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Live Demo Section */}
        <section id="demo" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <ShadCard className="bg-secondary/30 overflow-hidden shadow-lg">
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Experience It Yourself</h2>
                            <p className="text-muted-foreground mb-6">Scan the QR code with your phone to see a live demo of our interactive menu. See how easy and elegant mobile ordering can be.</p>
                             <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="size-5 text-green-500" />
                                    <span>Interactive & visually rich menu.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="size-5 text-green-500" />
                                    <span>Simple and intuitive ordering process.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="size-5 text-green-500" />
                                    <span>Fully responsive on all devices.</span>
                                </li>
                            </ul>
                            <Button size="lg">
                                Book a Personalized Demo <ChevronRight className="ml-2 size-5" />
                            </Button>
                        </div>
                        <div className="bg-primary/10 flex items-center justify-center p-8 h-full">
                           <div className="bg-white p-6 rounded-lg shadow-2xl">
                             <Image src="https://placehold.co/256x256.png" alt="Demo QR Code" width={256} height={256} data-ai-hint="qr code" className="max-w-full h-auto" />
                           </div>
                        </div>
                    </div>
                </ShadCard>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Grow Your Business?</h2>
              <p className="text-lg text-muted-foreground mt-2">Get in touch with our team to get started.</p>
            </div>
            <ShadCard className="max-w-2xl mx-auto shadow-xl bg-background/50">
              <CardContent className="p-6 sm:p-8">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Input placeholder="Your Name" aria-label="Your Name" />
                    <Input type="email" placeholder="Email Address" aria-label="Email Address" />
                  </div>
                  <Input placeholder="Restaurant/Hotel Name" aria-label="Restaurant or Hotel Name" />
                  <Textarea placeholder="Your Message" aria-label="Your Message" rows={5} />
                  <Button type="submit" className="w-full" size="lg">Send Message</Button>
                </form>
              </CardContent>
            </ShadCard>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
