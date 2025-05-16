import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-2 bot-message">
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
        <i className="ri-robot-line text-primary-600"></i>
      </div>
      <div className="bg-primary-50 rounded-lg p-3 px-4 shadow-sm">
        <div className="typing-indicator">
          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce inline-block mx-0.5" style={{ animationDelay: '0s' }}></span>
          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce inline-block mx-0.5" style={{ animationDelay: '0.2s' }}></span>
          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce inline-block mx-0.5" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
