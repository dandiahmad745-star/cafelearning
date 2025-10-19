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
import { useSupabase } from '@/lib/supabase/provider';

export default function NewTopicPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { supabase, session } = useSupabase();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || !session) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out both the title and content.',
            });
            return;
        }

        setIsLoading(true);

        const { data, error } = await supabase
            .from('forum_topics')
            .insert({
                title: title.trim(),
                content: content.trim(),
                author_id: session.user.id,
            })
            .select()
            .single();

        setIsLoading(false);

        if (error) {
            toast({
                variant: 'destructive',
                title: 'Error creating topic',
                description: error.message,
            });
        } else {
            toast({
                title: 'Topic Created!',
                description: 'Your new topic has been successfully posted.',
            });
            router.push(`/forum/${data.id}`);
        }
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
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Label htmlFor="content" className="text-base">Content</Label>
                        <Textarea 
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Elaborate on your topic here."
                            className="mt-2 min-h-[200px] text-base"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild disabled={isLoading}>
                            <Link href="/forum">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit Topic'}
                        </Button>
                    </div>
               </form>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
