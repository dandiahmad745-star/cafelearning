'use client';

import { useState, useEffect } from 'react';
import {
  coffees as initialCoffees,
  guides as initialGuides,
  blogPosts as initialBlogPosts,
} from '@/lib/data';
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
import { Textarea } from '@/components/ui/textarea';
import type { Coffee, Guide, BlogPost } from '@/lib/types';
import { Trash2, PlusCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


// Generic hook for using localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}


export default function OwnerPage() {
  const [coffees, setCoffees] = useLocalStorage<Coffee[]>('coffees', initialCoffees);
  const [guides, setGuides] = useLocalStorage<Guide[]>('guides', initialGuides);
  const [blogPosts, setBlogPosts] = useLocalStorage<BlogPost[]>('blogPosts', initialBlogPosts);

  const [activeTab, setActiveTab] = useState('coffees');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Coffee | Guide | BlogPost | null>(null);
  const [isNew, setIsNew] = useState(false);

  const handleAddNew = () => {
    setIsNew(true);
    if (activeTab === 'coffees') {
        setEditingItem({ id: `new-coffee-${Date.now()}`, name: '', origin: '', roast: 'Medium', flavorProfile: [], description: '', longDescription: '', imageId: '', expertNotes: [] });
    } else if (activeTab === 'guides') {
        setEditingItem({ id: `new-guide-${Date.now()}`, title: '', description: '', imageId: '', steps: [] });
    } else if (activeTab === 'blog') {
        setEditingItem({ id: `new-blog-${Date.now()}`, title: '', author: '', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', imageId: '' });
    }
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Coffee | Guide | BlogPost) => {
    setIsNew(false);
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (activeTab === 'coffees') {
        setCoffees(coffees.filter(c => c.id !== id));
    } else if (activeTab === 'guides') {
        setGuides(guides.filter(g => g.id !== id));
    } else if (activeTab === 'blog') {
        setBlogPosts(blogPosts.filter(b => b.id !== id));
    }
  };


  const handleSaveChanges = () => {
    if (!editingItem) return;

    if (activeTab === 'coffees') {
        const coffee = editingItem as Coffee;
        if (isNew) {
            setCoffees([...coffees, coffee]);
        } else {
            setCoffees(coffees.map(c => c.id === coffee.id ? coffee : c));
        }
    } else if (activeTab === 'guides') {
        const guide = editingItem as Guide;
        // Simple steps parsing for now, assuming "Title;Instruction" format per line
        if (typeof (guide as any).stepsRaw === 'string') {
            guide.steps = ((guide as any).stepsRaw as string).split('\n').map(line => {
                const [title, instruction] = line.split(';');
                return { title: title || '', instruction: instruction || '' };
            }).filter(s => s.title && s.instruction);
        }

        if (isNew) {
            setGuides([...guides, guide]);
        } else {
            setGuides(guides.map(g => g.id === guide.id ? guide : g));
        }
    } else if (activeTab === 'blog') {
        const blog = editingItem as BlogPost;
        if (isNew) {
            setBlogPosts([...blogPosts, blog]);
        } else {
            setBlogPosts(blogPosts.map(b => b.id === blog.id ? blog : b));
        }
    }

    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingItem) {
        const { id, value } = e.target;
        setEditingItem({ ...editingItem, [id]: value });
    }
  };
  
  const handleSelectChange = (id: string, value: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [id]: value });
    }
  };


  const renderCoffeeForm = (item: Coffee) => (
    <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={item.name} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="origin" className="text-right">Origin</Label>
            <Input id="origin" value={item.origin} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="roast" className="text-right">Roast</Label>
            <select id="roast" value={item.roast} onChange={(e) => handleSelectChange('roast', e.target.value)} className="col-span-3 border p-2 rounded-md bg-background">
                <option value="Light">Light</option>
                <option value="Medium">Medium</option>
                <option value="Dark">Dark</option>
            </select>
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="flavorProfile" className="text-right">Flavor Profile</Label>
            <Input id="flavorProfile" value={Array.isArray(item.flavorProfile) ? item.flavorProfile.join(', ') : ''} onChange={(e) => handleInputChange({ target: { id: 'flavorProfile', value: e.target.value.split(',').map(s => s.trim()) } } as any)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={item.description} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="longDescription" className="text-right">Long Desc.</Label>
            <Textarea id="longDescription" value={item.longDescription} onChange={handleInputChange} className="col-span-3" rows={5} />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageId" className="text-right">Image ID</Label>
            <Input id="imageId" value={item.imageId} onChange={handleInputChange} className="col-span-3" />
        </div>
    </div>
  );

  const renderGuideForm = (item: Guide) => {
    const stepsRaw = Array.isArray(item.steps) ? item.steps.map(s => `${s.title};${s.instruction}`).join('\n') : '';
    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" value={item.title} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" value={item.description} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageId" className="text-right">Image ID</Label>
                <Input id="imageId" value={item.imageId} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="stepsRaw" className="text-right pt-2">Steps</Label>
                <Textarea id="stepsRaw" defaultValue={stepsRaw} onChange={handleInputChange} className="col-span-3" rows={6} placeholder="Format: Step Title;Instruction (one per line)"/>
                <div/>
                <p className="col-span-3 text-xs text-muted-foreground">Separate title and instruction with a semicolon (;). Each new line is a new step.</p>
            </div>
        </div>
    );
  };
  
   const renderBlogForm = (item: BlogPost) => (
    <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={item.title} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">Author</Label>
            <Input id="author" value={item.author} onChange={handleInputChange} className="col-span-3" />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Input id="date" type="date" value={item.date} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="excerpt" className="text-right">Excerpt</Label>
            <Textarea id="excerpt" value={item.excerpt} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">Content</Label>
            <Textarea id="content" value={item.content} onChange={handleInputChange} className="col-span-3" rows={5}/>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageId" className="text-right">Image ID</Label>
            <Input id="imageId" value={item.imageId} onChange={handleInputChange} className="col-span-3" />
        </div>
    </div>
  );
  

  const renderForm = () => {
    if (!editingItem) return null;
    switch (activeTab) {
        case 'coffees': return renderCoffeeForm(editingItem as Coffee);
        case 'guides': return renderGuideForm(editingItem as Guide);
        case 'blog': return renderBlogForm(editingItem as BlogPost);
        default: return null;
    }
  }
  
  const getDialogTitle = () => {
    const action = isNew ? 'Add' : 'Edit';
    switch (activeTab) {
        case 'coffees': return `${action} Coffee`;
        case 'guides': return `${action} Guide`;
        case 'blog': return `${action} Blog Post`;
        default: return 'Edit Item';
    }
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Owner Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="coffees">Manage Coffees</TabsTrigger>
          <TabsTrigger value="guides">Manage Guides</TabsTrigger>
          <TabsTrigger value="blog">Manage Blog</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coffees">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Coffees</CardTitle>
               <Button size="sm" onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
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
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(coffee)}>
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4"/></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this coffee.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(coffee.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
               <Button size="sm" onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
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
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(guide)}>
                          Edit
                        </Button>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4"/></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this guide.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(guide.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
               <Button size="sm" onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
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
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(post)}>
                          Edit
                        </Button>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4"/></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this post.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(post.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
          </DialogHeader>
          {renderForm()}
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
