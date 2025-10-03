'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Sparkles, ExternalLink, X, ChevronDown, Gamepad2, Smartphone } from 'lucide-react';
import FloatingShapes3D from '@/components/FloatingShapes3D';
import { LineByLineTypewriter } from '@/components/TypewriterText';

export default function HomePage() {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const updateCountdown = () => {
    const targetDate = new Date('2025-10-31T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = Math.max(0, targetDate - now);

    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');

    setTimeLeft({
      days: parseInt(days),
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds)
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (projectsRef.current) {
        const rect = projectsRef.current.getBoundingClientRect();
        // Hide arrow when projects section is in view
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for maintenance redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('maintenance')) {
      setShowMaintenanceModal(true);
      // Clean up URL
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  // Countdown timer effect
  useEffect(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update countdown when modal opens
  useEffect(() => {
    if (showCountdownModal) {
      updateCountdown();
    }
  }, [showCountdownModal]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing green dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Network lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-green-400 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${10 + Math.random() * 100}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `pulse 2s infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
          </div>
        </div>
      
      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-20 flex justify-center pt-8"
      >
        <div className="bg-green-600/20 backdrop-blur-md border border-green-500/30 rounded-full px-6 py-2 flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <span className="text-white text-sm font-medium">Available for Projects</span>
        </div>
      </motion.div>
      
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
      
      {/* Maintenance Modal */}
      <AnimatePresence>
        {showMaintenanceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowMaintenanceModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-md rounded-2xl p-8 max-w-md w-full relative border border-yellow-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">Quest Temporarily Unavailable</h3>
                <p className="text-white/80 mb-6 text-lg">
                  Quest is currently undergoing maintenance to improve performance and add new features.
                </p>
                
                <div className="bg-yellow-500/10 backdrop-blur-sm rounded-xl p-4 mb-6 border border-yellow-500/20">
                  <p className="text-yellow-300 font-semibold">🚧 Under Maintenance</p>
                  <p className="text-white/70 text-sm mt-2">
                    We&apos;re working hard to bring you an even better experience. 
                    Expected availability: <strong>Soon</strong>
                  </p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowMaintenanceModal(false)}
                    className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Close
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowContactPopup(true)}
                    className="text-yellow-300 hover:text-yellow-200 transition-colors text-sm font-medium"
                  >
                    Contact Support
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <motion.span 
                className="bg-gradient-to-r from-white via-green-400 to-green-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.2 },
                  x: { duration: 0.8, delay: 0.2 },
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.0 }
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Fac Systems
              </motion.span>
            </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white mb-12 leading-relaxed text-left max-w-2xl mx-auto"
          >
              Full-stack developer crafting innovative solutions with modern technologies. From interactive questionnaires to immersive games and powerful CAD tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
                whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
                className="bg-green-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-300 transition-all duration-300 flex items-center space-x-2"
              >
                      <span>View Projects {'>'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactPopup(true)}
                className="bg-green-600/20 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold border border-green-400/30 hover:border-green-400/50 transition-all duration-300"
              >
                About Me
            </motion.button>
          </motion.div>
        </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-3"
          >
            <motion.button
              onClick={scrollToProjects}
              className="flex flex-col items-center space-y-2 group"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, 8, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            >
              {/* Arrow Icon */}
              <div className="relative">
                {/* Arrow */}
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  animate={{ 
                    filter: [
                      "drop-shadow(0 0 0px rgba(255, 255, 255, 0))",
                      "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
                      "drop-shadow(0 0 0px rgba(255, 255, 255, 0))"
                    ]
                  }}
                  transition={{ 
                    filter: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.2 }
                  }}
                >
                  <svg className="w-8 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <motion.path 
                      d="M12 2L12 22 M8 18L12 22L16 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ 
                        pathLength: [0, 1, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  </svg>
                </motion.div>
              </div>
              <motion.span 
                className="text-sm text-green-400 group-hover:text-green-300 transition-colors"
                animate={{ 
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                Scroll to explore
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Featured</span>
              <span className="text-green-400"> Projects</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              A showcase of innovative applications spanning web, mobile, and gaming platforms.
            </p>
          </div>

          <div className="space-y-8">
            {/* Kuest Project Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover"
              data-section="kuest"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-kuest-green to-kuest-green-dark rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Kuest</h3>
                    <span className="px-3 py-1 bg-kuest-green/20 text-kuest-green-light rounded-full text-sm font-medium">
                      Latest
                    </span>
                  </div>
                  
                  <p className="text-lg text-white/80 mb-6 leading-relaxed">
                    A modern questionnaire and form application featuring dynamic tag-based organization, real-time validation, and intuitive user experience for seamless data collection and analysis.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {['React', 'TypeScript', 'Forms', 'UI/UX', 'Real-time'].map((feature) => (
                      <motion.span 
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1 + Math.random() * 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 rounded-lg text-sm bg-green-400 text-white transition-all duration-300"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowMaintenanceModal(true)}
                      className="bg-gradient-to-r from-yellow-500/30 to-amber-500/30 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 border border-yellow-500/30 hover:bg-gradient-to-r hover:from-yellow-500/40 hover:to-amber-500/40"
                    >
                      <span>🚧 Quest Temporarily Unavailable</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </motion.button>
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
                      Coming this Month!
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
                      onClick={() => setShowCountdownModal(true)}
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
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover relative group"
            >
              {/* Modal overlay on hover */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-6 max-w-sm mx-4 shadow-2xl border border-gray-200 relative z-50"
                >
                  {/* Header */}
                  <div className="text-center border-b border-gray-200 pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Coming Soon</h3>
                  </div>
                  
                  {/* Body text */}
                  <div className="text-gray-600 text-sm leading-relaxed mb-4">
                    This project is currently under development and will be available soon. 
                    Beta version launching in November 2025.
                  </div>
                  
                  {/* Separator line */}
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    {/* Action button */}
                    <div className="flex justify-center">
                      <button 
                        onClick={() => {
                          const kuestSection = document.querySelector('[data-section="kuest"]');
                          kuestSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg"
                      >
                        <span>🕐</span>
                        <span>I will wait</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="flex flex-col lg:flex-row items-center gap-8 relative z-20 group-hover:blur-sm transition-all duration-300">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Track Cleared</h3>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-green-400 text-sm font-medium">Beta Coming November 2025</span>
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

                  <div className="flex justify-start">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open('https://discord.gg/YfH7j28S', '_blank')}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:from-indigo-600 hover:to-purple-700"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0c-.21-.375-.444-.864-.608-1.249a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-5.487-2.464.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 4.35-3.359.074.074 0 0 1 .128-.008zm8.02 15.33c-1.183 0-2.157-1.085-2.157-2.42 0-1.336.956-2.42 2.157-2.42s2.176 1.096 2.157 2.42c0 1.335-.956 2.42-2.157 2.42zm7.975 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.336.955-2.42 2.157-2.42s2.176 1.096 2.157 2.42c0 1.335-.974 2.42-2.157 2.42z"/>
                      </svg>
                      <span>Apply for Beta Tester in 2 Steps</span>
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

      {/* About Me Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">About</span>
              <span className="text-green-400"> Me</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-gray-900/10 backdrop-blur-md border border-green-400/20 rounded-3xl p-12"
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Photo */}
              <div className="flex flex-col items-center lg:items-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full border-4 border-green-400/30 flex items-center justify-center mb-4 overflow-hidden bg-green-400/10">
                    <img 
                      src="/profile-photo.jpg" 
                      alt="Profile Photo" 
                      className="w-full h-full object-cover object-center blur-[1px] scale-110"
                      style={{ objectPosition: 'center -5%' }}
                    />
                  </div>
                </motion.div>
                
                {/* Status indicators */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400 text-xs">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 text-xs">Remote Work</span>
                </div>
              </div>

              {/* About Text */}
              <div className="flex-1 text-left">
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  Full-stack developer passionate about creating digital experiences that make a difference. 
                  With expertise in modern web technologies, I specialize in building responsive applications 
                  that combine beautiful design with powerful functionality.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">💻</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Frontend Expertise</h4>
                      <p className="text-white/70 text-sm">React, TypeScript, Next.js, and modern CSS frameworks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Backend & Infrastructure</h4>
                      <p className="text-white/70 text-sm">Node.js, databases, APIs, and cloud deployment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🎮</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Creative Projects</h4>
                      <p className="text-white/70 text-sm">From interactive games to powerful CAD systems</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg mb-3">Skills</h4>
                  
                  <div>
                    <h5 className="text-green-400 font-medium mb-2">Frontend</h5>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'React Native'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-gray-800/50 text-green-400 text-sm rounded-lg border border-green-400/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-green-400 font-medium mb-2">Backend</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Databases', 'APIs'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-gray-800/50 text-green-400 text-sm rounded-lg border border-green-400/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
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

      {/* Countdown Modal */}
      <AnimatePresence>
        {showCountdownModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowCountdownModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 relative overflow-hidden border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-16 h-16 bg-green-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>

            <div className="relative text-center">
              {/* Title */}
              <motion.h2 
                className="text-3xl font-semibold text-white mb-6 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent"
                whileInView={{ y: [-10, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
              >
                Coming Soon...
              </motion.h2>

              {/* Countdown Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {Object.entries(timeLeft).map(([unit, value], index) => (
                  <motion.div
                    key={unit}
                    className="bg-black/30 hover:bg-black/40 backdrop-blur-md font-medium border border-white/10 rounded-xl p-3 text-sm transition-all duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-transparent bg-gradient-to-br from-green-400 via-emerald-300 to-green-500 bg-clip-text"
                      key={value} // Re-animate when value changes
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.3 }}
                    >
                      {String(value).padStart(2, '0')}
                    </motion.div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">
                      {unit}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Custom hint text */}
              <motion.p 
                className="text-gray-300 mb-6 text-sm leading-relaxed"
                whileInView={{ y: [10, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Something special is brewing...
                <br />
                Get ready for an exciting announcement!
              </motion.p>

              {/* Dismiss button */}
              <motion.button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:to-green-700 from-green-500 h-10 relative overflow-hidden group text-sm font-medium whitespace-nowrap text-white shadow-[0_4px_15px_rgba(167,243,208,0.3)] hover:shadow-[0_4px_25px_rgba(167,243,208,0.4)] transition-all duration-300 rounded-lg flex items-center justify-center space-x-2"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => setShowCountdownModal(false)}
              >
                <span>Close</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}