import React from 'react';
import { Upload, Image, Music } from 'lucide-react';
import { useVisualizer } from '../contexts/VisualizerContext';
import { AudioUpload } from './audio/AudioUpload';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onImageSelect: (file: File, type: 'background' | 'bump') => void;
}

export function FileUpload({ onFileSelect, onImageSelect }: FileUploadProps) {
  const { settings, updateSettings } = useVisualizer();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      onFileSelect(file);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'background' | 'bump') => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file, type);
      const imageUrl = URL.createObjectURL(file);
      
      if (type === 'background') {
        updateSettings({
          ...settings,
          background: {
            ...settings.background,
            type: 'image',
            imageUrl,
          },
        });
      } else {
        updateSettings({
          ...settings,
          imageBump: {
            ...settings.imageBump,
            enabled: true,
            imageUrl,
          },
        });
      }
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Upload Audio</h3>
        <AudioUpload 
          onUploadComplete={(url) => {
            // Handle the uploaded audio URL
            console.log('Audio uploaded:', url);
          }}
          onUploadError={(error) => {
            console.error('Audio upload error:', error);
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="relative group">
          <label className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors flex items-center gap-2">
            <Image size={20} />
            <span className="text-sm">Background</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'background')}
            />
          </label>
        </div>

        <div className="relative group">
          <label className="p-2 hover:bg-white/10 rounded-full cursor-pointer transition-colors flex items-center gap-2">
            <Music size={20} />
            <span className="text-sm">Bump Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, 'bump')}
            />
          </label>
        </div>
      </div>
    </div>
  );
}