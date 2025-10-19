'use client';

import { useState } from 'react';
import { coffees as initialCoffees } from '@/lib/data';
import { guides as initialGuides } from '@/lib/data';
import { blogPosts as initialBlogPosts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Coffee } from '@/lib/types';


export default function AdminPage() {
  const [coffees, setCoffees] = useState(initialCoffees);
  const [guides, setGuides] = useState(initialGuides);
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = (coffee: Coffee) => {
    setSelectedCoffee(coffee);
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedCoffee) {
        setCoffees(coffees.map(c => c.id === selectedCoffee.id ? selectedCoffee : c));
        // Later we will save this to localStorage
    }
    setIsEditDialogOpen(false);
    setSelectedCoffee(null);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="coffees">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="coffees">Manage Coffees</TabsTrigger>
          <TabsTrigger value="guides">Manage Guides</TabsTrigger>
          <TabsTrigger value="blog">Manage Blog</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coffees">
          <div className="flex justify-end mb-4">
            <Button size="sm">Add New Coffee</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Coffees</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Roast</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coffees.map((coffee) => (
                    <TableRow key={coffee.id}>
                      <TableCell className="font-medium">{coffee.name}</TableCell>
                      <TableCell>{coffee.origin}</TableCell>
                      <TableCell>{coffee.roast}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEditClick(coffee)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Guides</CardTitle>
              <Button size="sm">Add New Guide</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Steps</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guides.map((guide) => (
                    <TableRow key={guide.id}>
                      <TableCell className="font-medium">{guide.title}</TableCell>
                      <TableCell>{guide.steps.length}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blog">
           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Blog Posts</CardTitle>
              <Button size="sm">Add New Post</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Coffee</DialogTitle>
          </DialogHeader>
          {selectedCoffee && (
             <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={selectedCoffee.name} onChange={(e) => setSelectedCoffee({...selectedCoffee, name: e.target.value})} className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="origin" className="text-right">Origin</Label>
                    <Input id="origin" value={selectedCoffee.origin} onChange={(e) => setSelectedCoffee({...selectedCoffee, origin: e.target.value})} className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="roast" className="text-right">Roast</Label>
                    <Input id="roast" value={selectedCoffee.roast} onChange={(e) => setSelectedCoffee({...selectedCoffee, roast: e.target.value as 'Light' | 'Medium' | 'Dark'})} className="col-span-3" />
                </div>
             </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
