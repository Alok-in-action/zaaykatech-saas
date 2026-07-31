'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import DashboardNav from '@/components/DashboardNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Utensils, Share2, Palette, Save, Check, ExternalLink, MessageCircle, Copy } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  instagram: string;
  city: string;
  hours: string;
  status: 'draft' | 'preview' | 'live';
  slug: string;
  theme_choice: string;
  primary_color: string;
  font_style: string;
}

const COLORS = [
  { name: 'Orange Spice', hex: '#f97316' },
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Emerald Green', hex: '#10b981' },
  { name: 'Purple Berry', hex: '#8b5cf6' },
  { name: 'Rose Pink', hex: '#ec4899' },
  { name: 'Midnight Charcoal', hex: '#334155' },
];

const THEMES = ['Modern', 'Classic', 'Minimalist', 'Vibrant', 'Cafe950'];

export default function RestaurantSetupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [rest, setRest] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Invite state
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [claimToken, setClaimToken] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data } = await supabase.from('restaurants').select('*').eq('id', id).single();
      if (data) {
        setRest(data as Restaurant);
      }

      // Check for existing claim token
      const { data: claims } = await supabase.from('restaurant_claims').select('token, owner_phone, owner_email').eq('restaurant_id', id).order('created_at', { ascending: false }).limit(1);
      if (claims && claims.length > 0) {
        setClaimToken(claims[0].token);
        setOwnerPhone(claims[0].owner_phone || '');
        setOwnerEmail(claims[0].owner_email || '');
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rest) return;
    setSaving(true);

    const supabase = createClient();
    await supabase
      .from('restaurants')
      .update({
        name: rest.name,
        address: rest.address,
        phone: rest.phone,
        instagram: rest.instagram,
        city: rest.city,
        hours: rest.hours,
        theme_choice: rest.theme_choice,
        primary_color: rest.primary_color,
        font_style: rest.font_style,
        status: rest.status === 'draft' ? 'preview' : rest.status,
      })
      .eq('id', id);

    setRest((prev) => prev ? { ...prev, status: prev.status === 'draft' ? 'preview' : prev.status } : null);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleGenerateInvite = async () => {
    setGenerating(true);
    const supabase = createClient();

    // Generate clean unique claim token
    const randomHex = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);
    const token = `zk-${randomHex}`;

    await supabase.from('restaurant_claims').insert({
      restaurant_id: id,
      token,
      owner_phone: ownerPhone,
      owner_email: ownerEmail,
    });

    setClaimToken(token);
    setGenerating(false);
  };

  if (loading || !rest) {
    return <div className="p-12 text-center text-muted-foreground">Loading restaurant setup...</div>;
  }

  const claimUrl = typeof window !== 'undefined' && claimToken ? `${window.location.origin}/owner/claim/${claimToken}` : '';

  const sendWhatsApp = () => {
    const cleanNumber = ownerPhone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello! Your digital menu preview for *${rest.name}* is ready.\n\nClick here to inspect your site, claim your owner dashboard, and activate your ₹2,499/year subscription:\n${claimUrl}`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(claimUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <DashboardNav title={`Setup Studio: ${rest.name}`} role="agent" />
      <main className="container max-w-5xl mx-auto px-4 pt-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs uppercase px-2 py-0.5 bg-orange-100 text-orange-800 rounded font-semibold mb-2 inline-block">
              Status: {rest.status.toUpperCase()}
            </span>
            <h2 className="text-3xl font-bold font-headline">Restaurant & Theme Configuration</h2>
            <p className="text-muted-foreground text-sm">Customize digital menu aesthetics and dispatch owner claim invite links.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="gap-2">
              <Link href={`/agent/restaurants/${id}/menu`}>
                <Utensils className="h-4 w-4" /> Open Menu Studio
              </Link>
            </Button>
            {rest.slug && (
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Link href={`/preview/${rest.slug}`} target="_blank">
                  Preview Site <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form (2 cols) */}
          <form onSubmit={handleSaveDetails} className="lg:col-span-2 space-y-6">
            <Card className="shadow-md border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" /> Branding & Visual Styling
                </CardTitle>
                <CardDescription>Select the theme layout and primary accent color for the public customer menu.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Layout Theme</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {THEMES.map((theme) => (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => setRest({ ...rest, theme_choice: theme.toLowerCase() })}
                        className={`p-3 rounded-lg border text-sm font-medium text-center transition-all ${rest.theme_choice?.toLowerCase() === theme.toLowerCase() ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm' : 'border-input hover:bg-muted/30'}`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold mb-2 block">Primary Accent Color</Label>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setRest({ ...rest, primary_color: col.hex })}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-transform ${rest.primary_color === col.hex ? 'ring-2 ring-primary scale-105 border-transparent font-bold' : 'hover:scale-102 border-input'}`}
                      >
                        <span className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: col.hex }} />
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border">
              <CardHeader>
                <CardTitle className="text-lg">Restaurant Profile & Contact</CardTitle>
                <CardDescription>These details display directly on the header of the live customer menu.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input value={rest.name} onChange={(e) => setRest({ ...rest, name: e.target.value })} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input value={rest.phone || ''} onChange={(e) => setRest({ ...rest, phone: e.target.value })} placeholder="For customer reservations" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hours">Operating Hours</Label>
                    <Input value={rest.hours || ''} onChange={(e) => setRest({ ...rest, hours: e.target.value })} placeholder="10:00 AM - 11:00 PM" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Username</Label>
                  <Input value={rest.instagram || ''} onChange={(e) => setRest({ ...rest, instagram: e.target.value })} placeholder="e.g. @punjabirasoi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Physical Address & City</Label>
                  <Input value={rest.address || ''} onChange={(e) => setRest({ ...rest, address: e.target.value })} placeholder="Full address" />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-5 h-auto text-md shadow">
                    {saving ? 'Saving...' : saved ? <><Check className="h-5 w-5 mr-2" /> Saved & Preview Ready!</> : <><Save className="h-5 w-5 mr-2" /> Save & Generate Preview</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Owner Invite Card (1 col) */}
          <div className="space-y-6">
            <Card className="shadow-lg border-2 border-orange-500/30 bg-orange-50/10">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Share2 className="h-5 w-5" /> Owner Claim Invite
                </CardTitle>
                <CardDescription>
                  Send this secure link to the restaurant owner so they can inspect their preview, sign up, and activate their ₹2,499 annual plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Owner WhatsApp Number</Label>
                  <Input placeholder="919876543210" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} />
                  <p className="text-xs text-muted-foreground">Include country code without + for best WhatsApp routing.</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Owner Email Address (Optional)</Label>
                  <Input type="email" placeholder="owner@restaurant.com" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} />
                </div>

                {!claimToken ? (
                  <Button onClick={handleGenerateInvite} disabled={generating || !ownerPhone} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold">
                    {generating ? 'Generating Token...' : 'Generate Claim Invite Token'}
                  </Button>
                ) : (
                  <div className="space-y-4 pt-2 border-t border-dashed">
                    <div className="p-3 bg-muted rounded-lg border text-xs break-all font-mono select-all">
                      {claimUrl}
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={copyToClipboard} variant="outline" className="flex-1 gap-1.5 text-xs font-semibold">
                        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied Link!' : 'Copy Link'}
                      </Button>
                      <Button onClick={sendWhatsApp} className="flex-1 gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold">
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
