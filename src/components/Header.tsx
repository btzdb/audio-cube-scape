import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { AuthModal } from './auth/AuthModal';
import { Icons } from '@/components/icons';
import { Avatar } from '@/components/ui/Avatar';
import { supabase } from '@/integrations/supabase/client';

export function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { profile, isLoading } = useProfile();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/20 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icons.Music2 size={24} className="text-purple-500" />
          <span className="text-xl font-bold">BeatStore</span>
        </div>

        <div className="flex items-center gap-4">
          {profile ? (
            <div className="flex items-center gap-4">
              <Avatar
                imageUrl={profile.avatar_url}
                username={profile.username}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                Sign Out
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAuthOpen(true)}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </motion.header>
  );
}