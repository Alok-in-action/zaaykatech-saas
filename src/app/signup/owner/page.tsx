'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';

export default function OwnerSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      setError(authError?.message || 'Failed to sign up');
      setLoading(false);
      return;
    }

    const userId = authData.user.id;

    // Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      email,
      name,
      phone,
      role: 'owner',
    });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    router.push('/owner/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 py-8">
      <Card className="mx-auto w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Restaurant Owner Portal</CardTitle>
          <CardDescription>
            Note: Usually owners register through an invite claim link from an onboarding Agent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Owner Name *</Label>
              <Input
                id="name"
                placeholder="Rajesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="rajesh@restaurant.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+91 9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Owner Account...' : 'Sign Up as Owner'}
            </Button>
            <div className="text-center text-sm text-muted-foreground mt-2">
              Already registered?{' '}
              <Link href="/login" className="text-primary underline font-medium">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
