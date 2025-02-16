import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "@/lib/theme";
import { useEffect } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Initialize theme on component mount
    setTheme(theme);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-6 space-y-6"
    >
      <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
        Settings
      </h1>

      <div className="grid gap-6">
        <Card className="bg-background/60 backdrop-blur-lg border-border/50">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={theme}
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="animations">Enable Animations</Label>
              <Switch id="animations" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-lg border-border/50">
          <CardHeader>
            <CardTitle>Chat Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default AI Model</Label>
              <Select defaultValue="gpt-3.5-turbo">
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Settings;