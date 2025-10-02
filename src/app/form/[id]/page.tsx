'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, CheckCircle, AlertCircle } from 'lucide-react';
import { Form, FormResponse } from '@/types';
import { hybridStorage } from '@/lib/hybrid-storage';
import QuestionRenderer from '@/components/QuestionRenderer';

export default function FormViewPage() {
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [studentName, setStudentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preliminaryScore, setPreliminaryScore] = useState<{ score: number; maxScore: number } | null>(null);

  const getThemeStyles = (form: Form) => {
    const accentColor = form.accentColor || '#22c55e';
    
    const themeStyles = {
      default: {
        background: 'kuest-hero-bg',
        card: 'bg-white/10 backdrop-blur-md border border-white/20',
        text: 'text-white',
        textSecondary: 'text-white/80',
        accent: `text-[${accentColor}]`,
        button: 'kuest-gradient',
        border: `border-[${accentColor}]`,
        input: 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50'
      },
      dark: {
        background: 'bg-gradient-to-br from-gray-900 to-black',
        card: 'bg-gray-800/30 backdrop-blur-md border border-gray-700/30',
        text: 'text-white',
        textSecondary: 'text-gray-300',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-gray-800/30 backdrop-blur-md border border-gray-700/30 text-white placeholder-gray-400'
      },
      light: {
        background: 'bg-gradient-to-br from-blue-50 to-indigo-100',
        card: 'bg-white/90 backdrop-blur-md border border-blue-200/30',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-white/90 backdrop-blur-md border border-blue-200/30 text-gray-900 placeholder-gray-500'
      },
      electric: {
        background: 'bg-gradient-to-br from-blue-500 to-purple-600',
        card: 'bg-white/10 backdrop-blur-md border border-white/20',
        text: 'text-white',
        textSecondary: 'text-white/80',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50'
      },
      warm: {
        background: 'bg-gradient-to-br from-orange-400 to-red-500',
        card: 'bg-white/10 backdrop-blur-md border border-white/20',
        text: 'text-white',
        textSecondary: 'text-white/80',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50'
      },
      royal: {
        background: 'bg-gradient-to-br from-purple-600 to-yellow-500',
        card: 'bg-white/10 backdrop-blur-md border border-white/20',
        text: 'text-white',
        textSecondary: 'text-white/80',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50'
      }
    };

    return themeStyles[form.theme] || themeStyles.default;
  };

  useEffect(() => {
    const loadForm = async () => {
      const foundForm = await hybridStorage.getForm(formId);
      if (foundForm) {
        setForm(foundForm);
        // Initialize responses object
        const initialResponses: Record<string, string | string[]> = {};
        foundForm.questions.forEach(question => {
          if (question.type === 'checkbox') {
            initialResponses[question.id] = [];
          } else {
            initialResponses[question.id] = '';
          }
        });
        setResponses(initialResponses);
      } else {
        setError('Form not found');
      }
      setLoading(false);
    };

    loadForm();
  }, [formId]);

  const handleResponseChange = (questionId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form) return;

    // Validate student name for questionnaire mode
    if (form.mode === 'questionnaire' && !studentName.trim()) {
      alert('Please enter your name');
      return;
    }

    // Validate required questions
    const missingRequired = form.questions.filter(question => {
      if (!question.required) return false;
      const response = responses[question.id];
      if (Array.isArray(response)) {
        return response.length === 0;
      }
      return !response || response.toString().trim() === '';
    });

    if (missingRequired.length > 0) {
      alert('Please fill in all required questions');
      return;
    }

    // Calculate score for questionnaire mode
    let calculatedScore = 0;
    let calculatedMaxScore = 0;
    if (form.mode === 'questionnaire') {
      const scoreResult = hybridStorage.calculateScore(responses, form);
      calculatedScore = scoreResult.score;
      calculatedMaxScore = scoreResult.maxScore;
      setPreliminaryScore({ score: calculatedScore, maxScore: calculatedMaxScore });
    }

    // Save response
    const newResponse: FormResponse = {
      id: hybridStorage.generateId(),
      formId: form.id,
      responses,
      submittedAt: new Date().toISOString(),
      studentName: form.mode === 'questionnaire' ? studentName : undefined,
      preliminaryScore: form.mode === 'questionnaire' ? calculatedScore : undefined,
      maxScore: form.mode === 'questionnaire' ? calculatedMaxScore : undefined,
    };

    await hybridStorage.saveResponse(newResponse);
    setSubmitted(true);
  };

  if (loading) {
    const styles = form ? getThemeStyles(form) : { background: 'kuest-hero-bg', text: 'text-white' };
    return (
      <div className={`min-h-screen ${styles.background}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className={styles.text}>Loading form...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !form) {
    const styles = form ? getThemeStyles(form) : { background: 'kuest-hero-bg', text: 'text-white' };
    return (
      <div className={`min-h-screen ${styles.background}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h2 className={`text-2xl font-bold ${styles.text} mb-4`}>
              {error || 'Form not found'}
            </h2>
            <p className={`${styles.text} mb-6`}>
              The form you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Go Home
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    const styles = getThemeStyles(form);
    return (
      <div className={`min-h-screen ${styles.background}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className={`text-2xl font-bold ${styles.text} mb-2`}>
              {form.mode === 'questionnaire' ? 'Quiz Submitted!' : 'Thank You!'}
            </h2>
            {form.mode === 'questionnaire' && preliminaryScore ? (
              <div className="mb-6">
                <div className={`${styles.card} rounded-xl p-6 mb-4 ${styles.border}`}>
                  <div className="text-center">
                    <h3 className={`text-lg font-semibold ${styles.text} mb-2`}>Your Preliminary Score</h3>
                    <div className={`text-4xl font-bold ${styles.accent} mb-2`}>
                      {preliminaryScore.score}/{preliminaryScore.maxScore}
                    </div>
                    <div className={`text-sm ${styles.textSecondary} mb-3`}>
                      {Math.round((preliminaryScore.score / preliminaryScore.maxScore) * 100)}% correct
                    </div>
                    {/* Pass/Fail Status */}
                    {(() => {
                      const percentage = Math.round((preliminaryScore.score / preliminaryScore.maxScore) * 100);
                      const passingMark = form.passingMark || 70;
                      const passed = percentage >= passingMark;
                      
                      return (
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                          passed 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {passed ? '✅ PASSED' : '❌ FAILED'}
                          <span className="ml-2">
                            ({percentage}% vs {passingMark}% required)
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <p className={`${styles.textSecondary} text-center`}>
                  <strong>Note:</strong> This is just a preliminary result. Final grading will be confirmed by your teacher.
                </p>
              </div>
            ) : (
              <p className={`${styles.textSecondary} mb-6`}>
                Your response has been submitted successfully.
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${styles.button} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <Home className="w-4 h-4 mr-2 inline" />
                  Go Home
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${styles.button} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Visit Fac Systems
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getThemeStyles(form).background}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <Link href="/" className={`flex items-center space-x-2 ${getThemeStyles(form).text} hover:opacity-80 transition-colors`}>
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </nav>

        <div className="max-w-2xl mx-auto">
          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${getThemeStyles(form).card} rounded-2xl p-8 mb-8 text-center`}
          >
            <h1 className={`text-4xl font-bold ${getThemeStyles(form).text} mb-4`}>{form.title}</h1>
            {form.description && (
              <p className={`${getThemeStyles(form).textSecondary} text-lg`}>{form.description}</p>
            )}
            {form.mode === 'questionnaire' && (
              <div className={`mt-4 p-4 ${getThemeStyles(form).card} rounded-lg ${getThemeStyles(form).border}`}>
                <p className={`${getThemeStyles(form).text} font-medium`}>📝 Quiz Mode</p>
                <p className={`${getThemeStyles(form).textSecondary} text-sm mt-1`}>Please enter your name and answer all questions</p>
              </div>
            )}
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Name Field for Questionnaire Mode */}
            {form.mode === 'questionnaire' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${getThemeStyles(form).card} rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">👤</span>
                    <label className={`text-lg font-semibold ${getThemeStyles(form).text}`}>
                      What&apos;s your name? <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className={`w-full px-4 py-3 border ${getThemeStyles(form).border} rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 ${getThemeStyles(form).input}`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </motion.div>
            )}

            {form.questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (form.mode === 'questionnaire' ? index + 1 : index) * 0.1 }}
                className={`${getThemeStyles(form).card} rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
              >
                <QuestionRenderer
                  question={question}
                  value={responses[question.id]}
                  onChange={(value) => handleResponseChange(question.id, value)}
                  disabled={false}
                  themeStyles={getThemeStyles(form)}
                />
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (form.mode === 'questionnaire' ? form.questions.length + 1 : form.questions.length) * 0.1 }}
              className={`${getThemeStyles(form).card} rounded-2xl p-6`}
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full ${getThemeStyles(form).button} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg`}
              >
                {form.mode === 'questionnaire' ? 'Submit Quiz' : 'Submit Kuest'}
              </motion.button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Powered by <span className="font-semibold kuest-text-gradient">Kuest</span>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
