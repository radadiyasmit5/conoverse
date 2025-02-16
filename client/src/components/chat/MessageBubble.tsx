import { motion } from "framer-motion";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  animate?: any;
  transition?: any;
}

const MessageBubble = ({ message, animate, transition }: MessageBubbleProps) => {
  const bubbleClasses = message.isUser
    ? "ml-auto bg-gradient-to-br from-purple-600/30 to-indigo-600/30"
    : "mr-auto bg-gradient-to-br from-gray-600/30 to-gray-700/30";

  return (
    <motion.div
      animate={animate}
      transition={transition}
      className={`max-w-[80%] mb-4 ${message.isUser ? "ml-auto" : "mr-auto"}`}
    >
      <div
        className={`rounded-lg p-4 backdrop-blur-md border border-border/50 ${bubbleClasses}`}
      >
        <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
          {message.content}
        </ReactMarkdown>
      </div>
      <div
        className={`text-xs text-foreground/60 mt-1 ${
          message.isUser ? "text-right" : "text-left"
        }`}
      >
        {format(message.timestamp, "HH:mm")}
      </div>
    </motion.div>
  );
};

export default MessageBubble;
