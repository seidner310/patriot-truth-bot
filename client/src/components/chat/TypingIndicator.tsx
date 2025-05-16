import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-2 patriot-message">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
        <img src="/src/assets/flag-small.svg" alt="American Flag" className="w-full h-full rounded-full shadow-sm object-cover" />
      </div>
      <div className="bg-primary-50 rounded-lg p-3 px-4 shadow-sm relative">
        <div className="absolute top-0 right-0 h-full w-1 bg-secondary-500"></div>
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
