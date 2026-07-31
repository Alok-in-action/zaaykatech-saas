'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import { Sparkles, Utensils, CheckCircle, ArrowRight } from 'lucide-react';

export default function OwnerClaimPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [claimRecord, setClaimRecord] = useState<any>(null);
  const [menuCount, setMenuCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadClaim() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUser(user);

      const { data: claim, error: claimError } = await supabase
        .from('restaurant_claims')
        .select('*')
        .eq('token', token)
        .single();

      if (claimError || !claim) {
        setError('Invalid or expired claim link. Please verify the link with your onboarding agent.');
        setLoading(false);
        return;
      }

      if (claim.used_at) {
        setError('This claim invite has already been used to register an account.');
        setLoading(false);
        return;
      }

      setClaimRecord(claim);
      if (claim.owner_email) setEmail(claim.owner_email);
      if (claim.owner_phone) setPhone(claim.owner_phone);

      const { data: rest } = await supabase.from('restaurants').select('*').eq('id', claim.restaurant_id).single();
      if (rest) {
        setRestaurant(rest);
        const { data: menu } = await supabase.from('menus').select('items').eq('restaurant_id', rest.id).single();
        const items = Array.isArray(menu?.items) ? menu.items : [];
        setMenuCount(items.length);
      }
      setLoading(false);
    }
    loadClaim();
  }, [token]);

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant || !claimRecord) return;
    setClaiming(true);
    setError(null);

    const supabase = createClient();
    let ownerUserId = currentUser?.id;

    if (!ownerUserId) {
      // Register new owner account
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authErr || !authData.user) {
        setError(authErr?.message || 'Account creation failed');
        setClaiming(false);
        return;
      }
      ownerUserId = authData.user.id;

      // Create profile
      await supabase.from('profiles').insert({
        id: ownerUserId,
        email,
        name,
        phone,
        role: 'owner',
      });
    }

    // Link restaurant to owner
    await supabase
      .from('restaurants')
      .update({ owner_user_id: ownerUserId })
      .eq('id', restaurant.id);

    // Mark token as used
    await supabase
      .from('restaurant_claims')
      .update({ used_at: new Date().toISOString() })
      .eq('id', claimRecord.id);

    router.push('/owner/dashboard');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading your digital menu invite...</div>;
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <Card className="max-w-md p-6 border-red-200 bg-red-50/20">
          <h3 className="text-xl font-bold text-red-600 mb-2">Claim Error</h3>
          <p className="text-muted-foreground text-sm mb-6">{error || 'Restaurant not found'}</p>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2"><Logo /></div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-headline">Claim & Activate Your Restaurant</h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Your onboarding agent has fully digitized your menu and built a custom responsive website for <strong>{restaurant.name}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Preview Overview Card */}
          <Card className="shadow-lg border-orange-500/30 bg-orange-50/5">
            <CardHeader>
              <span className="text-xs uppercase px-2 py-0.5 bg-orange-100 text-orange-800 rounded font-semibold w-fit mb-1">
                Site Preview Ready
              </span>
              <CardTitle className="text-2xl font-headline text-foreground">{restaurant.name}</CardTitle>
              <CardDescription>{restaurant.address || 'Address not provided'}, {restaurant.city}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/30 rounded-xl space-y-3">
                <div className="flex items-center gap-3">
                  <Utensils className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold">Digitized Menu</div>
                    <div className="text-xs text-muted-foreground">{menuCount} dishes categorized and formatted with prices</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <div>
                    <div className="text-sm font-semibold">Custom Theme & Branding</div>
                    <div className="text-xs text-muted-foreground capitalize">Theme: {restaurant.theme_choice || 'Modern'}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-xl bg-background text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" /> What happens next?
                </p>
                <p>1. Set up your Owner account credentials on the right.</p>
                <p>2. Access your Owner Portal to verify details and test QR codes.</p>
                <p>3. Complete your ₹2,499 annual payment to launch your menu live!</p>
              </div>

              {restaurant.slug && (
                <Button asChild variant="outline" className="w-full font-medium">
                  <Link href={`/preview/${restaurant.slug}`} target="_blank">
                    Inspect Full Site Preview in New Tab →
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="shadow-xl border">
            <CardHeader>
              <CardTitle className="text-xl font-headline">
                {currentUser ? 'Connect to Your Account' : 'Create Owner Account'}
              </CardTitle>
              <CardDescription>
                {currentUser
                  ? `You are logged in as ${currentUser.email}. Click below to instantly connect this restaurant!`
                  : 'Register to claim full management rights over this digital menu.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitClaim} className="space-y-4">
                {error && (
                  <div className="p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                    {error}
                  </div>
                )}

                {!currentUser && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Owner Full Name *</Label>
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
                      <Label htmlFor="password">Create Password *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}

                <Button type="submit" disabled={claiming} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 h-auto text-md shadow-md mt-2">
                  {claiming ? 'Claiming Restaurant...' : currentUser ? 'Claim & Open Dashboard →' : 'Register & Open Dashboard →'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
