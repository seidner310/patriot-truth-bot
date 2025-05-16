import React from 'react';
import { Message } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Check, Link } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'flex-row-reverse' : ''} items-start space-x-2 ${isUser ? 'space-x-reverse' : ''} ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className={`w-8 h-8 rounded-full ${isUser ? 'bg-gray-200' : 'bg-primary-100'} flex items-center justify-center flex-shrink-0`}>
        <i className={`${isUser ? 'ri-user-line text-gray-600' : 'ri-robot-line text-primary-600'}`}></i>
      </div>
      
      <div className="flex flex-col max-w-[85%]">
        <div className={`${isUser ? 'bg-gray-100' : 'bg-primary-50'} rounded-lg p-3 shadow-sm`}>
          <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: message.content }} />
          
          {message.factCard && (
            <div className="fact-card bg-white p-3 mt-3 rounded border border-gray-200">
              <h4 className="font-medium text-sm text-primary-700 flex items-center">
                <i className="ri-fact-check-line mr-1"></i> {message.factCard.title}
              </h4>
              <ul className="text-sm mt-1 space-y-1 text-gray-700">
                {message.factCard.facts.map((fact, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {message.sources && message.sources.length > 0 && (
          <div className="source-list pl-2 pt-1 text-xs text-gray-500">
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
