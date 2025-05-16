import React, { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, X, Flag } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const clearInput = () => {
    setMessage('');
  };

  return (
    <div className="border-t border-gray-200 p-4" 
         style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(245,245,255,1) 100%)' }}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Flag className="h-4 w-4 text-secondary-600 flex-shrink-0 hidden md:block" />
        <div className="relative flex-1">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask for facts or to verify claims..."
            className="w-full py-2 px-4 pr-10 border border-primary-200 shadow-sm rounded-full focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            disabled={isLoading}
          />
          {message && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={clearInput}
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          size="icon"
          className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition flex items-center justify-center w-10 h-10 shadow-md"
          disabled={isLoading || !message.trim()}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
