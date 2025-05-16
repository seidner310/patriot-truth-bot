import React, { useRef, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import TypingIndicator from '@/components/chat/TypingIndicator';
import { useChat } from '@/hooks/useChat';
import { Brain, InfoIcon } from 'lucide-react';

const Home: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Welcome section */}
          <div className="bg-primary-50 p-4 border-b border-primary-100">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 bg-primary-100 text-primary-700 p-2 rounded-full">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-medium text-primary-800">Welcome to FactFinder AI</h2>
                <p className="text-sm text-gray-600 mt-1">
                  I provide factual, evidence-based information to help you navigate complex topics. 
                  Ask me about scientific concepts or to fact-check claims you've heard.
                </p>
              </div>
            </div>
          </div>

          {/* Chat messages container */}
          <div 
            ref={chatContainerRef}
            className="overflow-y-auto p-4 space-y-6"
            style={{ height: 'calc(100vh - 350px)', minHeight: '300px' }}
          >
            {messages.map((message) => (
              <ChatMessage key={message.id || message.timestamp?.toISOString()} message={message} />
            ))}
            
            {isLoading && <TypingIndicator />}
          </div>

          {/* Message input area */}
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>

        {/* Explanation footer */}
        <div className="mt-4 rounded-lg bg-white p-4 shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <InfoIcon className="h-4 w-4 mr-1 text-primary-600" />
            How FactFinder Works
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            FactFinder provides evidence-based information sourced from reputable scientific publications, 
            peer-reviewed research, and established authorities. I aim to be neutral, accurate, and transparent 
            about sources. I won't pick political sides but will present scientific consensus when available.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
