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
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
        {isUser ? (
          <div className="w-full h-full bg-secondary-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-secondary-600" />
          </div>
        ) : (
          <img src="/src/assets/flag-small.svg" alt="American Flag" className="w-full h-full rounded-full shadow-sm object-cover" />
        )}
      </div>
      
      <div className="flex flex-col max-w-[85%]">
        <div className={`${isUser ? 'bg-secondary-50' : 'bg-primary-50'} rounded-lg p-3 shadow-sm relative overflow-hidden`}>
          {!isUser && (
            <div className="absolute top-0 right-0 h-full w-1 bg-secondary-500"></div>
          )}
          {isUser && (
            <div className="absolute top-0 left-0 h-full w-1 bg-primary-500"></div>
          )}
          
          <div className="text-gray-800 message-content">
            {isUser ? (
              <p dangerouslySetInnerHTML={{ __html: message.content }} />
            ) : (
              <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: message.content }} />
            )}
          </div>
          
          {message.factCard && (
            <div className="fact-card bg-white p-3 mt-3 rounded border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #3b4ded, #ffffff, #db3c3c)' }}></div>
              <h4 className="font-bold text-sm text-primary-700 flex items-center">
                <img src="/src/assets/flag-small.svg" alt="American Flag" className="h-4 w-auto mr-2 shadow-sm" />
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
