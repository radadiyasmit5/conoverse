import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/layout/Sidebar";
import Chat from "@/pages/Chat";
import Agents from "@/pages/Agents";
import NotFound from "@/pages/not-found";
import "./styles/animations.css";

function Router() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <Sidebar />
      <main className="flex-1 flex">
        <Switch>
          <Route path="/" component={Chat} />
          <Route path="/chat" component={Chat} />
          <Route path="/agents" component={Agents} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;