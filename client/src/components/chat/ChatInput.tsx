import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bold, Italic, Code, Upload, Globe, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ChatInputProps {
  onSend: (message: string, model: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message, selectedModel);
      setMessage("");
      setSelectedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1 flex justify-end gap-2">
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
      </div>

      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="pr-24 resize-none bg-background/50 backdrop-blur-sm"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="absolute right-2 bottom-2 flex gap-2">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" size="icon" variant="ghost">
                <Globe className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Web Search</h4>
                <p className="text-sm text-muted-foreground">
                  Search the web for relevant information
                </p>
              </div>
            </PopoverContent>
          </Popover>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
      </div>
      {selectedFile && (
        <div className="text-sm text-muted-foreground">
          Selected file: {selectedFile.name}
        </div>
      )}
    </form>
  );
};

export default ChatInput;