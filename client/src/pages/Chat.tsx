import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import ChatWindow from "@/components/chat/ChatWindow";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const sendMessageMutation = useMutation({
    mutationFn: async ({ content, model }: { content: string; model: string }) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: content, model }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      queryClient.invalidateQueries({ queryKey: ["/api/conversations"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (content: string, model: string) => {
    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content,
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    // Send to API
    sendMessageMutation.mutate({ content, model });
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        content: "Hello! How can I help you today?",
        isUser: false,
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
      <ChatWindow 
        messages={messages} 
        onSendMessage={handleSendMessage}
        onNewChat={handleNewChat}
        isLoading={sendMessageMutation.isPending}
      />
    </motion.div>
  );
};

export default Chat;