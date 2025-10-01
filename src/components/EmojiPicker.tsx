'use client';

import { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji?: string;
  className?: string;
}

export default function EmojiPickerComponent({ onEmojiSelect, selectedEmoji, className = '' }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Pick emoji"
      >
        {selectedEmoji ? (
          <span className="text-xl">{selectedEmoji}</span>
        ) : (
          <Smile className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme={undefined}
                width={300}
                height={350}
                searchDisabled={false}
                skinTonesDisabled={false}
                previewConfig={{
                  showPreview: false
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
