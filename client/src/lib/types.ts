export interface FactCard {
  title: string;
  type: "key_facts" | "evidence_check";
  facts: string[];
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  factCard?: FactCard;
  sources?: string[];
  timestamp?: Date;
}

export interface ChatSession {
  sessionId: string;
  messages: Message[];
}
