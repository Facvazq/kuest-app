import { supabase, DatabaseForm, DatabaseFormResponse } from './supabase';
import { Form, FormResponse } from '@/types';

// Convert Form to DatabaseForm
const formToDatabase = (form: Form, userId?: string): Omit<DatabaseForm, 'id' | 'created_at' | 'updated_at'> => ({
  title: form.title,
  description: form.description,
  questions: form.questions,
  theme: form.theme,
  accent_color: form.accentColor,
  background_style: form.backgroundStyle,
  background_color: form.backgroundColor || '#000000',
  mode: form.mode,
  passing_mark: form.passingMark || 70,
  user_id: userId || undefined,
  is_public: true, // Default to public for easy sharing
});

// Convert DatabaseForm to Form
const databaseToForm = (dbForm: DatabaseForm): Form => ({
  id: dbForm.id,
  title: dbForm.title,
  description: dbForm.description,
  questions: dbForm.questions,
  createdAt: dbForm.created_at,
  updatedAt: dbForm.updated_at,
  theme: dbForm.theme as any,
  accentColor: dbForm.accent_color,
  backgroundStyle: dbForm.background_style as any,
  backgroundColor: dbForm.background_color,
  mode: dbForm.mode as any,
  passingMark: dbForm.passing_mark,
});

// Convert FormResponse to DatabaseFormResponse
const responseToDatabase = (response: FormResponse, userId?: string): Omit<DatabaseFormResponse, 'id' | 'submitted_at'> => ({
  form_id: response.formId,
  responses: response.responses,
  student_name: response.studentName,
  preliminary_score: response.preliminaryScore,
  final_score: response.finalScore,
  max_score: response.maxScore,
  user_id: userId || undefined,
});

// Convert DatabaseFormResponse to FormResponse
const databaseToResponse = (dbResponse: DatabaseFormResponse): FormResponse => ({
  id: dbResponse.id,
  formId: dbResponse.form_id,
  responses: dbResponse.responses,
  submittedAt: dbResponse.submitted_at,
  studentName: dbResponse.student_name,
  preliminaryScore: dbResponse.preliminary_score,
  finalScore: dbResponse.final_score,
  maxScore: dbResponse.max_score,
});

export const supabaseStorage = {
  // Forms
  getForms: async (userId?: string): Promise<Form[]> => {
    try {
      let query = supabase
        .from('forms')
        .select('*')
        .order('updated_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('is_public', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching forms:', error);
        return [];
      }

      return data.map(databaseToForm);
    } catch (error) {
      console.error('Error fetching forms:', error);
      return [];
    }
  },

  saveForm: async (form: Form, userId?: string): Promise<Form | null> => {
    try {
      const formData = formToDatabase(form, userId);
      
      let query;
      if (form.id && form.id.length > 0) {
        // Update existing form
        query = supabase
          .from('forms')
          .update(formData)
          .eq('id', form.id)
          .select()
          .single();
      } else {
        // Create new form
        query = supabase
          .from('forms')
          .insert([formData])
          .select()
          .single();
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error saving form:', error);
        return null;
      }

      return databaseToForm(data);
    } catch (error) {
      console.error('Error saving form:', error);
      return null;
    }
  },

  getForm: async (id: string): Promise<Form | null> => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching form:', error);
        return null;
      }

      return databaseToForm(data);
    } catch (error) {
      console.error('Error fetching form:', error);
      return null;
    }
  },

  deleteForm: async (id: string, userId?: string): Promise<boolean> => {
    try {
      let query = supabase
        .from('forms')
        .delete()
        .eq('id', id);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { error } = await query;

      if (error) {
        console.error('Error deleting form:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      return false;
    }
  },

  // Responses
  getResponses: async (formId?: string, userId?: string): Promise<FormResponse[]> => {
    try {
      let query = supabase
        .from('form_responses')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (formId) {
        query = query.eq('form_id', formId);
      }

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching responses:', error);
        return [];
      }

      return data.map(databaseToResponse);
    } catch (error) {
      console.error('Error fetching responses:', error);
      return [];
    }
  },

  saveResponse: async (response: FormResponse, userId?: string): Promise<FormResponse | null> => {
    try {
      const responseData = responseToDatabase(response, userId);
      
      const { data, error } = await supabase
        .from('form_responses')
        .insert([responseData])
        .select()
        .single();

      if (error) {
        console.error('Error saving response:', error);
        return null;
      }

      return databaseToResponse(data);
    } catch (error) {
      console.error('Error saving response:', error);
      return null;
    }
  },

  // Utility functions
  generateId: (): string => {
    return Math.random().toString(36).substr(2, 9);
  },

  // Keep the existing utility functions for backward compatibility
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
          if (Array.isArray(question.correctAnswer)) {
            const correctAnswers = question.correctAnswer;
            const userAnswers = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
            
            const correctCount = correctAnswers.filter(ans => userAnswers.includes(ans)).length;
            const incorrectCount = userAnswers.filter(ans => !correctAnswers.includes(ans)).length;
            
            if (correctCount === correctAnswers.length && incorrectCount === 0) {
              score += question.points;
            }
          } else {
            if (userAnswer === question.correctAnswer) {
              score += question.points;
            }
          }
        } else if (question.type === 'checkbox') {
          if (Array.isArray(question.correctAnswer)) {
            const correctAnswers = question.correctAnswer;
            const userAnswers = Array.isArray(userAnswer) ? userAnswer : [];
            
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
  },

  // URL-based sharing functions (keep for backward compatibility)
  encodeFormToUrl: (form: Form): string => {
    try {
      const formData = JSON.stringify(form);
      const encoded = btoa(encodeURIComponent(formData));
      return encoded;
    } catch (error) {
      console.error('Error encoding form:', error);
      return '';
    }
  },

  decodeFormFromUrl: (encodedData: string): Form | null => {
    try {
      const decoded = decodeURIComponent(atob(encodedData));
      const form = JSON.parse(decoded);
      
      return {
        ...form,
        theme: form.theme || 'default',
        accentColor: form.accentColor || '#22c55e',
        backgroundStyle: form.backgroundStyle || 'gradient',
        backgroundColor: form.backgroundColor || '#000000',
        mode: form.mode || 'standard',
        passingMark: form.passingMark || 70
      };
    } catch (error) {
      console.error('Error decoding form:', error);
      return null;
    }
  },

  // File-based sharing functions (keep for backward compatibility)
  exportFormToFile: (form: Form): void => {
    try {
      const formData = JSON.stringify(form, null, 2);
      const blob = new Blob([formData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${form.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting form:', error);
    }
  },

  importFormFromFile: (file: File): Promise<Form | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const form = JSON.parse(e.target?.result as string);
          const processedForm = {
            ...form,
            id: supabaseStorage.generateId(),
            theme: form.theme || 'default',
            accentColor: form.accentColor || '#22c55e',
            backgroundStyle: form.backgroundStyle || 'gradient',
            backgroundColor: form.backgroundColor || '#000000',
            mode: form.mode || 'standard',
            passingMark: form.passingMark || 70
          };
          resolve(processedForm);
        } catch (error) {
          console.error('Error importing form:', error);
          resolve(null);
        }
      };
      reader.readAsText(file);
    });
  }
};
