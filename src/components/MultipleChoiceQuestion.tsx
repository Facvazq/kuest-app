'use client';

import { QuestionComponentProps } from '@/types';

export default function MultipleChoiceQuestion({ question, value, onChange, disabled, themeStyles }: QuestionComponentProps) {
  const handleOptionChange = (option: string) => {
    // Check if this question allows multiple answers (has multiple correct answers)
    const allowsMultiple = Array.isArray(question.correctAnswer) && question.correctAnswer.length > 1;
    
    if (allowsMultiple) {
      // Multiple choice with multiple answers - use checkboxes
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(option)) {
        onChange(currentValues.filter(v => v !== option));
      } else {
        onChange([...currentValues, option]);
      }
    } else {
      // Single answer - use radio buttons
      onChange(option);
    }
  };

  const allowsMultiple = Array.isArray(question.correctAnswer) && question.correctAnswer.length > 1;

  return (
    <div className="space-y-3">
      <label className={`block text-lg font-semibold ${themeStyles?.text || 'text-gray-900 dark:text-white'}`}>
        {question.emoji && <span className="mr-2">{question.emoji}</span>}
        {question.title}
        {question.required && <span className="text-red-500 ml-1">*</span>}
        {allowsMultiple && <span className="text-sm text-blue-500 ml-2">(Select all that apply)</span>}
      </label>
      
      {question.helpText && (
        <p className={`text-sm ${themeStyles?.textSecondary || 'text-gray-600 dark:text-gray-400'}`}>{question.helpText}</p>
      )}
      
      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type={allowsMultiple ? "checkbox" : "radio"}
              name={question.id}
              value={option}
              checked={allowsMultiple ? (Array.isArray(value) ? value.includes(option) : false) : (value === option)}
              onChange={() => handleOptionChange(option)}
              disabled={disabled}
              className={`h-5 w-5 ${themeStyles?.accent || 'text-blue-600'} focus:ring-blue-500 border-gray-300 dark:border-gray-600 disabled:cursor-not-allowed`}
              style={{ 
                accentColor: question.accentColor && !disabled ? question.accentColor : undefined
              }}
            />
            <span className={`text-gray-900 dark:text-white font-medium ${themeStyles?.text || ''}`}>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
