import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { forumTopics } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';

export default function ForumPage() {
  return (
    <>
      <PageHeader
        title="Community Forum"
        description="Share tips, ask questions, and connect with fellow coffee enthusiasts from around the world."
      />
      <div className="container mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        <div className="flex justify-end mb-8">
            <Button asChild>
                <Link href="/forum/new">Start a New Topic</Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
                <div className="divide-y">
                    {forumTopics.map(topic => (
                        <div key={topic.id} className="p-4 hover:bg-muted/50 transition-colors">
                           <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={topic.author.avatarUrl} alt={topic.author.name} />
                                    <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <Link href={`/forum/${topic.id}`} className="block">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{topic.title}</h3>
                                    </Link>
                                    <p className="text-sm text-muted-foreground">
                                        Posted by {topic.author.name} &middot; {topic.createdAt}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-semibold">{topic.replies.length}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Replies</p>
                                </div>
                           </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </>
  );
}
