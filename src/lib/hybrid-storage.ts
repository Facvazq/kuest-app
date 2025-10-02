import { Form, FormResponse } from '@/types';
import { storage } from './storage';

// JSONBin is now the primary and only storage method
// This file serves as the main interface for storage operations

export const hybridStorage = {
  // Forms - all operations now use JSONBin via storage.ts
  getForms: async (userId?: string): Promise<Form[]> => {
    console.log('📋 Loading forms from JSONBin storage');
    return await storage.getForms();
  },

  saveForm: async (form: Form, userId?: string): Promise<Form | null> => {
    console.log('💾 Saving form to JSONBin:', form.title);
    return await storage.saveForm(form);
  },

  getForm: async (id: string): Promise<Form | null> => {
    if (!id) return null;
    console.log('🔍 Fetching form from JSONBin:', id);
    return await storage.getForm(id);
  },

  deleteForm: async (id: string, userId?: string): Promise<boolean> => {
    console.warn('🗑️ Delete form operation not supported with JSONBin - bins are permanent once created');
    return await storage.deleteForm(id);
  },

  // Responses - all operations now use JSONBin via storage.ts
  getResponses: async (formId?: string, userId?: string): Promise<FormResponse[]> => {
    if (!formId) return [];
    console.log('📄 Loading responses from JSONBin:', formId);
    return await storage.getResponses(formId);
  },

  saveResponse: async (response: FormResponse, userId?: string): Promise<FormResponse | null> => {
    console.log('💾 Saving response to JSONBin:', response.id);
    return await storage.saveResponse(response);
  },

  // Utility functions
  generateId: (): string => {
    return storage.generateId();
  },

  calculateScore: (responses: Record<string, string | string[]>, form: Form): { score: number; maxScore: number } => {
    return storage.calculateScore(responses, form);
  },

  // CSV export functionality
  exportToCSV: (responses: FormResponse[], form: Form): string => {
    return storage.exportToCSV(responses, form);
  },

  // Legacy sharing functions (for backward compatibility)
  encodeFormForSharing: (form: Form): string => {
    return storage.encodeFormForSharing(form);
  },

  decodeFormFromSharing: (encodedData: string): Form | null => {
    return storage.decodeFormFromSharing(encodedData);
  },

  exportFormToFile: (form: Form): void => {
    storage.exportFormToFile(form);
  },

  importFormFromFile: (file: File): Promise<Form | null> => {
    return storage.importFormFromFile(file);
  }
};

// Export storage as well for components that want direct access
export { storage };