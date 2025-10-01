import { Form, FormResponse } from '@/types';

const FORMS_KEY = 'formify_forms';
const RESPONSES_KEY = 'formify_responses';

export const storage = {
  // Forms
  getForms: (): Form[] => {
    if (typeof window === 'undefined') return [];
    const forms = localStorage.getItem(FORMS_KEY);
    const parsedForms = forms ? JSON.parse(forms) : [];
    
    // Ensure all forms have the new properties with defaults
    return parsedForms.map((form: any) => ({
      ...form,
      theme: form.theme || 'default',
      accentColor: form.accentColor || '#22c55e',
      backgroundStyle: form.backgroundStyle || 'gradient',
      backgroundColor: form.backgroundColor || '#000000',
      mode: form.mode || 'standard',
      passingMark: form.passingMark || 70
    }));
  },

  saveForm: (form: Form): void => {
    if (typeof window === 'undefined') return;
    const forms = storage.getForms();
    const existingIndex = forms.findIndex(f => f.id === form.id);
    
    if (existingIndex >= 0) {
      forms[existingIndex] = form;
    } else {
      forms.push(form);
    }
    
    localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
  },

  getForm: (id: string): Form | null => {
    const forms = storage.getForms();
    return forms.find(f => f.id === id) || null;
  },

  deleteForm: (id: string): void => {
    if (typeof window === 'undefined') return;
    const forms = storage.getForms();
    const filteredForms = forms.filter(f => f.id !== id);
    localStorage.setItem(FORMS_KEY, JSON.stringify(filteredForms));
  },

  // Responses
  getResponses: (formId?: string): FormResponse[] => {
    if (typeof window === 'undefined') return [];
    const responses = localStorage.getItem(RESPONSES_KEY);
    const allResponses = responses ? JSON.parse(responses) : [];
    
    if (formId) {
      return allResponses.filter((r: FormResponse) => r.formId === formId);
    }
    
    return allResponses;
  },

  saveResponse: (response: FormResponse): void => {
    if (typeof window === 'undefined') return;
    const responses = storage.getResponses();
    responses.push(response);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
  },

  // Utility
  generateId: (): string => {
    return Math.random().toString(36).substr(2, 9);
  },

  exportToCSV: (responses: FormResponse[], form: Form): string => {
    if (responses.length === 0) return '';

    let headers = ['Submission Date'];
    
    if (form.mode === 'questionnaire') {
      headers.push('Student Name', 'Preliminary Score', 'Final Score', 'Max Score');
    }
    
    headers.push(...form.questions.map(q => q.title));
    
    const rows = responses.map(response => {
      const row = [new Date(response.submittedAt).toLocaleString()];
      
      if (form.mode === 'questionnaire') {
        row.push(
          response.studentName || '',
          response.preliminaryScore?.toString() || '',
          response.finalScore?.toString() || '',
          response.maxScore?.toString() || ''
        );
      }
      
      form.questions.forEach(question => {
        const value = response.responses[question.id];
        if (Array.isArray(value)) {
          row.push(value.join(', '));
        } else {
          row.push(value || '');
        }
      });
      return row;
    });

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return csvContent;
  },

  calculateScore: (responses: Record<string, string | string[]>, form: Form): { score: number; maxScore: number } => {
    if (form.mode !== 'questionnaire') return { score: 0, maxScore: 0 };

    let score = 0;
    let maxScore = 0;

    form.questions.forEach(question => {
      if ((question.type === 'multiple-choice' || question.type === 'checkbox') && question.correctAnswer && question.points) {
        maxScore += question.points;
        const userAnswer = responses[question.id];
        
        if (question.type === 'multiple-choice') {
          // Handle multiple choice with multiple correct answers
          if (Array.isArray(question.correctAnswer)) {
            // Multiple correct answers - user must select all correct answers
            const correctAnswers = question.correctAnswer;
            const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
            
            // Check if user selected exactly the correct answers (no more, no less)
            const correctCount = correctAnswers.filter(ans => userAnswers.includes(ans)).length;
            const incorrectCount = userAnswers.filter(ans => !correctAnswers.includes(ans)).length;
            
            if (correctCount === correctAnswers.length && incorrectCount === 0) {
              score += question.points;
            }
          } else {
            // Single correct answer (backward compatibility)
            if (userAnswer === question.correctAnswer) {
              score += question.points;
            }
          }
        } else if (question.type === 'checkbox') {
          // Handle checkbox questions - user must select all correct answers
          if (Array.isArray(question.correctAnswer)) {
            const correctAnswers = question.correctAnswer;
            const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
            
            // Check if user selected exactly the correct answers (no more, no less)
            const correctCount = correctAnswers.filter(ans => userAnswers.includes(ans)).length;
            const incorrectCount = userAnswers.filter(ans => !correctAnswers.includes(ans)).length;
            
            if (correctCount === correctAnswers.length && incorrectCount === 0) {
              score += question.points;
            }
          }
        }
      }
    });

    return { score, maxScore };
  }
};
