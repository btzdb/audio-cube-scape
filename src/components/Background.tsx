import React from 'react';
import { motion } from 'framer-motion';

export function Background() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-0"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.1),transparent_50%)]" />
    </motion.div>
  );
}