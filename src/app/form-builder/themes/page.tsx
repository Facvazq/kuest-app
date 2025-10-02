'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Check, Sparkles, Moon, Sun, Zap, Heart, Star } from 'lucide-react';
import { Form } from '@/types';
import { storage } from '@/lib/storage';

export default function ThemesPage() {
  const [formId, setFormId] = useState<string>('');
  const [form, setForm] = useState<Form | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'default' | 'electric' | 'warm' | 'royal'>('default');
  const [selectedAccentColor, setSelectedAccentColor] = useState<string>('#22c55e');
  const [selectedBackgroundStyle, setSelectedBackgroundStyle] = useState<'solid' | 'gradient' | 'pattern'>('gradient');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (id && id !== 'new') {
      setFormId(id);
      const loadForm = async () => {
        const savedForm = await storage.getForm(id);
        if (savedForm) {
          setForm(savedForm);
          setSelectedTheme((savedForm.theme as 'light' | 'dark' | 'default' | 'electric' | 'warm' | 'royal') || 'default');
          setSelectedAccentColor(savedForm.accentColor || '#22c55e');
          setSelectedBackgroundStyle((savedForm.backgroundStyle as 'solid' | 'gradient' | 'pattern') || 'gradient');
        } else {
          // Form not found, redirect back to form builder
          window.location.href = '/form-builder';
        }
      };
      loadForm();
    } else if (id === 'new') {
      // Handle new form - create a temporary form
      const tempForm: Form = {
        id: storage.generateId(),
        title: 'New Kuest',
        description: '',
        questions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        theme: 'default',
        accentColor: '#22c55e',
        backgroundStyle: 'gradient',
        backgroundColor: '#000000',
        mode: 'standard'
      };
      setForm(tempForm);
      setFormId(tempForm.id);
    } else {
      // No ID provided, redirect to form builder
      window.location.href = '/form-builder';
    }
  }, []);

  const themes = [
    {
      id: 'default',
      name: 'Kuest Classic',
      description: 'The signature green and black theme',
      preview: 'bg-gradient-to-br from-kuest-green to-kuest-black',
      icon: Sparkles,
      colors: ['#22c55e', '#16a34a', '#000000']
    },
    {
      id: 'dark',
      name: 'Midnight',
      description: 'Deep dark theme with subtle accents',
      preview: 'bg-gradient-to-br from-gray-900 to-black',
      icon: Moon,
      colors: ['#374151', '#1f2937', '#000000']
    },
    {
      id: 'light',
      name: 'Sunrise',
      description: 'Clean light theme with vibrant colors',
      preview: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      icon: Sun,
      colors: ['#3b82f6', '#1d4ed8', '#ffffff']
    },
    {
      id: 'electric',
      name: 'Electric',
      description: 'High-energy theme with electric blue',
      preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
      icon: Zap,
      colors: ['#3b82f6', '#8b5cf6', '#1e1b4b']
    },
    {
      id: 'warm',
      name: 'Warmth',
      description: 'Cozy theme with warm orange tones',
      preview: 'bg-gradient-to-br from-orange-400 to-red-500',
      icon: Heart,
      colors: ['#f97316', '#dc2626', '#7c2d12']
    },
    {
      id: 'royal',
      name: 'Royal',
      description: 'Elegant purple and gold theme',
      preview: 'bg-gradient-to-br from-purple-600 to-yellow-500',
      icon: Star,
      colors: ['#9333ea', '#eab308', '#451a03']
    }
  ];

  const backgroundStyles = [
    {
      id: 'gradient',
      name: 'Gradient',
      description: 'Smooth color transitions',
      preview: 'bg-gradient-to-br from-kuest-green to-kuest-black'
    },
    {
      id: 'solid',
      name: 'Solid',
      description: 'Clean single color background',
      preview: 'bg-kuest-green'
    },
    {
      id: 'pattern',
      name: 'Pattern',
      description: 'Subtle geometric patterns',
      preview: 'bg-gradient-to-br from-kuest-green/80 to-kuest-black/80'
    }
  ];

  const handleSaveTheme = () => {
    if (form && formId) {
      const updatedForm = {
        ...form,
        theme: selectedTheme,
        accentColor: selectedAccentColor,
        backgroundStyle: selectedBackgroundStyle
      };
      storage.saveForm(updatedForm);
      // Redirect back to form builder
      window.location.href = `/form-builder?id=${formId}`;
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen gradient-bg dark:gradient-bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kuest-green mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading themes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg dark:gradient-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <Link 
            href={`/form-builder?id=${formId}`} 
            className="flex items-center space-x-2 text-white hover:text-kuest-green-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Form Builder</span>
          </Link>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold kuest-text-gradient mb-4">
            Choose Your Theme
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Customize the look and feel of your Kuest with beautiful themes and colors
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Theme Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Palette className="w-6 h-6 mr-3 text-kuest-green-light" />
              Select Theme
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  onClick={() => setSelectedTheme(theme.id as 'light' | 'dark' | 'default' | 'electric' | 'warm' | 'royal')}
                  className={`kuest-glass p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedTheme === theme.id 
                      ? 'ring-2 ring-kuest-green-light kuest-glow' 
                      : 'hover:kuest-glow-hover'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${theme.preview} rounded-xl flex items-center justify-center`}>
                        <theme.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{theme.name}</h3>
                        <p className="text-white/70 text-sm">{theme.description}</p>
                      </div>
                    </div>
                    {selectedTheme === theme.id && (
                      <Check className="w-6 h-6 text-kuest-green-light" />
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {theme.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-8 h-8 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Customization Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-kuest-green-light" />
              Customize Colors
            </h2>

            {/* Accent Color */}
            <div className="kuest-glass p-6 rounded-2xl mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Accent Color</h3>
              <div className="grid grid-cols-6 gap-3">
                {['#22c55e', '#3b82f6', '#8b5cf6', '#f97316', '#ef4444', '#10b981'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedAccentColor(color)}
                    className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 ${
                      selectedAccentColor === color 
                        ? 'border-white ring-2 ring-white/50' 
                        : 'border-white/20 hover:border-white/50'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="color"
                  value={selectedAccentColor}
                  onChange={(e) => setSelectedAccentColor(e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-white/20 bg-transparent"
                />
              </div>
            </div>

            {/* Background Style */}
            <div className="kuest-glass p-6 rounded-2xl mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Background Style</h3>
              <div className="space-y-3">
                {backgroundStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedBackgroundStyle(style.id as 'solid' | 'gradient' | 'pattern')}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedBackgroundStyle === style.id 
                        ? 'border-kuest-green-light kuest-glow' 
                        : 'border-white/20 hover:border-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">{style.name}</h4>
                        <p className="text-white/70 text-sm">{style.description}</p>
                      </div>
                      <div className={`w-16 h-10 ${style.preview} rounded-lg`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="kuest-glass p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Preview</h3>
              <div className="space-y-4">
                <div 
                  className="p-6 rounded-xl text-center"
                  style={{ 
                    background: selectedBackgroundStyle === 'gradient' 
                      ? `linear-gradient(135deg, ${selectedAccentColor} 0%, #000000 100%)`
                      : selectedAccentColor
                  }}
                >
                  <h4 className="text-white font-bold text-lg">{form.title || 'Your Kuest Title'}</h4>
                  <p className="text-white/80 text-sm mt-2">Preview of your theme</p>
                </div>
                
                <div className="flex space-x-2">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedAccentColor }}
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedAccentColor + '80' }}
                  />
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedAccentColor + '40' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={handleSaveTheme}
            className="kuest-gradient text-white px-12 py-4 rounded-2xl font-bold text-xl kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 shadow-2xl"
          >
            Save Theme & Continue
          </button>
        </motion.div>
      </div>
    </div>
  );
}
