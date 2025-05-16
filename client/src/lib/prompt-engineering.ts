import { Message } from './types';

/**
 * Helper function to get the welcome message for the chat
 */
export function getWelcomeMessage(): Message {
  return {
    id: 'welcome',
    role: 'assistant',
    content: "Welcome, patriot! I provide fact-based, verified information to help you understand the truth. Ask me about any topic, and I'll give you straight facts backed by reliable sources.",
    timestamp: new Date(),
    factCard: {
      title: "PATRIOT TRUTHBOT MISSION",
      type: "key_facts",
      facts: [
        "Delivering fact-based information without political bias",
        "Sourcing from verified, reputable publications",
        "Respecting American values while prioritizing truth",
        "Providing clear evidence for all claims"
      ]
    }
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
  content = content.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">$1</a>');
  
  // Highlight American values with patriotic styling
  const americanValuesRegex = /\b(freedom|liberty|democracy|constitution|rights|justice|equality|america|united states|usa)\b/gi;
  content = content.replace(americanValuesRegex, '<span class="font-semibold text-primary-700">$1</span>');
  
  return content;
}
