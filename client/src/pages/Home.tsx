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
          <div className="p-4 border-b relative overflow-hidden" 
               style={{ background: 'linear-gradient(135deg, rgba(221, 229, 253, 0.9) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(250, 216, 216, 0.9) 100%)' }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ 
              backgroundImage: `url("/src/assets/flag-small.svg")`,
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              zIndex: 0
            }}></div>
            <div className="flex items-start space-x-3 relative z-10">
              <div className="flex-shrink-0 mr-1">
                <img src="/src/assets/flag-small.svg" alt="American Flag" className="h-10 w-auto shadow-sm" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">WELCOME TO PATRIOT TRUTHBOT</h2>
                
              </div>
              <div className="ml-auto">
                
              </div>
            </div>
          </div>

          {/* Chat messages container */}
          <div 
            ref={chatContainerRef}
            className="overflow-y-auto p-4 space-y-6 relative"
            style={{ 
              height: 'calc(100vh - 350px)', 
              minHeight: '300px',
              background: 'linear-gradient(135deg, rgba(221, 229, 253, 0.3) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(250, 216, 216, 0.3) 100%)'
            }}
          >
            <div className="relative z-10">
              {messages.map((message) => (
                <ChatMessage key={message.id || message.timestamp?.toISOString()} message={message} />
              ))}
              
              {isLoading && <TypingIndicator />}
            </div>
          </div>

          {/* Message input area */}
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>

        {/* Explanation footer */}
        <div className="mt-4 rounded-lg bg-white p-4 shadow-md border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #3b4ded, #ffffff, #db3c3c)' }}></div>
          <div className="flex items-start">
            <div className="mr-3 flex-shrink-0">
              <img src="/src/assets/flag-small.svg" alt="American Flag" className="h-8 w-auto shadow-sm" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 flex items-center">
                HOW PATRIOT TRUTHBOT WORKS
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Patriot Truthbot provides evidence-based information sourced from reputable publications, 
                verified research, and established authorities. We aim to be accurate and transparent 
                about sources while protecting American values. Our mission is to defend truth in a balanced way
                that respects all patriotic Americans.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
