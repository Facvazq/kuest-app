import { Form, FormResponse } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_JSONBIN_API_KEY || "";
const BASE_URL = "https://api.jsonbin.io/v3/b";

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
  }
  return response.json();
};

// Helper function to generate unique IDs
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Helper function to calculate scores for questionnaire mode
const calculateScore = (responses: Record<string, string | string[]>, form: Form): { score: number; maxScore: number } => {
  let score = 0;
  let maxScore = 0;

  form.questions.forEach(question => {
    if (question.type === 'checkbox' && question.correctAnswer && question.points) {
      const selectedAnswers = responses[question.id] as string[];
      const correctAnswers = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer 
        : [question.correctAnswer];
      
      maxScore += question.points;
      
      // Check all selected answers
      const allSelectedCorrect = selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every(answer => correctAnswers.includes(answer));
      
      if (allSelectedCorrect) {
        score += question.points;
      }
    } else if (question.type === 'multiple-choice' && question.correctAnswer && question.points) {
      const selectedAnswer = responses[question.id] as string;
      const correctAnswer = Array.isArray(question.correctAnswer) 
        ? question.correctAnswer[0] 
        : question.correctAnswer;
      
      maxScore += question.points;
      
      if (selectedAnswer === correctAnswer) {
        score += question.points;
      }
    } else if (question.type === 'text' && question.correctAnswer && question.points) {
      const selectedAnswer = responses[question.id] as string;
      
      maxScore += question.points;
      
      if (selectedAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
        score += question.points;
      }
    }
  });

  return { score, maxScore };
};

export const jsonbinStorage = {
  // Utility functions
  generateId,

  calculateScore,

  // Create a new form
  createForm: async (formData: Form): Promise<Form | null> => {
    if (!API_KEY) {
      throw new Error('JSONBin API key not configured. Please set NEXT_PUBLIC_JSONBIN_API_KEY environment variable.');
    }

    const binId = generateId();
    const response = await fetch(`${BASE_URL}/${binId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify({
        type: 'form',
        formData,
        responses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });

    const result = await handleResponse(response);
    
    // Return the form with the JSONBin ID
    return {
      ...formData,
      id: binId
    };
  },

  // Get form by ID
  getForm: async (id: string): Promise<Form | null> => {
    if (!API_KEY) {
      throw new Error('JSONBin API key not configured. Please set NEXT_PUBLIC_JSONBIN_API_KEY environment variable.');
    }

    try {
      const response = await fetch(`${BASE_URL}/${id}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });

      const result = await handleResponse(response);
      
      if (result.record?.type === 'form') {
        return result.record.formData;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching form from JSONBin:', error);
      return null;
    }
  },

  // Update form (for responses)
  updateForm: async (id: string, updatedData: {
    formData?: Form;
    responses?: FormResponse[];
    [key: string]: any;
  }): Promise<boolean> => {
    if (!API_KEY) {
      throw new Error('JSONBin API key not configured. Please set NEXT_PUBLIC_JSONBIN_API_KEY environment variable.');
    }

    try {
      // First get current data
      const currentResponse = await fetch(`${BASE_URL}/${id}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });

      const currentResult = await handleResponse(currentResponse);
      const currentRecord = currentResult.record;

      // Merge with updated data
      const updatedRecord = {
        ...currentRecord,
        ...updatedData,
        updatedAt: new Date().toISOString()
      };

      // Update the bin
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify(updatedRecord)
      });

      await handleResponse(response);
      return true;
    } catch (error) {
      console.error('Error updating form in JSONBin:', error);
      return false;
    }
  },

  // Save response to form
  saveResponse: async (id: string, response: FormResponse): Promise<boolean> => {
    try {
      // Get current data
      const currentResponse = await fetch(`${BASE_URL}/${id}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });

      const currentResult = await handleResponse(currentResponse);
      const currentRecord = currentResult.record;

      // Add new response to responses array
      const updatedResponses = [
        ...(currentRecord.responses || []),
        response
      ];

      // Update the record
      return await jsonbinStorage.updateForm(id, { responses: updatedResponses });
    } catch (error) {
      console.error('Error saving response to JSONBin:', error);
      return false;
    }
  },

  // Get responses for a form
  getResponses: async (id: string): Promise<FormResponse[]> => {
    try {
      const response = await fetch(`${BASE_URL}/${id}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': API_KEY
        }
      });

      const result = await handleResponse(response);
      
      if (result.record?.type === 'form') {
        return result.record.responses || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching responses from JSONBin:', error);
      return [];
    }
  },

  // Export responses to CSV
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
  }
};
