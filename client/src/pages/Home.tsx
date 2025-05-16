import React, { useRef, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import TypingIndicator from '@/components/chat/TypingIndicator';
import { useChat } from '@/hooks/useChat';
import { Shield, Flag, InfoIcon } from 'lucide-react';

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
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          {/* Welcome section */}
          <div className="p-4 border-b" style={{ background: 'linear-gradient(135deg, rgba(221, 229, 253, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(250, 216, 216, 1) 100%)' }}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 patriot-icon p-2 rounded-full">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">WELCOME TO PATRIOT TRUTHBOT</h2>
                <p className="text-sm text-gray-600 mt-1">
                  I provide fact-based, evidence-backed information to defend truth and American values. 
                  Ask me about any topic and I'll provide clear facts without political bias.
                </p>
              </div>
              <div className="ml-auto">
                <Flag className="h-5 w-5 text-secondary-600" />
              </div>
            </div>
          </div>

          {/* Chat messages container */}
          <div 
            ref={chatContainerRef}
            className="overflow-y-auto p-4 space-y-6"
            style={{ height: 'calc(100vh - 350px)', minHeight: '300px', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'smallGrid\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 20 0 L 0 0 0 20\' fill=\'none\' stroke=\'%23f0f0f0\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23smallGrid)\'/%3E%3C/svg%3E")' }}
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
        <div className="mt-4 rounded-lg bg-white p-4 shadow-md border border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 flex items-center">
            <Shield className="h-4 w-4 mr-1 text-primary-600" />
            HOW PATRIOT TRUTHBOT WORKS
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Patriot Truthbot provides evidence-based information sourced from reputable publications, 
            verified research, and established authorities. We aim to be accurate and transparent 
            about sources while protecting American values. Our mission is to defend truth in a balanced way
            that respects all patriotic Americans.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
