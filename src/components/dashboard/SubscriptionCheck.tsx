import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface SubscriptionCheckProps {
  children: React.ReactNode;
  requiredPlan: 'Pro' | 'Business';
  currentPlan: 'Starter' | 'Pro' | 'Business';
  featureName: string;
}

const planHierarchy = {
  Starter: 1,
  Pro: 2,
  Business: 3,
};

export function SubscriptionCheck({ children, requiredPlan, currentPlan, featureName }: SubscriptionCheckProps) {
  const hasAccess = planHierarchy[currentPlan] >= planHierarchy[requiredPlan];

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
                <Lock className="h-8 w-8 text-primary" />
            </div>
        </div>
        <CardTitle className="text-center text-2xl font-headline">Upgrade to Access {featureName}</CardTitle>
        <CardDescription className="text-center">
          This feature is available on the {requiredPlan} plan and above.
          <br/>
          Your current plan is {currentPlan}. Please upgrade to unlock more powerful features.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button asChild>
          <Link href="/dashboard/subscription">Upgrade Your Plan</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
