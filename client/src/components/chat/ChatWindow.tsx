import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Loader2 } from "lucide-react";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string, model: string) => void;
  isLoading?: boolean;
}

const ChatWindow = ({ messages, onSendMessage, isLoading }: ChatWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-background/60 backdrop-blur-xl rounded-lg border border-border/50"
    >
      <div className="p-4 border-b border-border/50 backdrop-blur-sm flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chat Session</h2>
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Thinking...
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 p-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              animate={{ 
                opacity: [0, 1],
                y: [20, 0]
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </AnimatePresence>
      </ScrollArea>

      <div className="p-4 border-t border-border/50 backdrop-blur-sm">
        <ChatInput onSend={onSendMessage} />
      </div>
    </motion.div>
  );
};

export default ChatWindow;