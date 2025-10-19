'use client';

import { notFound, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSupabase } from '@/lib/supabase/provider';
import { useEffect, useState } from 'react';
import type { ForumTopic, ForumReply, Profile } from '@/lib/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

type TopicWithRelations = ForumTopic & {
    author: Profile;
    replies: (ForumReply & { author: Profile })[];
};

function PostCard({ post }: { post: { author: Profile, created_at: string, content: string } }) {
    return (
        <div className="flex items-start gap-4">
            <Avatar className="mt-1 h-12 w-12 border">
                <AvatarImage src={post.author.avatar_url} alt={post.author.full_name} />
                <AvatarFallback>{post.author.full_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="font-bold text-foreground">{post.author.full_name}</span>
                    <span>&middot;</span>
                    <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    )
}

function ReplyForm({ topicId }: { topicId: string }) {
    const { supabase, session } = useSupabase();
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || !session) return;

        setIsLoading(true);
        const { error } = await supabase.from('forum_replies').insert({
            content: content.trim(),
            topic_id: topicId,
            author_id: session.user.id
        });

        setIsLoading(false);
        if (error) {
            toast({ variant: 'destructive', title: 'Error', description: error.message });
        } else {
            setContent('');
            toast({ title: 'Reply posted!' });
            // No need to refresh, real-time will handle it
        }
    };
    
    if (!session) {
        return (
            <div className="text-center text-muted-foreground">
                <Link href="/login" className="text-primary hover:underline">Log in</Link> to post a reply.
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-headline font-bold mb-6">Leave a Reply</h2>
            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleReply}>
                        <div className="flex items-start gap-4">
                            <Avatar className="mt-1 h-12 w-12 border">
                                <AvatarImage src={session.user.user_metadata.avatar_url} alt={session.user.user_metadata.name} />
                                <AvatarFallback>{session.user.user_metadata.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <Textarea
                                    placeholder="Write your reply here..."
                                    className="min-h-[120px] text-base"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isLoading}
                                />
                                <div className="flex justify-end mt-4">
                                    <Button disabled={isLoading || !content.trim()}>
                                        {isLoading ? 'Posting...' : 'Post Reply'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default function TopicDetailPage({ params }: { params: { id: string } }) {
    const { supabase } = useSupabase();
    const [topic, setTopic] = useState<TopicWithRelations | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopic = async () => {
            const { data, error } = await supabase
                .from('forum_topics')
                .select('*, author:profiles(*), replies:forum_replies(*, author:profiles(*))')
                .eq('id', params.id)
                .single();

            if (error || !data) {
                console.error(error);
                setLoading(false);
                // We don't call notFound() immediately to let the component render and show a message if needed
                return;
            }
            // Sort replies by creation time
            if (data.replies) {
                data.replies.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            }
            
            setTopic(data as TopicWithRelations);
            setLoading(false);
        };

        fetchTopic();
    }, [supabase, params.id]);

    useEffect(() => {
        if (!topic) return;

        const channel = supabase.channel(`topic-${topic.id}`)
            .on<ForumReply>(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'forum_replies', filter: `topic_id=eq.${topic.id}` },
                async (payload) => {
                    const { data: author, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', payload.new.author_id)
                        .single();

                    if (error) {
                        console.error('Error fetching reply author', error);
                        return;
                    }

                    const newReply = { ...payload.new, author } as ForumReply & { author: Profile };

                    setTopic(currentTopic => {
                        if (!currentTopic) return null;
                        return {
                            ...currentTopic,
                            replies: [...currentTopic.replies, newReply]
                        };
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, topic]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!topic) {
        // Now we can safely call notFound because the component has rendered
        notFound();
        return null;
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <div className="mb-8">
                <Button variant="ghost" asChild>
                    <Link href="/forum">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Topics
                    </Link>
                </Button>
            </div>

            <header className="mb-8">
                <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{topic.title}</h1>
            </header>

            <Card className="mb-8">
                <CardContent className="p-6">
                    <PostCard post={{
                        author: topic.author,
                        created_at: topic.created_at,
                        content: topic.content
                    }} />
                </CardContent>
            </Card>

            <Separator className="my-10" />

            <div className="space-y-8">
                <h2 className="text-3xl font-headline font-bold">{topic.replies.length} Replies</h2>
                {topic.replies.map(reply => (
                    <Card key={reply.id}>
                        <CardContent className="p-6">
                            <PostCard post={{
                                author: reply.author,
                                created_at: reply.created_at,
                                content: reply.content,
                            }} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Separator className="my-10" />
            
            <ReplyForm topicId={topic.id} />

        </div>
    );
}
