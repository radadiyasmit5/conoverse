import { useState } from "react";
import { motion } from "framer-motion";
import ChatWindow from "@/components/chat/ChatWindow";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content,
        isUser: true,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-6"
    >
      <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    </motion.div>
  );
};

export default Chat;
