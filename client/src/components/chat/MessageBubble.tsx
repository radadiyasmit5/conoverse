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
  index: number;
}

const MessageBubble = ({ message, index }: MessageBubbleProps) => {
  const bubbleVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.9 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const bubbleClasses = message.isUser
    ? "ml-auto bg-gradient-to-br from-purple-600/30 to-indigo-600/30"
    : "mr-auto bg-gradient-to-br from-gray-600/30 to-gray-700/30";

  return (
    <motion.div
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      layout
      className={`max-w-[80%] mb-4 ${message.isUser ? "ml-auto" : "mr-auto"}`}
    >
      <motion.div
        className={`rounded-lg p-4 backdrop-blur-md border border-border/50 ${bubbleClasses}`}
        layoutId={`message-${message.id}`}
      >
        <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
          {message.content}
        </ReactMarkdown>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`text-xs text-foreground/60 mt-1 ${
          message.isUser ? "text-right" : "text-left"
        }`}
      >
        {format(message.timestamp, "HH:mm")}
      </motion.div>
    </motion.div>
  );
};

export default MessageBubble;