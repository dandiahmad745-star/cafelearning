import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminPage() {
  return (
    <>
      <PageHeader
        title="Admin Panel"
        description="Restricted Access Area"
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24 max-w-md">
         <Card>
            <CardHeader>
                <CardTitle>Administrator Login</CardTitle>
                <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="admin-email">Admin Email</Label>
                        <Input id="admin-email" type="email" />
                    </div>
                     <div>
                        <Label htmlFor="admin-password">Password</Label>
                        <Input id="admin-password" type="password" />
                    </div>
                    <Button className="w-full">Authenticate</Button>
                     <p className="text-center text-sm text-muted-foreground">This is a mock login for demonstration purposes.</p>
                </form>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
