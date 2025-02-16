import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertConversationSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat route
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, model = "gpt-3.5-turbo" } = req.body;

      const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      const response = completion.choices[0].message.content;

      res.json({ response });
    } catch (error: any) {
      console.error("OpenAI Error:", error);
      res.status(500).json({ 
        error: "Error processing chat request",
        details: error.message 
      });
    }
  });

  // Agent routes
  app.post("/api/agents", async (req, res) => {
    try {
      const { name, description, prompt } = req.body;
      const agent = {
        id: Date.now(),
        name,
        description,
        prompt,
        createdAt: new Date()
      };

      res.status(201).json({ agent });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to create agent",
        details: error.message 
      });
    }
  });

  app.get("/api/agents", (_req, res) => {
    const agents = [
      { 
        id: 1, 
        name: "General Assistant", 
        description: "A helpful AI assistant for general tasks",
        createdAt: new Date()
      },
      { 
        id: 2, 
        name: "Code Helper", 
        description: "Specialized in programming assistance",
        createdAt: new Date()
      }
    ];

    res.json({ agents });
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