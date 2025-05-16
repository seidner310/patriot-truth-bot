import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateFactResponse } from "./openai";
import { z } from "zod";
import { randomUUID } from "crypto";
import { insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for sending a message and getting a response
  app.post('/api/chat', async (req, res) => {
    try {
      // Validate the request body
      const messageSchema = z.object({
        content: z.string().min(1, "Message content is required"),
        sessionId: z.string().optional(),
      });
      
      const validation = messageSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid request", errors: validation.error.format() });
      }
      
      const { content } = validation.data;
      // Use provided sessionId or generate a new one
      const sessionId = validation.data.sessionId || randomUUID();
      
      // Store user message
      await storage.createMessage({
        role: "user",
        content,
        sessionId,
        factCard: null,
        sources: null,
      });
      
      // Generate AI response using OpenAI
      const aiResponse = await generateFactResponse(content);
      
      // Store AI response
      await storage.createMessage({
        role: "assistant",
        content: aiResponse.content,
        sessionId,
        factCard: aiResponse.factCard,
        sources: aiResponse.sources,
      });
      
      // Return the AI response
      return res.status(200).json({
        message: aiResponse,
        sessionId,
      });
    } catch (error) {
      console.error("Error in chat API:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get chat history for a specific session
  app.get('/api/chat/:sessionId', async (req, res) => {
    try {
      const { sessionId } = req.params;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }
      
      const messages = await storage.getMessagesBySession(sessionId);
      return res.status(200).json({ messages });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
