import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table (existing)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Agents table (new)
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  prompt: text("prompt").notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Conversations table (modified to include agentId)
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userId: integer("user_id").references(() => users.id),
  agentId: integer("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Messages table (existing)
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  isUser: boolean("is_user").notNull(),
  conversationId: integer("conversation_id").references(() => conversations.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  agents: many(agents),
  conversations: many(conversations),
}));

export const agentsRelations = relations(agents, ({ many, one }) => ({
  conversations: many(conversations),
  user: one(users, {
    fields: [agents.userId],
    references: [users.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ many, one }) => ({
  messages: many(messages),
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  agent: one(agents, {
    fields: [conversations.agentId],
    references: [agents.id],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

// Schema for inserting
export const insertUserSchema = createInsertSchema(users);
export const insertAgentSchema = createInsertSchema(agents);
export const insertConversationSchema = createInsertSchema(conversations);
export const insertMessageSchema = createInsertSchema(messages);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;