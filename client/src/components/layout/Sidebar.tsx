import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, Users, PlusCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

const sidebarAnimation = {
  open: { x: 0, opacity: 1 },
  closed: { x: -20, opacity: 0 }
};

const Sidebar = () => {
  const [location] = useLocation();

  return (
    <motion.div
      initial="closed"
      animate="open"
      variants={sidebarAnimation}
      className="h-screen w-64 bg-background/80 backdrop-blur-lg border-r border-border/50 p-4"
    >
      <div className="flex flex-col h-full">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mb-6 p-4 rounded-lg bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-md"
        >
          <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            ConvoVerse
          </h2>
        </motion.div>

        <ScrollArea className="flex-1 -mx-4 px-4">
          <nav className="space-y-2">
            <NavButton 
              href="/chat"
              icon={<MessageSquare className="w-4 h-4" />}
              label="Conversations"
              active={location === "/chat"}
            />
            <NavButton
              href="/agents"
              icon={<Users className="w-4 h-4" />}
              label="Agents"
              active={location === "/agents"}
            />
            <NavButton
              href="/settings" 
              icon={<Settings className="w-4 h-4" />}
              label="Settings"
              active={location === "/settings"}
            />
          </nav>

          <div className="mt-4 pt-4 border-t border-border/50">
            <Button
              variant="secondary"
              className="w-full justify-start gap-2 bg-purple-600/10 hover:bg-purple-600/20"
            >
              <PlusCircle className="w-4 h-4" />
              New Chat
            </Button>
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
};

const NavButton = ({ href, icon, label, active }: { 
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) => (
  <Link href={href}>
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        active 
          ? 'bg-purple-600/20 text-purple-400'
          : 'hover:bg-purple-600/10 text-foreground/80'
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.a>
  </Link>
);

export default Sidebar;
