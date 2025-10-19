'use client';

import { notFound, useRouter } from 'next/navigation';
import { use } from 'react';
import { forumTopics } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function PostCard({ post }: { post: { author: { name: string, avatarUrl: string}, createdAt: string, content: string } }) {
    return (
        <div className="flex items-start gap-4">
            <Avatar className="mt-1 h-12 w-12 border">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="font-bold text-foreground">{post.author.name}</span>
                    <span>&middot;</span>
                    <span>{post.createdAt}</span>
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90">
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    )
}

export default function TopicDetailPage({ params }: { params: { id: string } }) {
    const safeParams = use(params);
    const topic = forumTopics.find((t) => t.id === safeParams.id);
    
    if (!topic) {
        notFound();
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
        
            {/* Main Topic Post */}
            <header className="mb-8">
                <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4">{topic.title}</h1>
            </header>

            <Card className="mb-8">
                <CardContent className="p-6">
                    <PostCard post={topic} />
                </CardContent>
            </Card>

            <Separator className="my-10" />

            {/* Replies */}
            <div className="space-y-8">
                <h2 className="text-3xl font-headline font-bold">{topic.replies.length} Replies</h2>
                {topic.replies.map(reply => (
                    <Card key={reply.id}>
                        <CardContent className="p-6">
                             <PostCard post={reply} />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Separator className="my-10" />

            {/* Reply Form */}
            <div>
                 <h2 className="text-3xl font-headline font-bold mb-6">Leave a Reply</h2>
                 <Card>
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                             <Avatar className="mt-1 h-12 w-12 border">
                                <AvatarImage src="https://picsum.photos/seed/currentUser/40/40" alt="Current User" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <Textarea 
                                    placeholder="Write your reply here..."
                                    className="min-h-[120px] text-base"
                                />
                                <div className="flex justify-end mt-4">
                                    <Button>Post Reply</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                 </Card>
            </div>

        </div>
    );
}
