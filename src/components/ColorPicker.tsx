'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  className?: string;
}

const colors = [
  '#3b82f6', // Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f59e0b', // Orange
  '#10b981', // Emerald
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6366f1', // Indigo
  '#14b8a6', // Teal
  '#a855f7', // Violet
];

export default function ColorPicker({ selectedColor, onColorSelect, className = '' }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
        style={{ backgroundColor: selectedColor }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Pick color"
      >
        <Palette className="w-5 h-5 text-white drop-shadow-sm" />
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => {
                      onColorSelect(color);
                      setIsOpen(false);
                    }}
                    className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-gray-900 dark:border-white scale-110'
                        : 'border-gray-200 dark:border-gray-600 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
