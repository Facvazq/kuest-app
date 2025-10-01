'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Edit, BarChart3, Share2, Trash2, Plus, Home, FileText } from 'lucide-react';
import { Form } from '@/types';
import { storage } from '@/lib/storage';

export default function DashboardPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForms = () => {
      const savedForms = storage.getForms();
      setForms(savedForms);
      setLoading(false);
    };

    loadForms();
  }, []);

  const handleDeleteForm = (formId: string) => {
    if (confirm('Are you sure you want to delete this form? This action cannot be undone.')) {
      storage.deleteForm(formId);
      setForms(forms.filter(f => f.id !== formId));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your forms...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen kuest-hero-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold kuest-text-gradient mb-2">
              Kuest Dashboard
            </h1>
            <p className="text-gray-300 text-lg">Manage your kuest and view responses</p>
          </div>
          <Link href="/form-builder">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="kuest-gradient text-white px-6 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Kuest
            </motion.button>
          </Link>
        </motion.div>

        {/* Forms Grid */}
        {forms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="kuest-glass p-12 rounded-3xl max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No forms yet</h3>
              <p className="text-gray-300 mb-8">Create your first form to get started</p>
              <Link href="/form-builder">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="kuest-gradient text-white px-8 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300"
                >
                  Create Your First Kuest
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {forms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="kuest-glass rounded-2xl p-6 kuest-glow-hover kuest-3d-hover transition-all duration-300"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {form.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                    {form.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(form.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {form.questions.length} questions
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link href={`/form-builder?id=${form.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit ✏️
                    </motion.button>
                  </Link>
                  
                  <Link href={`/responses/${form.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors duration-200 flex items-center justify-center"
                    >
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Responses 📊
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(`${window.location.origin}/form/${form.id}`)}
                    className="w-full bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share 🔗
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteForm(form.id)}
                    className="w-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
