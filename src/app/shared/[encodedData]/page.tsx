'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, CheckCircle, AlertCircle, Share2, Download, Upload } from 'lucide-react';
import { Form, FormResponse } from '@/types';
import { storage } from '@/lib/storage';
import QuestionRenderer from '@/components/QuestionRenderer';

export default function SharedFormPage() {
  const params = useParams();
  const encodedData = params.encodedData as string;

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
        textSecondary: 'text-gray-600',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-white/90 backdrop-blur-md border border-blue-200/30 text-gray-900 placeholder-gray-500'
      },
      electric: {
        background: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
        card: 'bg-purple-800/20 backdrop-blur-md border border-purple-400/30',
        text: 'text-white',
        textSecondary: 'text-purple-200',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-purple-800/20 backdrop-blur-md border border-purple-400/30 text-white placeholder-purple-300'
      },
      warm: {
        background: 'bg-gradient-to-br from-orange-900 via-red-900 to-pink-900',
        card: 'bg-orange-800/20 backdrop-blur-md border border-orange-400/30',
        text: 'text-white',
        textSecondary: 'text-orange-200',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-orange-800/20 backdrop-blur-md border border-orange-400/30 text-white placeholder-orange-300'
      },
      royal: {
        background: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900',
        card: 'bg-indigo-800/20 backdrop-blur-md border border-indigo-400/30',
        text: 'text-white',
        textSecondary: 'text-indigo-200',
        accent: `text-[${accentColor}]`,
        button: `bg-[${accentColor}]`,
        border: `border-[${accentColor}]`,
        input: 'bg-indigo-800/20 backdrop-blur-md border border-indigo-400/30 text-white placeholder-indigo-300'
      }
    };

    return themeStyles[form.theme] || themeStyles.default;
  };

  useEffect(() => {
    if (encodedData) {
      const decodedForm = storage.decodeFormFromUrl(encodedData);
      if (decodedForm) {
        setForm(decodedForm);
        setLoading(false);
      } else {
        setError('Invalid form data. Please check the link.');
        setLoading(false);
      }
    }
  }, [encodedData]);

  const handleResponseChange = (questionId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form) return;

    // Validate required fields
    const requiredQuestions = form.questions.filter(q => q.required);
    const missingRequired = requiredQuestions.some(q => {
      const response = responses[q.id];
      return !response || (Array.isArray(response) && response.length === 0);
    });

    if (missingRequired) {
      alert('Please fill in all required fields.');
      return;
    }

    if (form.mode === 'questionnaire' && !studentName.trim()) {
      alert('Please enter your name.');
      return;
    }

    // Calculate score for questionnaire mode
    let calculatedScore = 0;
    let calculatedMaxScore = 0;
    
    if (form.mode === 'questionnaire') {
      const scoreResult = storage.calculateScore(responses, form);
      calculatedScore = scoreResult.score;
      calculatedMaxScore = scoreResult.maxScore;
      setPreliminaryScore({ score: calculatedScore, maxScore: calculatedMaxScore });
    }

    // Save response
    const newResponse: FormResponse = {
      id: storage.generateId(),
      formId: form.id,
      responses,
      submittedAt: new Date().toISOString(),
      studentName: form.mode === 'questionnaire' ? studentName : undefined,
      preliminaryScore: form.mode === 'questionnaire' ? calculatedScore : undefined,
      maxScore: form.mode === 'questionnaire' ? calculatedMaxScore : undefined,
    };

    storage.saveResponse(newResponse);
    setSubmitted(true);
  };

  const copyShareLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Share link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link. Please copy the URL manually.');
    });
  };

  const downloadForm = () => {
    if (form) {
      storage.exportFormToFile(form);
    }
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
            <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`text-lg ${styles.text}`}>Loading form...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen kuest-hero-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-white/80 mb-6">{error}</p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="kuest-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
    const styles = getThemeStyles(form!);
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
              {form!.mode === 'questionnaire' ? 'Quiz Submitted!' : 'Thank You!'}
            </h2>
            {form!.mode === 'questionnaire' && preliminaryScore ? (
              <div className={`${styles.card} p-6 rounded-xl mb-6 max-w-md mx-auto`}>
                <h3 className={`text-lg font-semibold ${styles.text} mb-4`}>Preliminary Results</h3>
                <div className="space-y-2">
                  <p className={`${styles.textSecondary}`}>
                    <strong>Student:</strong> {studentName}
                  </p>
                  <p className={`${styles.textSecondary}`}>
                    <strong>Score:</strong> {preliminaryScore.score} / {preliminaryScore.maxScore} points
                  </p>
                  <p className={`${styles.textSecondary}`}>
                    <strong>Percentage:</strong> {Math.round((preliminaryScore.score / preliminaryScore.maxScore) * 100)}%
                  </p>
                  <p className={`${styles.textSecondary}`}>
                    <strong>Status:</strong> 
                    <span className={`ml-2 ${(preliminaryScore.score / preliminaryScore.maxScore) * 100 >= (form!.passingMark || 70) ? 'text-green-400' : 'text-red-400'}`}>
                      {(preliminaryScore.score / preliminaryScore.maxScore) * 100 >= (form!.passingMark || 70) ? 'PASSED' : 'FAILED'}
                    </span>
                  </p>
                </div>
                <p className={`text-sm ${styles.textSecondary} mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20`}>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyShareLink}
                className={`${styles.button} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Share2 className="w-4 h-4 mr-2 inline" />
                Share
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!form) return null;

  const styles = getThemeStyles(form);

  return (
    <div className={`min-h-screen ${styles.background}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.button} text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Home className="w-4 h-4 mr-2 inline" />
                Home
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyShareLink}
              className={`${styles.button} text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <Share2 className="w-4 h-4 mr-2 inline" />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadForm}
              className={`${styles.button} text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <Download className="w-4 h-4 mr-2 inline" />
              Download
            </motion.button>
          </div>
          
          <h1 className={`text-4xl font-bold ${styles.text} mb-4`}>{form.title}</h1>
          {form.description && (
            <p className={`text-lg ${styles.textSecondary} max-w-2xl mx-auto`}>{form.description}</p>
          )}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${styles.card} p-8 rounded-2xl max-w-2xl mx-auto`}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Name for Questionnaire Mode */}
            {form.mode === 'questionnaire' && (
              <div>
                <label className={`block text-lg font-semibold ${styles.text} mb-3`}>
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg ${styles.input} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            {/* Questions */}
            {form.questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <QuestionRenderer
                  question={question}
                  value={responses[question.id]}
                  onChange={(value) => handleResponseChange(question.id, value)}
                  themeStyles={styles}
                />
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${styles.button} text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
              style={{ 
                backgroundColor: form.accentColor 
              }}
            >
              {form.mode === 'questionnaire' ? 'Submit Quiz' : 'Submit Form'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
