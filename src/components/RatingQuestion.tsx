'use client';

import { QuestionComponentProps } from '@/types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function RatingQuestion({ question, value, onChange, disabled }: QuestionComponentProps) {
  const rating = parseInt(value as string) || 0;
  const maxRating = question.ratingScale || 5;

  const handleRatingClick = (newRating: number) => {
    if (disabled) return;
    onChange(newRating.toString());
  };

  return (
    <div className="space-y-3">
      <label className="block text-lg font-semibold text-gray-900 dark:text-white">
        {question.emoji && <span className="mr-2">{question.emoji}</span>}
        {question.title}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {question.helpText && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{question.helpText}</p>
      )}

      <div className="flex items-center space-x-2">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          
          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => handleRatingClick(starValue)}
              disabled={disabled}
              className={`p-1 transition-colors duration-200 ${
                disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'
              }`}
              whileHover={!disabled ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.95 } : {}}
            >
              <Star
                className={`w-10 h-10 ${
                  isFilled
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                style={{ 
                  color: isFilled && question.accentColor && !disabled ? question.accentColor : undefined
                }}
              />
            </motion.button>
          );
        })}
      </div>
      
      {rating > 0 && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400 font-medium"
        >
          {rating} out of {maxRating} stars
        </motion.p>
      )}
    </div>
  );
}
