'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Sparkles, ExternalLink, X, ChevronDown, Gamepad2, Smartphone } from 'lucide-react';
import FloatingShapes3D from '@/components/FloatingShapes3D';

export default function HomePage() {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        const rect = projectsRef.current.getBoundingClientRect();
        // Hide arrow when projects section is in view
        setShowScrollArrow(rect.top > window.innerHeight * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen kuest-hero-bg relative overflow-hidden">
      {/* 3D Background Elements */}
      <FloatingShapes3D />
      
      {/* Contact Popup */}
      <AnimatePresence>
        {showContactPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="kuest-glass rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowContactPopup(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-kuest-green to-kuest-green-dark rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                <p className="text-white/70 mb-6">
                  Ready to collaborate or have a project in mind?
                </p>
                
                <div className="kuest-glass rounded-xl p-4 mb-6">
                  <p className="text-white/80 text-sm mb-2">Email me at:</p>
                  <motion.p 
                    className="text-kuest-green-light font-semibold text-lg"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      navigator.clipboard.writeText('home@facsystems.dev');
                      alert('Email copied to clipboard!');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    home@facsystems.dev
                  </motion.p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.clipboard.writeText('home@facsystems.dev');
                    alert('Email copied to clipboard!');
                  }}
                  className="kuest-gradient text-white px-6 py-3 rounded-lg font-semibold kuest-glow-hover transition-all duration-300"
                >
                  Copy Email
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-kuest-green to-kuest-green-dark rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-kuest-green-light to-white bg-clip-text text-transparent">
            Fac Systems
          </span>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-kuest-green-light to-white bg-clip-text text-transparent kuest-3d-rotate">
              Fac Systems
            </span>
            <br />
            <span className="text-white text-4xl md:text-6xl">
              Development Portfolio
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Innovative web applications and tools designed to solve real-world problems with cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="kuest-gradient text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center space-x-2 kuest-glow-hover"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Arrow - Fixed Position */}
      <AnimatePresence>
        {showScrollArrow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          >
            <motion.button
              onClick={scrollToProjects}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-sm rounded-full p-3 border border-white/20"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Section */}
      <div ref={projectsRef} className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the innovative tools and applications I&apos;ve built to solve real-world challenges.
            </p>
          </div>

          <div className="space-y-8">
            {/* Quest Project Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-kuest-green to-kuest-green-dark rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Quest</h3>
                    <span className="px-3 py-1 bg-kuest-green/20 text-kuest-green-light rounded-full text-sm font-medium">
                      Latest
                    </span>
                  </div>
                  
                  <p className="text-lg text-white/80 mb-6 leading-relaxed">
                    A powerful quiz and form creation platform that revolutionizes how educators, businesses, and content creators 
                    build interactive assessments. Features intelligent auto-scoring, real-time analytics, beautiful themes, and 
                    seamless user experience. Perfect for online learning, employee training, market research, and engaging content creation.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {['Auto-Scoring', 'Real-time Analytics', 'Multiple Question Types', 'Beautiful Themes', '3D Animations', 'Responsive Design'].map((feature) => (
                      <motion.span 
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1 + Math.random() * 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 bg-white/10 text-white/90 rounded-lg text-sm kuest-glow-hover transition-all duration-300"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/dashboard">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="kuest-gradient text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 kuest-glow-hover"
                      >
                        <span>Launch Quest</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="kuest-glass rounded-2xl p-6 kuest-3d-float"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-kuest-green-light" />
                        <span className="text-white font-medium">Key Features</span>
                      </div>
                      <ul className="space-y-3 text-white/80">
                        {[
                          { icon: "🎯", text: "Interactive Quiz Builder" },
                          { icon: "⚡", text: "Intelligent Auto-Scoring" },
                          { icon: "📊", text: "Real-time Analytics" },
                          { icon: "🎨", text: "Beautiful Themes" },
                          { icon: "📱", text: "Mobile Responsive" },
                          { icon: "🔒", text: "Secure & Private" }
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <motion.span 
                              className="text-lg"
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2
                              }}
                            >
                              {item.icon}
                            </motion.span>
                            <span>{item.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Auto DMV Project Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Auto DMV</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                      Coming this month!
                    </span>
                  </div>
                  
                  <p className="text-lg text-white/80 mb-6 leading-relaxed">
                    Auto DMV is a free, web-based CAD/MDT system designed for role-play servers. It provides streamlined tools for managing player data, vehicles, licenses, and law enforcement records, all accessible from any browser. Easy to set up, lightweight, and perfect for police, EMS, and civilian role-play communities.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {['CAD', 'MDT', 'Roleplay', 'Free', 'Web App', 'PoliceRP', 'RP', 'Roleplay Servers', 'No Credit Card Required'].map((tag) => (
                      <motion.span 
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.9 + Math.random() * 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-3 py-1 rounded-lg text-sm kuest-glow-hover transition-all duration-300 ${
                          tag === 'CAD' || tag === 'MDT' ? 'bg-red-500/20 text-red-300' :
                          tag === 'Free' || tag === 'No Credit Card Required' ? 'bg-green-500/20 text-green-300' :
                          tag === 'Roleplay' || tag === 'RP' || tag === 'PoliceRP' || tag === 'Roleplay Servers' ? 'bg-purple-500/20 text-purple-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Coming Soon</span>
                    </motion.button>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                    className="kuest-glass rounded-2xl p-6 kuest-3d-float"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-white font-medium">System Features</span>
                      </div>
                      <ul className="space-y-3 text-white/80">
                        {[
                          { icon: "👮", text: "Police Records Management" },
                          { icon: "🚗", text: "Vehicle Registration" },
                          { icon: "📋", text: "License Management" },
                          { icon: "🏥", text: "EMS Records" },
                          { icon: "🌐", text: "Browser-Based Access" },
                          { icon: "⚡", text: "Lightweight & Fast" }
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.2 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <motion.span 
                              className="text-lg"
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2
                              }}
                            >
                              {item.icon}
                            </motion.span>
                            <span>{item.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Track Cleared Project Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Track Cleared</h3>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
                      Work In Progress
                    </span>
                  </div>
                  
                  <p className="text-lg text-white/80 mb-6 leading-relaxed">
                    An innovative mobile game that combines strategy and action elements. Players navigate through challenging tracks, 
                    clearing obstacles and collecting rewards. Features stunning graphics, intuitive controls, and engaging gameplay mechanics. 
                    Built for both iOS and Android platforms with cross-platform compatibility.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {['Game', 'Marshall', 'iOS', 'Android'].map((tag) => (
                      <motion.span 
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2.5 + Math.random() * 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-3 py-1 rounded-lg text-sm kuest-glow-hover transition-all duration-300 ${
                          tag === 'Game' ? 'bg-blue-500/20 text-blue-300' :
                          tag === 'Marshall' ? 'bg-purple-500/20 text-purple-300' :
                          tag === 'iOS' ? 'bg-gray-500/20 text-gray-300' :
                          'bg-green-500/20 text-green-300'
                        }`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Coming Soon</span>
                    </motion.button>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="kuest-glass rounded-2xl p-6 kuest-3d-float"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Gamepad2 className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Game Features</span>
                      </div>
                      <ul className="space-y-3 text-white/80">
                        {[
                          { icon: "🎮", text: "Strategic Gameplay" },
                          { icon: "🏁", text: "Track Clearing Mechanics" },
                          { icon: "🏆", text: "Reward System" },
                          { icon: "📱", text: "Cross-Platform" },
                          { icon: "🎨", text: "Stunning Graphics" },
                          { icon: "⚡", text: "Intuitive Controls" }
                        ].map((item, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.8 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <motion.span 
                              className="text-lg"
                              animate={{ 
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.2
                              }}
                            >
                              {item.icon}
                            </motion.span>
                            <span>{item.text}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.0 }}
            className="kuest-glass rounded-3xl p-8 text-center mt-8"
          >
            <div className="max-w-2xl mx-auto">
              <motion.h3 
                className="text-2xl font-bold text-white mb-4"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(34, 197, 94, 0)",
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                    "0 0 0px rgba(34, 197, 94, 0)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                More Projects Coming Soon
              </motion.h3>
              <p className="text-white/70 mb-6">
                I&apos;m constantly working on new projects and tools. Stay tuned for more innovative solutions!
              </p>
              <div className="flex justify-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-8 h-8 border-2 border-kuest-green border-t-transparent rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.4 }}
        className="relative z-10 container mx-auto px-6 py-12 text-center"
      >
        <div className="kuest-glass rounded-2xl p-8 max-w-2xl mx-auto">
          <motion.h4 
            className="text-xl font-bold text-white mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 0px rgba(34, 197, 94, 0)",
                "0 0 15px rgba(34, 197, 94, 0.3)",
                "0 0 0px rgba(34, 197, 94, 0)"
              ]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Fac Systems
          </motion.h4>
          <p className="text-white/70 mb-6">
            Building the future of web applications with innovative technology and creative solutions.
          </p>
          <div className="flex justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 }}
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                textShadow: "0 0 10px rgba(34, 197, 94, 0.5)"
              }}
              onClick={() => setShowContactPopup(true)}
              className="text-white/70 hover:text-white transition-colors text-lg font-medium"
            >
              Contact
            </motion.button>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}