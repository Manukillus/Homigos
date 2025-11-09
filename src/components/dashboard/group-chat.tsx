'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Roommate } from '@/lib/types';
import { getChatResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

type GroupChatProps = {
  roommates: Roommate[];
};

type Message = {
  name: string;
  text: string;
};

export default function GroupChat({ roommates }: GroupChatProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      name: 'HomigoBot',
      text: 'Hello! I am HomigoBot. Ask me anything about managing your household!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { name: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await getChatResponse(input);
    setIsLoading(false);

    if (result.error || !result.data) {
      toast({
        title: 'Error',
        description:
          result.error || 'Failed to get a response from the chatbot.',
        variant: 'destructive',
      });
      // Optionally remove the user's message if the call fails
      setMessages((prev) => prev.slice(0, prev.length -1));
    } else {
      const botMessage: Message = { name: 'HomigoBot', text: result.data };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader>
        <div className="flex items-center gap-4">
          <MessageSquare className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-xl">Group Chat</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
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
                  <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>H</AvatarFallback>
                </Avatar>
                <div className='max-w-xs rounded-lg px-3 py-2 bg-secondary'>
                   <Loader2 className="h-5 w-5 animate-spin" />
                </div>
             </div>
          )}
        </div>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
