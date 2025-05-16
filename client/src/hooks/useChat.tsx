import { useState, useCallback, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { Message, FactCard } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { validateMessage, getWelcomeMessage } from '@/lib/prompt-engineering';
import { v4 as uuidv4 } from 'uuid';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage()]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize session from localStorage if available
  useEffect(() => {
    const storedSessionId = localStorage.getItem('factfinder_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      // Load messages for this session
      fetchSessionMessages(storedSessionId);
    } else {
      // Create a new session ID
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      localStorage.setItem('factfinder_session_id', newSessionId);
    }
  }, []);

  // Fetch messages for an existing session
  const fetchSessionMessages = async (sid: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/chat/${sid}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      if (data.messages && Array.isArray(data.messages)) {
        setMessages([getWelcomeMessage(), ...data.messages]);
      }
    } catch (error) {
      console.error('Error fetching session messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load chat history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Send a message and get a response
  const sendMessage = useCallback(async (content: string) => {
    const validation = validateMessage(content);
    if (!validation.isValid) {
      toast({
        title: 'Invalid message',
        description: validation.reason,
        variant: 'destructive',
      });
      return;
    }

    try {
      // Add user message to the list immediately
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      // Start loading state for AI response
      setIsLoading(true);
      
      // Send the message to the API
      const response = await apiRequest('POST', '/api/chat', {
        content,
        sessionId,
      });
      
      const data = await response.json();
      
      // Save the session ID if it's new
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
        localStorage.setItem('factfinder_session_id', data.sessionId);
      }
      
      // Create the AI response message
      const aiMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.message.content,
        factCard: data.message.factCard,
        sources: data.message.sources,
        timestamp: new Date(),
      };
      
      // Add the AI response to the messages
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, toast]);

  // Clear the chat history
  const clearChat = useCallback(() => {
    // Create a new session
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    localStorage.setItem('factfinder_session_id', newSessionId);
    
    // Reset messages to just the welcome message
    setMessages([getWelcomeMessage()]);
    
    toast({
      title: 'Chat cleared',
      description: 'Your chat history has been cleared',
    });
  }, [toast]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };
}
