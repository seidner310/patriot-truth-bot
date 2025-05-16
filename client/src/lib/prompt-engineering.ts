import { Message } from './types';

/**
 * Helper function to get the welcome message for the chat
 */
export function getWelcomeMessage(): Message {
  return {
    id: 'welcome',
    role: 'assistant',
    content: "Welcome. I am Patriot Truthbot, dedicated to providing factual, evidence-based information through stoic reasoning. Ask me about any topic—including conspiracy theories or questionable claims—and I will present you with a balanced analysis based on verified evidence.",
    timestamp: new Date(),
    factCard: {
      title: "PATRIOT TRUTHBOT METHODOLOGY",
      type: "key_facts",
      facts: [
        "Using the Epistemological Reasoning Method to analyze claims",
        "Presenting evidence with precise consensus terminology",
        "Providing verified information from authoritative sources",
        "Maintaining stoic reasoning free from emotional bias",
        "Upholding American values of critical thinking and truth"
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
  const americanValuesRegex = /\b(freedom|liberty|democracy|constitution|rights|justice|equality|america|united states|usa|truth|evidence|fact|reasoning|logic)\b/gi;
  content = content.replace(americanValuesRegex, '<span class="font-semibold text-primary-700">$1</span>');
  
  // Highlight scientific consensus terms
  const consensusTermsRegex = /\b(established scientific fact|strong scientific consensus|emerging consensus|active research area|inconclusive evidence)\b/gi;
  content = content.replace(consensusTermsRegex, '<span class="font-semibold text-secondary-700">$1</span>');
  
  return content;
}
