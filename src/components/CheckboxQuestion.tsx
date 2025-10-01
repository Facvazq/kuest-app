'use client';

import { QuestionComponentProps } from '@/types';

export default function CheckboxQuestion({ question, value, onChange, disabled }: QuestionComponentProps) {
  const selectedValues = (value as string[]) || [];

  const handleOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, option]);
    } else {
      onChange(selectedValues.filter(v => v !== option));
    }
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
      
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type="checkbox"
              value={option}
              checked={selectedValues.includes(option)}
              onChange={(e) => handleOptionChange(option, e.target.checked)}
              disabled={disabled}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded disabled:cursor-not-allowed"
              style={{ 
                accentColor: question.accentColor && !disabled ? question.accentColor : undefined
              }}
            />
            <span className="text-gray-900 dark:text-white font-medium">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
