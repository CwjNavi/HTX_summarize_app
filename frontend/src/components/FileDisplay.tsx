import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

interface FileDisplayProps {
    file: File | null;
    onFileChange: (file: File | null) => void;
}

export const FileDisplay = ({ file, onFileChange }: FileDisplayProps) => {
    return (
        <div className='flex items-center gap-2 mt-2'>
            {file ? (
                <>
                    <p className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                        Selected file: <span className="font-medium">{file.name}</span>
                    </p>
                    <Button onClick={() => {onFileChange(null)}}><Trash2></Trash2></Button>
                </>
            ) : null}
        </div>
    )
}