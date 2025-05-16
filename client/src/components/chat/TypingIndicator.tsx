import React from 'react';
import { Shield } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-2 patriot-message">
      <div className="w-8 h-8 rounded-full patriot-icon flex items-center justify-center flex-shrink-0">
        <Shield className="h-4 w-4 text-white" />
      </div>
      <div className="bg-primary-50 rounded-lg p-3 px-4 shadow-sm">
        <div className="typing-indicator">
          <span className="h-2 w-2 bg-primary-600 rounded-full animate-bounce inline-block mx-0.5" style={{ animationDelay: '0s' }}></span>
          <span className="h-2 w-2 bg-primary-600 rounded-full animate-bounce inline-block mx-0.5" style={{ animationDelay: '0.2s' }}></span>
          <span className="h-2 w-2 bg-secondary-600 rounded-full animate-bounce inline-block mx-0.5" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
