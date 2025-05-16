import React from 'react';
import { Message } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Check, Link, Shield, User, Flag } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'flex-row-reverse' : ''} items-start space-x-2 ${isUser ? 'space-x-reverse' : ''} ${isUser ? 'user-message' : 'patriot-message'}`}>
      <div className={`w-8 h-8 rounded-full ${isUser ? 'bg-secondary-100' : 'patriot-icon'} flex items-center justify-center flex-shrink-0`}>
        {isUser ? (
          <User className="h-4 w-4 text-secondary-600" />
        ) : (
          <Shield className="h-4 w-4 text-white" />
        )}
      </div>
      
      <div className="flex flex-col max-w-[85%]">
        <div className={`${isUser ? 'bg-secondary-50' : 'bg-primary-50'} rounded-lg p-3 shadow-sm`}>
          <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: message.content }} />
          
          {message.factCard && (
            <div className="fact-card bg-white p-3 mt-3 rounded border shadow-sm">
              <h4 className="font-bold text-sm text-primary-700 flex items-center">
                <Flag className="h-3 w-3 text-secondary-600 mr-1" />
                {message.factCard.title}
              </h4>
              <ul className="text-sm mt-1 space-y-1 text-gray-700">
                {message.factCard.facts.map((fact, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-primary-600 mt-0.5 mr-1 flex-shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {message.sources && message.sources.length > 0 && (
          <div className="source-list pl-2 pt-1 text-xs">
            <div className="source-tag flex items-center">
              <Link className="h-3 w-3 mr-1" />
              <span>Sources: {message.sources.join(', ')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
