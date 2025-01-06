import React, { useCallback } from 'react';
import { Upload, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { uploadAudio } from '@/utils/audio/uploadAudio';
import { useToast } from '@/hooks/use-toast';

interface AudioUploadProps {
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: Error) => void;
}

export function AudioUpload({ onUploadComplete, onUploadError }: AudioUploadProps) {
  const { toast } = useToast();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadAudio(file);
      onUploadComplete(url);
      toast({
        title: 'Upload successful',
        description: 'Your audio file has been uploaded.',
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
      onUploadError?.(error);
    }
  }, [onUploadComplete, onUploadError, toast]);

  return (
    <motion.label
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 bg-black/20 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-black/30 transition-colors"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Music className="w-8 h-8 mb-3 text-white/60" />
        <p className="mb-2 text-sm text-white/80">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-white/60">MP3, WAV, or OGG (max. 10MB)</p>
      </div>
      <input
        type="file"
        className="hidden"
        accept="audio/*"
        onChange={handleFileChange}
      />
    </motion.label>
  );
}