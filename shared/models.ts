// shared/models.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export interface IAgent extends Document {
  name: string;
  description: string;
  prompt: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AgentSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  prompt: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Agent: Model<IAgent> = mongoose.model<IAgent>('Agent', AgentSchema);

export interface IMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface IConversation extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  agentId: mongoose.Types.ObjectId;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    agentId: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
    messages: [
      {
        content: { type: String, required: true },
        isUser: { type: Boolean, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Conversation: Model<IConversation> = mongoose.model<IConversation>('Conversation', ConversationSchema);
