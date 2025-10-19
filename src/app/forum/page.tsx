import Link from 'next/link';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatDistanceToNow } from 'date-fns';

export const revalidate = 0;

export default async function ForumPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session }} = await supabase.auth.getSession();

  const { data: topics, error } = await supabase
    .from('forum_topics')
    .select('*, author:profiles(*), replies:forum_replies(count)')
    .order('created_at', { ascending: false });

  return (
    <>
      <PageHeader
        title="Community Forum"
        description="Share tips, ask questions, and connect with fellow coffee enthusiasts from around the world."
      />
      <div className="container mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        {session && (
            <div className="flex justify-end mb-8">
                <Button asChild>
                    <Link href="/forum/new">Start a New Topic</Link>
                </Button>
            </div>
        )}
        <Card>
            <CardContent className="p-0">
                <div className="divide-y">
                    {topics?.map(topic => (
                        <div key={topic.id} className="p-4 hover:bg-muted/50 transition-colors">
                           <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarImage src={topic.author?.avatar_url} alt={topic.author?.full_name} />
                                    <AvatarFallback>{topic.author?.full_name?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <Link href={`/forum/${topic.id}`} className="block">
                                        <h3 className="font-semibold text-lg hover:text-primary transition-colors">{topic.title}</h3>
                                    </Link>
                                    <p className="text-sm text-muted-foreground">
                                        Posted by {topic.author?.full_name ?? 'Anonymous'} &middot; {formatDistanceToNow(new Date(topic.created_at), { addSuffix: true })}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <p className="font-semibold">{topic.replies[0].count}</p>
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
