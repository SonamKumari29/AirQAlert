"use client";

import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="p-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
      >
        <Wind className="h-8 w-8 text-white" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 dark:text-gray-400"
      >
        Loading air quality data...
      </motion.p>
    </div>
  );
}