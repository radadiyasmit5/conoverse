// server/storage.ts
import { User, Agent, Conversation } from "../shared/models.js";
import mongoose from "mongoose";

// Users
export async function createUser(data: { username: string; password: string; }) {
  const user = new User(data);
  return user.save();
}

export async function getUserById(id: string) {
  return User.findById(id).exec();
}

// Agents
export async function createAgent(data: { name: string; description: string; prompt: string; userId: string; }) {
  const agent = new Agent({ ...data, userId: new mongoose.Types.ObjectId(data.userId) });
  return agent.save();
}

export async function getAgents() {
  return Agent.find().exec();
}

export async function getAgent(id: string) {
  return Agent.findById(id).exec();
}

// Conversations
export async function createConversation(data: {
  title: string;
  userId: string;
  agentId: string;
  messages: { content: string; isUser: boolean; timestamp?: Date }[];
}) {
  const conversation = new Conversation({
    ...data,
    userId: new mongoose.Types.ObjectId(data.userId),
    agentId: new mongoose.Types.ObjectId(data.agentId),
  });
  return conversation.save();
}

export async function getConversations(userId: string) {
  return Conversation.find({ userId: new mongoose.Types.ObjectId(userId) }).exec();
}

export async function addMessageToConversation(conversationId: string, message: { content: string; isUser: boolean; timestamp?: Date }) {
  return Conversation.findByIdAndUpdate(
    conversationId,
    { $push: { messages: { ...message, timestamp: message.timestamp || new Date() } } },
    { new: true }
  ).exec();
}

export async function getMessages(conversationId: string) {
  const conv = await Conversation.findById(conversationId).exec();
  return conv ? conv.messages : [];
}
