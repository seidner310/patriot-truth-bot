import { Message } from './types';

/**
 * Helper function to get the welcome message for the chat
 */
export function getWelcomeMessage(): Message {
  return {
    id: 'welcome',
    role: 'assistant',
    content: "I provide factual, evidence-based information to help you navigate complex topics. Ask me about scientific concepts or to fact-check claims you've heard.",
    timestamp: new Date(),
  };
}

/**
 * Validate if the message contains any potential harmful or offensive content
 * This is a simple implementation that should be expanded based on requirements
 */
export function validateMessage(message: string): { isValid: boolean; reason?: string } {
  if (!message.trim()) {
    return { isValid: false, reason: 'Message cannot be empty' };
  }
  
  if (message.length > 500) {
    return { isValid: false, reason: 'Message is too long (maximum 500 characters)' };
  }
  
  return { isValid: true };
}

/**
 * Format a message for display, potentially adding line breaks or formatting
 */
export function formatMessageContent(content: string): string {
  // Replace URLs with clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">$1</a>');
}
