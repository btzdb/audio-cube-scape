import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  url?: string | null;
  username: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ url, username, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  if (url) {
    return (
      <img
        src={url}
        alt={username}
        className={cn(
          "rounded-full object-cover",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-purple-500/20 flex items-center justify-center font-medium text-purple-200",
        sizeClasses[size],
        className
      )}
    >
      {username[0].toUpperCase()}
    </div>
  );
}