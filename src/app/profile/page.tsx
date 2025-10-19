import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Your Profile"
        description="Manage your details, view favorite coffees, and get personalized recommendations."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24 max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle>Login to Your Account</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                     <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button className="w-full">Sign In</Button>
                    <p className="text-center text-sm text-muted-foreground">This is a mock login for demonstration purposes.</p>
                </form>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
