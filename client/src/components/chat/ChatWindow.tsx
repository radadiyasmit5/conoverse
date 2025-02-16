import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatWindow = ({ messages, onSendMessage }: ChatWindowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-background/60 backdrop-blur-xl rounded-lg border border-border/50"
    >
      <div className="p-4 border-b border-border/50 backdrop-blur-sm">
        <h2 className="text-lg font-semibold">Chat Session</h2>
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
