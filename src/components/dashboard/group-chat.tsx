import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Roommate } from '@/lib/types';

type GroupChatProps = {
  roommates: Roommate[];
};

export default function GroupChat({ roommates }: GroupChatProps) {
  const messages = [
    { name: roommates[0]?.name || 'Rohan', text: 'Hey everyone! Who is up for ordering dinner tonight?' },
    { name: 'You', text: 'I am in! What about pizza?' },
    { name: roommates[1]?.name || 'Priya', text: 'Sounds good to me! 🍕' },
  ];

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <MessageSquare className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-xl">Group Chat</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-4 overflow-y-auto pr-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                msg.name === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.name !== 'You' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {msg.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs rounded-lg px-3 py-2 ${
                  msg.name === 'You'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.name === 'You'
                      ? 'text-primary-foreground/70 text-right'
                      : 'text-muted-foreground'
                  }`}
                >
                  {msg.name}
                </p>
              </div>
               {msg.name === 'You' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    YOU
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Type a message..." />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
