'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, Download, BarChart3, PieChart as PieChartIcon, FileText, Calendar, Hash, Edit3, Save, X } from 'lucide-react';
import { Form, FormResponse } from '@/types';
import { storage } from '@/lib/storage';

export default function ResponsesPage() {
  const params = useParams();
  const formId = params.id as string;

  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [editingScore, setEditingScore] = useState<string | null>(null);
  const [tempScore, setTempScore] = useState<number>(0);

  useEffect(() => {
    const loadData = () => {
      const foundForm = storage.getForm(formId);
      if (foundForm) {
        setForm(foundForm);
        const formResponses = storage.getResponses(formId);
        setResponses(formResponses);
        
        // Generate chart data for multiple choice and checkbox questions
        const chartDataArray: any[] = [];
        const pieDataArray: any[] = [];
        
        foundForm.questions.forEach(question => {
          if (question.type === 'multiple-choice' || question.type === 'checkbox') {
            const optionCounts: Record<string, number> = {};
            
            formResponses.forEach(response => {
              const answer = response.responses[question.id];
              if (Array.isArray(answer)) {
                answer.forEach(option => {
                  optionCounts[option] = (optionCounts[option] || 0) + 1;
                });
              } else if (answer) {
                optionCounts[answer] = (optionCounts[answer] || 0) + 1;
              }
            });
            
            const data = Object.entries(optionCounts).map(([option, count]) => ({
              name: option,
              value: count,
              question: question.title
            }));
            
            chartDataArray.push({
              question: question.title,
              data: data
            });
            
            pieDataArray.push({
              question: question.title,
              data: data
            });
          }
        });
        
        setChartData(chartDataArray);
        setPieData(pieDataArray);
      } else {
        setError('Form not found');
      }
      setLoading(false);
    };

    loadData();
  }, [formId]);

  const handleExportCSV = () => {
    if (!form || responses.length === 0) {
      alert('No responses to export');
      return;
    }

    const csvContent = storage.exportToCSV(responses, form);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${form.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_responses.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleEditScore = (responseId: string, currentScore: number) => {
    setEditingScore(responseId);
    setTempScore(currentScore);
  };

  const handleSaveScore = (responseId: string) => {
    const updatedResponses = responses.map(response => {
      if (response.id === responseId) {
        return { ...response, finalScore: tempScore };
      }
      return response;
    });
    setResponses(updatedResponses);
    
    // Update in storage
    updatedResponses.forEach(response => {
      storage.saveResponse(response);
    });
    
    setEditingScore(null);
  };

  const handleCancelEdit = () => {
    setEditingScore(null);
    setTempScore(0);
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
          <p className="text-gray-600 dark:text-gray-300">Loading responses...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Form Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The form you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Back to Dashboard
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
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
              {form.mode === 'questionnaire' ? 'Quiz Results' : 'Kuest Responses'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">{form.title}</p>
            {form.mode === 'questionnaire' && (
              <p className="text-sm text-kuest-green dark:text-kuest-green-light mt-1">
                📝 Questionnaire Mode - Review and adjust student scores
              </p>
            )}
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportCSV}
              disabled={responses.length === 0}
              className="kuest-gradient text-white px-6 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`grid grid-cols-1 ${form.mode === 'questionnaire' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-6 mb-12`}
        >
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass dark:glass-dark rounded-2xl p-6"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {form.mode === 'questionnaire' ? 'Students' : 'Total Responses'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{responses.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass dark:glass-dark rounded-2xl p-6"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Questions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{form.questions.length}</p>
              </div>
            </div>
          </motion.div>

          {form.mode === 'questionnaire' && (
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass dark:glass-dark rounded-2xl p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {responses.length > 0 
                      ? Math.round(responses.reduce((sum, r) => sum + (r.finalScore || r.preliminaryScore || 0), 0) / responses.length)
                      : 0
                    }/{responses.length > 0 ? responses[0].maxScore || 0 : 0}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass dark:glass-dark rounded-2xl p-6"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Date(form.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts */}
        {chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Response Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {chartData.map((chart, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass dark:glass-dark rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{chart.question}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: 'none', 
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }} 
                      />
                      <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Responses Table */}
        {responses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass dark:glass-dark rounded-2xl p-12 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No responses yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Share your form to start collecting responses</p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/form/${form.id}`)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Copy Form Link
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass dark:glass-dark rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Submission Date
                    </th>
                    {form.mode === 'questionnaire' && (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Student Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Preliminary Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Final Score
                        </th>
                      </>
                    )}
                    {form.questions.map((question) => (
                      <th key={question.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {question.emoji && <span className="mr-1">{question.emoji}</span>}
                        {question.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {responses.map((response, index) => (
                    <tr key={response.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(response.submittedAt).toLocaleString()}
                      </td>
                      {form.mode === 'questionnaire' && (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                            {response.studentName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                              {response.preliminaryScore || 0}/{response.maxScore || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {editingScore === response.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  min="0"
                                  max={response.maxScore || 0}
                                  value={tempScore}
                                  onChange={(e) => setTempScore(parseInt(e.target.value) || 0)}
                                  className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                                <span className="text-xs text-gray-500">/{response.maxScore || 0}</span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleSaveScore(response.id)}
                                  className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                >
                                  <Save className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={handleCancelEdit}
                                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </motion.button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  (response.finalScore || response.preliminaryScore || 0) >= (response.maxScore || 0) * 0.8
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                    : (response.finalScore || response.preliminaryScore || 0) >= (response.maxScore || 0) * 0.6
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                }`}>
                                  {response.finalScore || response.preliminaryScore || 0}/{response.maxScore || 0}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEditScore(response.id, response.finalScore || response.preliminaryScore || 0)}
                                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            )}
                          </td>
                        </>
                      )}
                      {form.questions.map((question) => {
                        const value = response.responses[question.id];
                        return (
                          <td key={question.id} className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {Array.isArray(value) ? (
                              <div className="space-y-1">
                                {value.map((item, idx) => (
                                  <span key={idx} className="inline-block bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs mr-1">
                                    {item}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <div className="max-w-xs truncate" title={value as string}>
                                {value as string}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
