import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AuthError } from '@supabase/supabase-js';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        onClose();
      }
      
      // Clear errors on sign out
      if (event === 'SIGNED_OUT') {
        setError(null);
      }
    });

    // Listen for auth errors
    const handleAuthError = () => {
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (error) {
          console.error('Auth error:', error);
          const errorMessage = getErrorMessage(error);
          setError(errorMessage);
        }
      });
    };

    window.addEventListener('supabase.auth.error', handleAuthError);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('supabase.auth.error', handleAuthError);
    };
  }, [onClose]);

  const getErrorMessage = (error: AuthError): string => {
    const errorMessages: Record<string, string> = {
      'invalid_credentials': 'Invalid email or password. Please check your credentials.',
      'user_not_found': 'No account found with these credentials.',
      'email_not_confirmed': 'Please verify your email before signing in.',
      'invalid_grant': 'Invalid login credentials.',
    };

    return errorMessages[error.message] || error.message;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Sign In</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: '#9333ea',
                        brandAccent: '#a855f7',
                      },
                    },
                  },
                }}
                providers={['google', 'github']}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}