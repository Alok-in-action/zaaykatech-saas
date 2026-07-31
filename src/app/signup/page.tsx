import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';

export default function SignupHubPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-md shadow-2xl text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-headline">Join ZaaykaTech</CardTitle>
          <CardDescription>Select your onboarding path to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-lg bg-orange-50/50 dark:bg-orange-950/20 text-left border-orange-200 dark:border-orange-900">
            <h3 className="font-semibold text-lg text-orange-600 dark:text-orange-400">For Agent Partners</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Onboard restaurants, upload digital menus, set up preview sites, and earn ₹500 commission per live restaurant.
            </p>
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/signup/agent">Register as an Agent Partner</Link>
            </Button>
          </div>

          <div className="p-4 border rounded-lg bg-muted/30 text-left">
            <h3 className="font-semibold text-md text-foreground">For Restaurant Owners</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Important: Restaurant owners do not register directly here. Your onboarding Agent will generate a custom preview of your digital menu and send you a personalized <strong>Claim Link</strong> via WhatsApp or Email. Please open your claim link to create your account and go live!
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-medium underline">
              Log in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
