'use client';

import { useState, useRef } from 'react';
import initialData from '@/lib/data.json';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import type { Coffee, Guide, BlogPost, BaristaTool } from '@/lib/types';
import { Trash2, PlusCircle, RotateCcw, Upload, Download, ChevronDown } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [coffees, setCoffees] = useLocalStorage<Coffee[]>('coffees', initialData.coffees);
  const [guides, setGuides] = useLocalStorage<Guide[]>('guides', initialData.guides);
  const [blogPosts, setBlogPosts] = useLocalStorage<BlogPost[]>('blogPosts', initialData.blogPosts);
  const [tools, setTools] = useLocalStorage<BaristaTool[]>('baristaTools', initialData.baristaTools);
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('coffees');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Coffee | Guide | BlogPost | BaristaTool | null>(null);
  const [isNew, setIsNew] = useState(false);
  const importItemRef = useRef<HTMLInputElement>(null);


  const handleAddNewFromTemplate = () => {
    setIsNew(true);
    const timestamp = Date.now();
    let templateItem;

    if (activeTab === 'coffees') {
        templateItem = initialData.coffees[0] || {} as Coffee;
        setEditingItem({ 
            ...templateItem, 
            id: `new-coffee-${timestamp}`, 
            name: `${templateItem.name} (Copy)`
        });
    } else if (activeTab === 'guides') {
        templateItem = initialData.guides[0] || {} as Guide;
        setEditingItem({ 
            ...templateItem, 
            id: `new-guide-${timestamp}`, 
            title: `${templateItem.title} (Copy)` 
        });
    } else if (activeTab === 'blog') {
        templateItem = initialData.blogPosts[0] || {} as BlogPost;
        setEditingItem({ 
            ...templateItem, 
            id: `new-blog-${timestamp}`, 
            title: `${templateItem.title} (Copy)`,
            date: new Date().toISOString().split('T')[0]
        });
    } else if (activeTab === 'tools') {
        templateItem = initialData.baristaTools[0] || {} as BaristaTool;
        setEditingItem({
            ...templateItem,
            name: `${templateItem.name} (Copy)`
        });
    }
    setIsDialogOpen(true);
  };
  
  const handleImportItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("File is not readable");
        }
        const importedItem = JSON.parse(text);
        const timestamp = Date.now();

        let newItem: Coffee | Guide | BlogPost | BaristaTool;
        if (activeTab === 'coffees') {
            newItem = { ...importedItem, id: `imported-coffee-${timestamp}` } as Coffee;
        } else if (activeTab === 'guides') {
            newItem = { ...importedItem, id: `imported-guide-${timestamp}` } as Guide;
        } else if (activeTab === 'blog') {
            newItem = { ...importedItem, id: `imported-blog-${timestamp}`, date: new Date().toISOString().split('T')[0] } as BlogPost;
        } else {
             newItem = { ...importedItem, name: `${importedItem.name} (Imported)` } as BaristaTool;
        }
        
        setIsNew(true);
        setEditingItem(newItem);
        setIsDialogOpen(true);
        toast({ title: "Import Successful", description: "Item data loaded into the form." });

      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: error.message || "Could not parse the item JSON file.",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };


  const handleEdit = (item: Coffee | Guide | BlogPost | BaristaTool) => {
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
    } else if (activeTab === 'tools') {
        setTools(tools.filter(t => t.name !== id));
    }
    toast({ title: "Item Deleted", description: "The item has been removed successfully." });
  };


  const handleSaveChanges = () => {
    if (!editingItem) return;

    if (activeTab === 'coffees') {
        const coffee = editingItem as Coffee;
        if (isNew) {
            setCoffees([coffee, ...coffees]);
        } else {
            setCoffees(coffees.map(c => c.id === coffee.id ? coffee : c));
        }
    } else if (activeTab === 'guides') {
        const guide = editingItem as Guide;
        if (typeof (guide as any).stepsRaw === 'string') {
            guide.steps = ((guide as any).stepsRaw as string).split('\n').map(line => {
                const [title, instruction] = line.split(';');
                return { title: title || '', instruction: instruction || '' };
            }).filter(s => s.title && s.instruction);
        }

        if (isNew) {
            setGuides([guide, ...guides]);
        } else {
            setGuides(guides.map(g => g.id === guide.id ? guide : g));
        }
    } else if (activeTab === 'blog') {
        const blog = editingItem as BlogPost;
        if (isNew) {
            setBlogPosts([blog, ...blogPosts]);
        } else {
            setBlogPosts(blogPosts.map(b => b.id === blog.id ? blog : b));
        }
    } else if (activeTab === 'tools') {
        const tool = editingItem as BaristaTool;
        if (isNew) {
            // Since tools don't have a unique ID, we prevent adding duplicates by name
            if(tools.some(t => t.name === tool.name)) {
                toast({ variant: 'destructive', title: 'Error', description: `A tool with the name "${tool.name}" already exists.`});
                return;
            }
            setTools([tool, ...tools]);
        } else {
            // When editing, the original name is needed if it's being changed
            const originalName = (editingItem as any)._originalName || tool.name;
            setTools(tools.map(t => t.name === originalName ? tool : t));
        }
    }

    setIsDialogOpen(false);
    setEditingItem(null);
    toast({ title: "Changes Saved", description: "Your changes have been saved successfully." });
  };
  
  const handleResetToTemplate = () => {
    setCoffees(initialData.coffees);
    setGuides(initialData.guides);
    setBlogPosts(initialData.blogPosts);
    setTools(initialData.baristaTools);
    toast({
      title: "Data Reset to Template",
      description: "All content has been restored from the default template.",
    });
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

  const handleExport = () => {
    const dataToExport = {
      coffees,
      guides,
      blogPosts,
      baristaTools: tools
    };
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Data Exported", description: "data.json has been downloaded." });
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("File is not readable");
        }
        const importedData = JSON.parse(text);
        
        const requiredKeys = ['coffees', 'guides', 'blogPosts', 'baristaTools'];
        const missingKeys = requiredKeys.filter(key => !(key in importedData));

        if (missingKeys.length === 0) {
          setCoffees(importedData.coffees);
          setGuides(importedData.guides);
          setBlogPosts(importedData.blogPosts);
          setTools(importedData.baristaTools);
          toast({ title: "Import Successful", description: "All content has been updated." });
        } else {
          throw new Error(`Invalid JSON format. Missing required keys: ${missingKeys.join(', ')}.`);
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Import Failed",
          description: error.message || "Could not parse the JSON file.",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = '';
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
  
    const renderToolForm = (item: BaristaTool) => (
    <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" value={item.name} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" value={item.description} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageId" className="text-right">Image ID</Label>
            <Input id="imageId" value={item.imageId} onChange={handleInputChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
            <Input id="imageHint" value={item.imageHint} onChange={handleInputChange} className="col-span-3" />
        </div>
    </div>
  );

  const renderForm = () => {
    if (!editingItem) return null;
    switch (activeTab) {
        case 'coffees': return renderCoffeeForm(editingItem as Coffee);
        case 'guides': return renderGuideForm(editingItem as Guide);
        case 'blog': return renderBlogForm(editingItem as BlogPost);
        case 'tools': return renderToolForm(editingItem as BaristaTool);
        default: return null;
    }
  }
  
  const getDialogTitle = () => {
    const action = isNew ? 'Add' : 'Edit';
    switch (activeTab) {
        case 'coffees': return `${action} Coffee`;
        case 'guides': return `${action} Guide`;
        case 'blog': return `${action} Blog Post`;
        case 'tools': return `${action} Barista Tool`;
        default: return 'Edit Item';
    }
  }

  const FormatExample = ({ title, data }: { title: string, data: any }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        </CardContent>
    </Card>
  )


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}><Download className="mr-2 h-4 w-4" /> Export All Data</Button>
             <Button asChild variant="outline" size="sm">
                <label htmlFor="import-file" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" /> Import All Data
                    <input id="import-file" type="file" accept=".json" className="hidden" onChange={handleImport} />
                </label>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm"><RotateCcw className="mr-2 h-4 w-4" /> Reset</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset all content to template?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will discard all your current changes and restore the content from the original template file. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetToTemplate}>Reset Content</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>


      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="coffees">Manage Coffees</TabsTrigger>
          <TabsTrigger value="guides">Manage Guides</TabsTrigger>
          <TabsTrigger value="blog">Manage Blog</TabsTrigger>
          <TabsTrigger value="tools">Manage Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="coffees">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Coffees</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add New <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleAddNewFromTemplate}>Add from Template</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => importItemRef.current?.click()}>Import from JSON</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
               <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add New <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleAddNewFromTemplate}>Add from Template</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => importItemRef.current?.click()}>Import from JSON</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add New <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleAddNewFromTemplate}>Add from Template</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => importItemRef.current?.click()}>Import from JSON</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
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

        <TabsContent value="tools">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Barista Tools</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add New <ChevronDown className="ml-2 h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleAddNewFromTemplate}>Add from Template</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => importItemRef.current?.click()}>Import from JSON</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tools.map((tool) => (
                    <TableRow key={tool.name}>
                      <TableCell className="font-medium">{tool.name}</TableCell>
                      <TableCell>{tool.description}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(tool)}>
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
                                This action cannot be undone. This will permanently delete this tool.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(tool.name)}>Delete</AlertDialogAction>
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
      
      <input 
        type="file" 
        accept=".json" 
        className="hidden" 
        ref={importItemRef} 
        onChange={handleImportItem} 
      />

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
      
      <Separator className="my-12" />

      <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-bold mb-4">Data Format Guide</h2>
            <p className="text-muted-foreground mb-6">Use the formats below when creating your single-item <code>.json</code> file for import. The main file must be an object matching the corresponding format. For bulk import/export of all data, use the buttons at the top of the page.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            <FormatExample title="Single Coffee Format" data={initialData.coffees[0]} />
            <FormatExample title="Single Guide Format" data={initialData.guides[0]} />
            <FormatExample title="Single Blog Post Format" data={initialData.blogPosts[0]} />
            <FormatExample title="Single Tool Format" data={initialData.baristaTools[0]} />
        </div>
      </div>

    </div>
  );
}
