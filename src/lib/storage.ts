import { Form, FormResponse } from '@/types';
import { jsonbinStorage } from './jsonbin-storage';

// Legacy localStorage key for backward compatibility during migration
const FORMS_KEY = 'formify_forms';
const RESPONSES_KEY = 'formify_responses';

// This is the main storage interface that should be used throughout the app
export const storage = {
  // Forms
  getForms: async (): Promise<Form[]> => {
    // Return empty array - forms are now managed individually in JSONBin
    return [];
  },

  saveForm: async (form: Form): Promise<Form | null> => {
    if (!form.title.trim()) {
      return null;
    }

    try {
      // If this is a new form without an existing JSONBin ID, create it
      const binData = await jsonbinStorage.createForm(form);
      
      // Return the form with the JSONBin ID
      return {
        ...form,
        id: binData.binId
      };
    } catch (error) {
      console.error('Error saving form:', error);
      return null;
    }
  },

  getForm: async (id: string): Promise<Form | null> => {
    if (!id) return null;
    
    try {
      return await jsonbinStorage.getForm(id);
    } catch (error) {
      console.error('Error fetching form:', error);
      return null;
    }
  },

  deleteForm: async (id: string): Promise<boolean> => {
    console.warn('Delete form functionality not implemented for JSONBin - forms are permanent once created');
    return false;
  },

  // Responses
  getResponses: async (formId?: string): Promise<FormResponse[]> => {
    if (!formId) return [];
    
    try {
      return await jsonbinStorage.getResponses(formId);
    } catch (error) {
      console.error('Error fetching responses:', error);
      return [];
    }
  },

  saveResponse: async (response: FormResponse): Promise<FormResponse | null> => {
    try {
      const success = await jsonbinStorage.saveResponse(response.formId, response);
      return success ? response : null;
    } catch (error) {
      console.error('Error saving response:', error);
      return null;
    }
  },

  // Utility functions
  generateId: (): string => {
    return jsonbinStorage.generateId();
  },

  calculateScore: (responses: Record<string, string | string[]>, form: Form): { score: number; maxScore: number } => {
    return jsonbinStorage.calculateScore(responses, form);
  },

  exportToCSV: (responses: FormResponse[], form: Form): string => {
    return jsonbinStorage.exportToCSV(responses, form);
  },

  // Legacy localStorage functions for backward compatibility during development
  // These will be removed once migration is complete
  
  // Form-based sharing functions
  encodeFormForSharing: (form: Form): string => {
    try {
      const formData = JSON.stringify(form);
      const encoded = btoa(formData);
      return encoded;
    } catch (error) {
      console.error('Error encoding form:', error);
      return '';
    }
  },

  decodeFormFromSharing: (encodedData: string): Form | null => {
    try {
      const decoded = atob(encodedData);
      const form = JSON.parse(decoded);
      
      // Ensure all required properties exist with defaults
      const processedForm = {
        ...form,
        id: storage.generateId(), // Generate new ID to avoid conflicts
        theme: form.theme || 'default',
        accentColor: form.accentColor || '#22c55e',
        backgroundStyle: form.backgroundStyle || 'gradient',
        backgroundColor: form.backgroundColor || '#000000',
        mode: form.mode || 'standard',
        passingMark: form.passingMark || 70
      };

      return processedForm;
    } catch (error) {
      console.error('Error decoding form:', error);
      return null;
    }
  },

  // File-based sharing functions
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
          // Ensure all required properties exist with defaults
          const processedForm = {
            ...form,
            id: storage.generateId(), // Generate new ID to avoid conflicts
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

// Legacy localStorage interface for backward compatibility
// This will be removed once all components are migrated
const legacyStorage = {
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
    const forms = legacyStorage.getForms();
    const existingIndex = forms.findIndex(f => f.id === form.id);
    
    if (existingIndex >= 0) {
      forms[existingIndex] = form;
    } else {
      forms.push(form);
    }
    
    localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
  },

  getForm: (id: string): Form | null => {
    const forms = legacyStorage.getForms();
    return forms.find(f => f.id === id) || null;
  },

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
    const responses = legacyStorage.getResponses();
    responses.push(response);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
  }
};

// Export both interfaces for migration period
export { legacyStorage };