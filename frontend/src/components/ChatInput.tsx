import { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from 'lucide-react';

interface ChatInputProps {
  text: string;
  file: File | null;
  onTextChange: (text: string) => void;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void | Promise<void>;
}

export const ChatInput = ({ text, file, onTextChange, onFileChange, onSubmit }: ChatInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
    <div className="flex items-end space-x-2 border rounded-xl p-3 shadow-md w-full">
      <textarea
        className="flex-1 resize-none border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={2}
        placeholder="Type out your document here..."
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
      />

      <Button variant="ghost" className='w-12 h-12 hover:scale-110 transition-transform' onClick={() => fileInputRef.current?.click()}>
        <Paperclip className='w-6 h-6'/>
      </Button>

      <Input
        type="file"
        accept=".txt,.docx"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />

      <Button className='w-18 h-12 hover:scale-105 transition-transform' onClick={onSubmit}>
        <Send className="w-6 h-6 mr-1" /> Send
      </Button>
    </div>
    
{file && (
  <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">
    Selected file: <span className="font-medium">{file.name}</span>
  </p>
)}
    </>
  );
};
