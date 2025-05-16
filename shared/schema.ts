import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  sessionId: text("session_id").notNull(),
  factCard: jsonb("fact_card"), // Optional fact card data
  sources: jsonb("sources"), // Optional sources data
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  role: true,
  content: true,
  sessionId: true,
  factCard: true,
  sources: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Types for our application
export const messageRoleSchema = z.enum(["user", "assistant", "system"]);
export type MessageRole = z.infer<typeof messageRoleSchema>;

export const factCardSchema = z.object({
  title: z.string(),
  type: z.enum(["key_facts", "evidence_check"]),
  facts: z.array(z.string()),
});
export type FactCard = z.infer<typeof factCardSchema>;

export const sourceSchema = z.array(z.string());
export type Sources = z.infer<typeof sourceSchema>;

export const chatMessageSchema = z.object({
  role: messageRoleSchema,
  content: z.string(),
  factCard: factCardSchema.optional(),
  sources: sourceSchema.optional(),
  id: z.string().optional(),
  timestamp: z.date().optional(),
});
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const chatResponseSchema = z.object({
  role: z.literal("assistant"),
  content: z.string(),
  factCard: factCardSchema.optional(),
  sources: sourceSchema.optional(),
});
export type ChatResponse = z.infer<typeof chatResponseSchema>;
