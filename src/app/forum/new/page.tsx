'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function NewTopicPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out both the title and content.',
            });
            return;
        }
        // In a real app, you would submit this data to your backend.
        // For now, we'll just show a success message and redirect.
        toast({
            title: 'Topic Created!',
            description: 'Your new topic has been successfully posted.',
        });
        router.push('/forum');
    };

  return (
    <>
      <PageHeader
        title="Start a New Topic"
        description="Share your thoughts, questions, or discoveries with the community."
      />
      <div className="container mx-auto max-w-3xl px-4 pb-16 md:pb-24">
        <Card>
            <CardHeader>
                <CardTitle>Create a New Topic</CardTitle>
                <CardDescription>Fill in the details below to start a new discussion.</CardDescription>
            </CardHeader>
            <CardContent>
               <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="title" className="text-base">Topic Title</Label>
                        <Input 
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's on your mind?"
                            className="mt-2 text-base"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="content" className="text-base">Content</Label>
                        <Textarea 
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Elaborate on your topic here. You can use Markdown for formatting."
                            className="mt-2 min-h-[200px] text-base"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link href="/forum">Cancel</Link>
                        </Button>
                        <Button type="submit">Submit Topic</Button>
                    </div>
               </form>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
