import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const user = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(user.username);

      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const newUser = await storage.createUser(user);
      res.status(201).json({ user: newUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Conversation routes
  app.get("/api/conversations", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      const conversations = await storage.getConversations(userId);
      res.json({ conversations });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  app.post("/api/conversations", async (req, res) => {
    try {
      const conversation = insertConversationSchema.parse(req.body);
      const newConversation = await storage.createConversation(conversation);
      res.status(201).json({ conversation: newConversation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Message routes
  app.get("/api/conversations/:conversationId/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.conversationId);
      const messages = await storage.getMessages(conversationId);
      res.json({ messages });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/conversations/:conversationId/messages", async (req, res) => {
    try {
      const conversationId = parseInt(req.params.conversationId);
      const message = insertMessageSchema.parse({ 
        ...req.body, 
        conversationId 
      });
      const newMessage = await storage.createMessage(message);
      res.status(201).json({ message: newMessage });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}