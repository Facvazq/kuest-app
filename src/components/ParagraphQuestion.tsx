'use client';

import { QuestionComponentProps } from '@/types';

export default function ParagraphQuestion({ question, value, onChange, disabled }: QuestionComponentProps) {
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
      
      <textarea
        value={value as string || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        placeholder="Enter your answer..."
        style={{ 
          borderColor: question.accentColor && !disabled ? question.accentColor : undefined,
          '--tw-ring-color': question.accentColor && !disabled ? question.accentColor : undefined
        } as React.CSSProperties}
      />
    </div>
  );
}
