import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bold, Italic, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-foreground/60 hover:text-foreground"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-foreground/60 hover:text-foreground"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-foreground/60 hover:text-foreground"
        >
          <Code className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="pr-12 resize-none bg-background/50 backdrop-blur-sm"
          rows={3}
        />
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-2 bottom-2"
        >
          <Button
            type="submit"
            size="icon"
            className="bg-purple-600 hover:bg-purple-700"
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </form>
  );
};

export default ChatInput;
