import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Bot, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Agents = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    description: "",
    prompt: ""
  });

  const { data: agentsData, isLoading } = useQuery({
    queryKey: ["/api/agents"],
  });

  const createAgentMutation = useMutation({
    mutationFn: async (agentData: typeof newAgent) => {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create agent");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsOpen(false);
      setNewAgent({ name: "", description: "", prompt: "" });
      toast({
        title: "Success",
        description: "Agent created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create agent",
        variant: "destructive",
      });
    },
  });

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    createAgentMutation.mutate(newAgent);
  };

  const agents = agentsData?.agents || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          AI Agents
        </h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateAgent} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newAgent.name}
                  onChange={(e) =>
                    setNewAgent((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Agent name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={newAgent.description}
                  onChange={(e) =>
                    setNewAgent((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Brief description"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Initial Prompt</label>
                <Textarea
                  value={newAgent.prompt}
                  onChange={(e) =>
                    setNewAgent((prev) => ({ ...prev, prompt: e.target.value }))
                  }
                  placeholder="Define the agent's behavior..."
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={createAgentMutation.isPending}
              >
                {createAgentMutation.isPending ? "Creating..." : "Create Agent"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p>Loading agents...</p>
        ) : (
          agents.map((agent) => (
            <motion.div
              key={agent.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="bg-background/60 backdrop-blur-lg border-border/50 hover:bg-purple-600/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{agent.name}</CardTitle>
                  <Bot className="w-5 h-5 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70">{agent.description}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 w-full group"
                    onClick={() => {
                      // Navigate to chat with this agent
                      window.location.href = `/chat?agent=${agent.id}`;
                    }}
                  >
                    Chat with Agent
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Agents;