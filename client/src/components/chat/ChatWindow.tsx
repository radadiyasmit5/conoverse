import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Loader2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scaleInVariants } from "@/hooks/useAnimation";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (content: string, model: string) => void;
  onNewChat: () => void;
  isLoading?: boolean;
}

const ChatWindow = ({ messages, onSendMessage, onNewChat, isLoading }: ChatWindowProps) => {
  return (
    <motion.div
      variants={scaleInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col h-full bg-background/60 backdrop-blur-xl rounded-lg border border-border/50"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-b border-border/50 backdrop-blur-sm flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Chat Session</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewChat}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <PlusCircle className="w-4 h-4" />
            New Chat
          </Button>
        </div>
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              Thinking...
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ScrollArea className="flex-1 p-4">
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              index={index}
            />
          ))}
        </AnimatePresence>
      </ScrollArea>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-t border-border/50 backdrop-blur-sm"
      >
        <ChatInput onSend={onSendMessage} />
      </motion.div>
    </motion.div>
  );
};

export default ChatWindow;