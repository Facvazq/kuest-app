'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Settings, Eye, Palette, Home } from 'lucide-react';
import { Form, Question } from '@/types';
import { storage } from '@/lib/storage';
import QuestionRenderer from '@/components/QuestionRenderer';
import EmojiPicker from '@/components/EmojiPicker';
import ColorPicker from '@/components/ColorPicker';
import ThemeToggle from '@/components/ThemeToggle';

export default function FormBuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formId = searchParams.get('id');

  const [form, setForm] = useState<Form>({
    id: '',
    title: '',
    description: '',
    questions: [],
    createdAt: '',
    updatedAt: '',
    theme: 'light',
    accentColor: '#3b82f6',
    backgroundStyle: 'solid',
    backgroundColor: '#ffffff',
    mode: 'standard',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showFormSettings, setShowFormSettings] = useState(false);

  useEffect(() => {
    if (formId) {
      const existingForm = storage.getForm(formId);
      if (existingForm) {
        setForm(existingForm);
        setIsEditing(true);
      }
    } else {
      // New form
      const newForm = {
        id: storage.generateId(),
        title: '',
        description: '',
        questions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        theme: 'default' as 'light' | 'dark' | 'default' | 'electric' | 'warm' | 'royal',
        accentColor: '#22c55e',
        backgroundStyle: 'gradient' as 'solid' | 'gradient' | 'pattern',
        backgroundColor: '#000000',
        mode: 'standard' as 'standard' | 'questionnaire',
        passingMark: 70,
      };
      setForm(newForm);
      // Save the form immediately so it can be accessed by themes page
      storage.saveForm(newForm);
    }
  }, [formId]);

  // Reload form when component mounts (e.g., returning from themes page)
  useEffect(() => {
    if (formId) {
      const existingForm = storage.getForm(formId);
      if (existingForm) {
        setForm(existingForm);
      }
    }
  }, [formId]);

  const handleSaveForm = () => {
    if (!form.title.trim()) {
      alert('Please enter a form title');
      return;
    }

    const updatedForm = {
      ...form,
      updatedAt: new Date().toISOString(),
    };

    storage.saveForm(updatedForm);
    alert('Form saved successfully!');
    router.push('/dashboard');
  };

  const handleAddQuestion = (type: Question['type']) => {
    // In questionnaire mode, allow multiple choice and checkbox questions
    if (form.mode === 'questionnaire' && type !== 'multiple-choice' && type !== 'checkbox') {
      alert('In Questionnaire Mode, only multiple choice and checkbox questions are allowed.');
      return;
    }

    const newQuestion: Question = {
      id: storage.generateId(),
      type,
      title: '',
      emoji: '',
      required: false,
      helpText: '',
      accentColor: form.accentColor,
      options: type === 'multiple-choice' || type === 'checkbox' ? [''] : undefined,
      ratingScale: type === 'rating' ? 5 : undefined,
      correctAnswer: form.mode === 'questionnaire' ? '' : undefined,
      points: form.mode === 'questionnaire' ? 1 : undefined,
    };

    setEditingQuestion(newQuestion);
    setShowQuestionForm(true);
  };

  const handleSaveQuestion = (question: Question) => {
    if (!question.title.trim()) {
      alert('Please enter a question title');
      return;
    }

    if ((question.type === 'multiple-choice' || question.type === 'checkbox') && 
        (!question.options || question.options.length === 0 || question.options.every(opt => !opt.trim()))) {
      alert('Please add at least one option');
      return;
    }

    const updatedQuestions = [...form.questions];
    const existingIndex = updatedQuestions.findIndex(q => q.id === question.id);

    if (existingIndex >= 0) {
      updatedQuestions[existingIndex] = question;
    } else {
      updatedQuestions.push(question);
    }

    setForm({ ...form, questions: updatedQuestions });
    setShowQuestionForm(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setForm({
        ...form,
        questions: form.questions.filter(q => q.id !== questionId),
      });
    }
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const QuestionForm = () => {
    const [question, setQuestion] = useState<Question>(editingQuestion || {
      id: storage.generateId(),
      type: form.mode === 'questionnaire' ? 'multiple-choice' : 'text',
      title: '',
      emoji: '',
      required: false,
      helpText: '',
      accentColor: form.accentColor,
      options: [''],
      correctAnswer: form.mode === 'questionnaire' ? '' : undefined,
      points: form.mode === 'questionnaire' ? 1 : undefined,
    });

    const handleOptionChange = (index: number, value: string) => {
      if (!question.options) return;
      const newOptions = [...question.options];
      newOptions[index] = value;
      setQuestion({ ...question, options: newOptions });
    };

    const addOption = () => {
      if (!question.options) return;
      setQuestion({ ...question, options: [...question.options, ''] });
    };

    const removeOption = (index: number) => {
      if (!question.options || question.options.length <= 1) return;
      const newOptions = question.options.filter((_, i) => i !== index);
      setQuestion({ ...question, options: newOptions });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add Question</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Question Type</label>
              <select
                value={question.type}
                onChange={(e) => setQuestion({ ...question, type: e.target.value as Question['type'] })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={form.mode === 'questionnaire'}
              >
                <option value="text">Short Text</option>
                <option value="paragraph">Paragraph</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="checkbox">Checkboxes</option>
                <option value="rating">Rating Scale</option>
              </select>
              {form.mode === 'questionnaire' && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  Only multiple choice questions are allowed in Questionnaire Mode
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Question Title</label>
              <input
                type="text"
                value={question.title}
                onChange={(e) => setQuestion({ ...question, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter question title"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emoji</label>
                <EmojiPicker
                  onEmojiSelect={(emoji) => setQuestion({ ...question, emoji })}
                  selectedEmoji={question.emoji}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accent Color</label>
                <ColorPicker
                  selectedColor={question.accentColor || form.accentColor}
                  onColorSelect={(color) => setQuestion({ ...question, accentColor: color })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Help Text (Optional)</label>
              <input
                type="text"
                value={question.helpText || ''}
                onChange={(e) => setQuestion({ ...question, helpText: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Additional help or instructions"
              />
            </div>

            {(question.type === 'multiple-choice' || question.type === 'checkbox') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options</label>
                {question.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={`Option ${index + 1}`}
                    />
                    {question.options && question.options.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeOption(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    )}
                  </div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addOption}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  + Add Option
                </motion.button>
              </div>
            )}

            {form.mode === 'questionnaire' && (question.type === 'multiple-choice' || question.type === 'checkbox') && question.options && question.options.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correct Answer{question.type === 'multiple-choice' ? 's' : ''}
                </label>
                {question.type === 'multiple-choice' ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select all correct answers (multiple answers allowed):
                    </p>
                    {question.options.map((option, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={Array.isArray(question.correctAnswer) ? question.correctAnswer.includes(option) : false}
                          onChange={(e) => {
                            const currentAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
                            if (e.target.checked) {
                              setQuestion({ ...question, correctAnswer: [...currentAnswers, option] });
                            } else {
                              setQuestion({ ...question, correctAnswer: currentAnswers.filter(ans => ans !== option) });
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Select all correct answers:
                    </p>
                    {question.options.map((option, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={Array.isArray(question.correctAnswer) ? question.correctAnswer.includes(option) : false}
                          onChange={(e) => {
                            const currentAnswers = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
                            if (e.target.checked) {
                              setQuestion({ ...question, correctAnswer: [...currentAnswers, option] });
                            } else {
                              setQuestion({ ...question, correctAnswer: currentAnswers.filter(ans => ans !== option) });
                            }
                          }}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {form.mode === 'questionnaire' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Points</label>
                <input
                  type="number"
                  min="1"
                  value={question.points || 1}
                  onChange={(e) => setQuestion({ ...question, points: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}

            {question.type === 'rating' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating Scale</label>
                <select
                  value={question.ratingScale || 5}
                  onChange={(e) => setQuestion({ ...question, ratingScale: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={3}>3 stars</option>
                  <option value={4}>4 stars</option>
                  <option value={5}>5 stars</option>
                  <option value={10}>10 stars</option>
                </select>
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                checked={question.required}
                onChange={(e) => setQuestion({ ...question, required: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="required" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Required question
              </label>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSaveQuestion(question)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Save Question
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
              className="flex-1 glass dark:glass-dark text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </Link>
          <ThemeToggle />
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold kuest-text-gradient mb-2">
              {isEditing ? 'Edit Kuest' : 'Create New Kuest'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Build your kuest with different question types</p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Link href={`/form-builder/themes?id=${form.id || 'new'}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="kuest-glass text-white px-4 py-2 rounded-lg font-semibold hover:bg-kuest-green/20 transition-all duration-300 flex items-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Themes
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveForm}
              className="kuest-gradient text-white px-6 py-2 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Kuest
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Builder */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass dark:glass-dark rounded-2xl p-8"
            >
              {/* Form Details */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Form Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter form title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Form Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter form description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Form Mode</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mode"
                        value="standard"
                        checked={form.mode === 'standard'}
                        onChange={(e) => setForm({ ...form, mode: e.target.value as 'standard' | 'questionnaire' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Standard Form</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="mode"
                        value="questionnaire"
                        checked={form.mode === 'questionnaire'}
                        onChange={(e) => setForm({ ...form, mode: e.target.value as 'standard' | 'questionnaire' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Questionnaire Mode</span>
                    </label>
                  </div>
                  {form.mode === 'questionnaire' && (
                    <div className="mt-4 space-y-4">
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        ⚠️ Questionnaire Mode: Only multiple choice and checkbox questions allowed. Each question needs a correct answer and points.
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Passing Mark (%)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={form.passingMark || 70}
                          onChange={(e) => setForm({ ...form, passingMark: parseInt(e.target.value) || 70 })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="70"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Percentage required to pass (e.g., 70 for 70%)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Questions</h3>
                {form.questions.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {question.emoji && <span className="text-lg">{question.emoji}</span>}
                          <span className="text-sm text-gray-500 dark:text-gray-400">Question {index + 1}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{question.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {question.type.replace('-', ' ')}
                          </span>
                          {question.required && (
                            <span className="text-xs text-red-500 bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        {question.helpText && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{question.helpText}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditQuestion(question)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <QuestionRenderer
                        question={question}
                        value=""
                        onChange={() => {}}
                        disabled={true}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* Add Question Buttons */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {form.mode === 'questionnaire' ? (
                    // Only show multiple choice for questionnaire mode
                    <motion.button
                      onClick={() => handleAddQuestion('multiple-choice')}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                          🔘
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Multiple Choice
                        </span>
                      </div>
                    </motion.button>
                  ) : (
                    // Show all question types for standard mode
                    [
                      { type: 'text', label: 'Short Text', icon: '✏️' },
                      { type: 'paragraph', label: 'Paragraph', icon: '📝' },
                      { type: 'multiple-choice', label: 'Multiple Choice', icon: '🔘' },
                      { type: 'checkbox', label: 'Checkboxes', icon: '☑️' },
                      { type: 'rating', label: 'Rating Scale', icon: '⭐' },
                    ].map((questionType) => (
                      <motion.button
                        key={questionType.type}
                        onClick={() => handleAddQuestion(questionType.type as Question['type'])}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                            {questionType.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {questionType.label}
                          </span>
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass dark:glass-dark rounded-2xl p-6 sticky top-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
                <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              {form.title ? (
                <div className="space-y-4">
                  <div className="text-center pb-4 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{form.title}</h4>
                    {form.description && (
                      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{form.description}</p>
                    )}
                  </div>
                  {form.questions.map((question) => (
                    <div key={question.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <QuestionRenderer
                        question={question}
                        value=""
                        onChange={() => {}}
                        disabled={true}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">Add a title to see preview</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {showQuestionForm && <QuestionForm />}
    </div>
  );
}
