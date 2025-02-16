import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, ChevronRight } from "lucide-react";

const Agents = () => {
  const agents = [
    { id: 1, name: "Assistant", description: "General purpose AI assistant" },
    { id: 2, name: "Writer", description: "Specialized in content creation" },
    { id: 3, name: "Analyst", description: "Data analysis and insights" }
  ];

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
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
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
                <Button variant="ghost" size="sm" className="mt-4 w-full group">
                  Open Agent
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Agents;
