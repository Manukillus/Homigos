'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, Send, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Roommate } from '@/lib/types';
import { getChatResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type GroupChatProps = {
  roommates: Roommate[];
};

type Message = {
  name: string;
  text: string;
};

function ChatWindow({
  messages,
  input,
  setInput,
  handleSendMessage,
  isLoading,
  title,
  description,
  isAiChat,
}: {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isLoading: boolean;
  title: string;
  description: string;
  isAiChat: boolean;
}) {
  return (
    <Card className="flex flex-col h-full rounded-none border-0">
      <CardHeader>
        <div className="flex items-center gap-4">
          {isAiChat ? (
            <MessageSquare className="h-8 w-8 text-primary" />
          ) : (
            <Users className="h-8 w-8 text-primary" />
          )}
          <div>
            <CardTitle className="font-headline text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4 overflow-hidden">
        <div className="space-y-4 overflow-y-auto pr-2 flex-1 p-4">
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
                <AvatarFallback>
                  {isAiChat ? 'A' : 'R'}
                </AvatarFallback>
              </Avatar>
              <div className="max-w-xs rounded-lg px-3 py-2 bg-secondary">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex w-full items-center space-x-2 p-4 border-t"
        >
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

export default function GroupChat({ roommates }: GroupChatProps) {
  const { toast } = useToast();
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      name: 'HomigoBot',
      text: 'Hello! I am HomigoBot. Ask me anything about managing your household!',
    },
  ]);
  const [roommateMessages, setRoommateMessages] = useState<Message[]>([]);
  const [aiInput, setAiInput] = useState('');
  const [roommateInput, setRoommateInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isRoommateLoading, setIsRoommateLoading] = useState(false);

  const handleSendAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage: Message = { name: 'You', text: aiInput };
    setAiMessages((prev) => [...prev, userMessage]);
    setAiInput('');
    setIsAiLoading(true);

    const result = await getChatResponse(aiInput);
    setIsAiLoading(false);

    if (result.error || !result.data) {
      toast({
        title: 'Error',
        description:
          result.error || 'Failed to get a response from the chatbot.',
        variant: 'destructive',
      });
      setAiMessages((prev) => prev.slice(0, prev.length - 1));
    } else {
      const botMessage: Message = { name: 'HomigoBot', text: result.data };
      setAiMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleSendRoommateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roommateInput.trim()) return;

    const userMessage: Message = { name: 'You', text: roommateInput };
    setRoommateMessages((prev) => [...prev, userMessage]);
    setRoommateInput('');
    // Simulate other roommates responding
    setIsRoommateLoading(true);
    setTimeout(() => {
        if(roommates.length > 0) {
            const randomRoommate = roommates[Math.floor(Math.random() * roommates.length)];
            const responses = ["lol", "okay", "got it", "sure", "see you then"];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const roommateMessage: Message = { name: randomRoommate.name, text: randomResponse };
            setRoommateMessages((prev) => [...prev, roommateMessage]);
        }
        setIsRoommateLoading(false);
    }, 1500);
  };

  return (
    <Tabs defaultValue="ai" className="w-full h-full flex flex-col">
      <div className="px-4 pt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ai">Chat with AI</TabsTrigger>
          <TabsTrigger value="roommates">Chat with Roommates</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="ai" className="flex-1 mt-0">
        <ChatWindow
          messages={aiMessages}
          input={aiInput}
          setInput={setAiInput}
          handleSendMessage={handleSendAiMessage}
          isLoading={isAiLoading}
          title="Chat with HomigoBot"
          description="Your personal AI assistant for house management."
          isAiChat={true}
        />
      </TabsContent>
      <TabsContent value="roommates" className="flex-1 mt-0">
        <ChatWindow
          messages={roommateMessages}
          input={roommateInput}
          setInput={setRoommateInput}
          handleSendMessage={handleSendRoommateMessage}
          isLoading={isRoommateLoading}
          title="Roommate Chat"
          description="A group chat for you and your roommates."
          isAiChat={false}
        />
      </TabsContent>
    </Tabs>
  );
}
