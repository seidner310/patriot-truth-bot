import { Message } from './types';

/**
 * Helper function to get the welcome message for the chat
 */
export function getWelcomeMessage(): Message {
  return {
    id: 'welcome',
    role: 'assistant',
    content: "Welcome to Patriot Truthbot. I provide fact-based, verified information to help Americans understand the truth. Ask me about any topic—including questionable claims—and I'll present a balanced unbiased analysis based on evidence.",
    timestamp: new Date(),
    factCard: {
      title: "PATRIOT TRUTHBOT MISSION",
      type: "key_facts",
      facts: [
        "Providing verified information from trusted American sources",
        "Analyzing claims with clear, factual evidence",
        "Presenting balanced assessments on complex topics",
        "Defending truth and American values",
        "Offering straightforward facts without political bias"
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
  const americanValuesRegex = /\b(freedom|liberty|democracy|constitution|rights|justice|equality|america|united states|usa|truth|evidence|fact)\b/gi;
  content = content.replace(americanValuesRegex, '<span class="font-semibold text-primary-700">$1</span>');
  
  // Highlight important scientific terms
  const scientificTermsRegex = /\b(scientific consensus|research|evidence-based|verified|proven|studies show)\b/gi;
  content = content.replace(scientificTermsRegex, '<span class="font-semibold text-secondary-700">$1</span>');
  
  return content;
}
