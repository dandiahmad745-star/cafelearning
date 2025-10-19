import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const forumTopics = [
    { id: 1, title: 'What\'s your go-to morning brew?', replies: 24, lastReply: '2 hours ago' },
    { id: 2, title: 'Best grinder under $200?', replies: 42, lastReply: '5 hours ago' },
    { id: 3, title: 'Show off your coffee station!', replies: 112, lastReply: '1 day ago' },
    { id: 4, title: 'Help me dial in my espresso shot', replies: 15, lastReply: '2 days ago' },
]


export default function ForumPage() {
  return (
    <>
      <PageHeader
        title="Community Forum"
        description="Share tips, ask questions, and connect with fellow coffee enthusiasts from around the world."
      />
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="flex justify-end mb-8">
            <Button>Start a New Topic</Button>
        </div>
        <Card>
            <CardContent className="p-0">
                <div className="space-y-2">
                    {forumTopics.map(topic => (
                        <div key={topic.id} className="flex items-center p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                            <div className="flex-grow">
                                <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">{topic.title}</h3>
                                <p className="text-sm text-muted-foreground">Last reply {topic.lastReply}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{topic.replies}</p>
                                <p className="text-sm text-muted-foreground">Replies</p>
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
