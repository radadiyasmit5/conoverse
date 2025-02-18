// server/routes.ts
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import * as storage from "./storage";
import { z } from "zod";
import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Inline validation schemas
const conversationSchema = z.object({
  title: z.string(),
  userId: z.union([z.string(), z.number()]).transform(val => val.toString()),
  agentId: z.union([z.string(), z.number()]).transform(val => val.toString()),
  messages: z.array(z.object({
    content: z.string(),
    isUser: z.boolean(),
    timestamp: z.date().optional(),
  })),
});

const messageSchema = z.object({
  content: z.string(),
  isUser: z.boolean(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat route: get agent reply
  app.post("/api/chat", async (req: Request, res: Response) => {
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
      res.status(500).json({ error: "Error processing chat request", details: error.message });
    }
  });

  // Agent routes (unchanged)
  app.post("/api/agents", async (req: Request, res: Response) => {
    const agentSchema = z.object({
      name: z.string(),
      description: z.string(),
      prompt: z.string(),
      userId: z.string(),
    });
    try {
      const agentData = agentSchema.parse(req.body);
      const agent = await storage.createAgent(agentData);
      res.status(201).json({ agent });
    } catch (error: any) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.message });
      res.status(500).json({ error: "Failed to create agent", details: error.message });
    }
  });

  app.get("/api/agents", async (_req: Request, res: Response) => {
    try {
      const agents = await storage.getAgents();
      res.json({ agents });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch agents", details: error.message });
    }
  });

  app.get("/api/agents/:id", async (req: Request, res: Response) => {
    try {
      const agent = await storage.getAgent(req.params.id);
      if (!agent) return res.status(404).json({ error: "Agent not found" });
      res.json({ agent });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch agent", details: error.message });
    }
  });

  // Conversation routes
  app.get("/api/conversations", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "userId query parameter is required" });
      const conversations = await storage.getConversations(userId);
      res.json({ conversations });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch conversations", details: error.message });
    }
  });

  app.post("/api/conversations", async (req: Request, res: Response) => {
    try {
      const conversationData = conversationSchema.parse(req.body);
      const newConversation = await storage.createConversation(conversationData);
      res.status(201).json({ conversation: newConversation });
    } catch (error: any) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.message });
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation", details: error.message });
    }
  });

  // Add message to conversation
  app.post("/api/conversations/:conversationId/messages", async (req: Request, res: Response) => {
    try {
      const conversationId = req.params.conversationId;
      const parsed = messageSchema.parse(req.body);
      const updatedConversation = await storage.addMessageToConversation(conversationId, parsed);
      res.status(201).json({ conversation: updatedConversation });
    } catch (error: any) {
      if (error instanceof z.ZodError) return res.status(400).json({ error: error.message });
      res.status(500).json({ error: "Failed to add message", details: error.message });
    }
  });

  app.get("/api/conversations/:conversationId/messages", async (req: Request, res: Response) => {
    try {
      const conversationId = req.params.conversationId;
      const messages = await storage.getMessages(conversationId);
      res.json({ messages });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch messages", details: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
