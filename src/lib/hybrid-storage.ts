import { Form, FormResponse } from '@/types';
import { storage } from './storage';
import { supabaseStorage } from './supabase-storage';

// Check if Supabase is configured
const isSupabaseConfigured = (): boolean => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project-ref.supabase.co' &&
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && 
         process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key-here');
};

export const hybridStorage = {
  // Forms
  getForms: async (userId?: string): Promise<Form[]> => {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStorage.getForms(userId);
      } catch (error) {
        console.warn('Supabase failed, falling back to local storage:', error);
        return storage.getForms();
      }
    }
    return storage.getForms();
  },

  saveForm: async (form: Form, userId?: string): Promise<Form | null> => {
    if (isSupabaseConfigured()) {
      try {
        const savedForm = await supabaseStorage.saveForm(form, userId);
        if (savedForm) {
          // Also save to local storage as backup
          storage.saveForm(savedForm);
          return savedForm;
        }
      } catch (error) {
        console.warn('Supabase failed, falling back to local storage:', error);
      }
    }
    
    // Fallback to local storage
    storage.saveForm(form);
    return form;
  },

  getForm: async (id: string): Promise<Form | null> => {
    if (isSupabaseConfigured()) {
      try {
        const form = await supabaseStorage.getForm(id);
        if (form) {
          return form;
        }
      } catch (error) {
        console.warn('Supabase failed, falling back to local storage:', error);
      }
    }
    
    // Fallback to local storage
    return storage.getForm(id);
  },

  deleteForm: async (id: string, userId?: string): Promise<boolean> => {
    if (isSupabaseConfigured()) {
      try {
        const success = await supabaseStorage.deleteForm(id, userId);
        if (success) {
          // Also delete from local storage
          storage.deleteForm(id);
          return true;
        }
      } catch (error) {
        console.warn('Supabase failed, falling back to local storage:', error);
      }
    }
    
    // Fallback to local storage
    storage.deleteForm(id);
    return true;
  },

  // Responses
  getResponses: async (formId?: string, userId?: string): Promise<FormResponse[]> => {
    if (isSupabaseConfigured()) {
      try {
        return await supabaseStorage.getResponses(formId, userId);
      } catch (error) {
        console.warn('Supabase failed, falling back to local storage:', error);
        return storage.getResponses(formId);
      }
    }
    return storage.getResponses(formId);
  },

  saveResponse: async (response: FormResponse, userId?: string): Promise<FormResponse | null> => {
    if (isSupabaseConfigured()) {
      try {
        const savedResponse = await supabaseStorage.saveResponse(response, userId);
        if (savedResponse) {
          // Also save to local storage as backup
          storage.saveResponse(savedResponse);
          return savedResponse;
        }
      } catch (error) {
        console.warn('Supabase failed, falling back to local storage:', error);
      }
    }
    
    // Fallback to local storage
    storage.saveResponse(response);
    return response;
  },

  // Utility functions (always use local storage for these)
  generateId: (): string => {
    return storage.generateId();
  },

  exportToCSV: (responses: FormResponse[], form: Form): string => {
    return storage.exportToCSV(responses, form);
  },

  calculateScore: (responses: Record<string, string | string[]>, form: Form): { score: number; maxScore: number } => {
    return storage.calculateScore(responses, form);
  },

  // URL-based sharing functions (always use local storage for these)
  encodeFormToUrl: (form: Form): string => {
    return storage.encodeFormToUrl(form);
  },

  decodeFormFromUrl: (encodedData: string): Form | null => {
    return storage.decodeFormFromUrl(encodedData);
  },

  // File-based sharing functions (always use local storage for these)
  exportFormToFile: (form: Form): void => {
    storage.exportFormToFile(form);
  },

  importFormFromFile: (file: File): Promise<Form | null> => {
    return storage.importFormFromFile(file);
  },

  // Check if Supabase is available
  isSupabaseAvailable: (): boolean => {
    return isSupabaseConfigured();
  }
};
