'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Sparkles, ExternalLink, X, ChevronDown, Gamepad2, Smartphone, Shield } from 'lucide-react';
import Image from 'next/image';
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
  const [adminSettings, setAdminSettings] = useState({
    availabilityStatus: 'available',
    vacationMessage: '',
    unavailableMessage: '',
    showContactForm: true,
    maintenanceMode: false
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

  // Load admin settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('admin-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setAdminSettings(settings);
      
      // Show maintenance modal if maintenance mode is enabled
      if (settings.maintenanceMode) {
        setShowMaintenanceModal(true);
      }
    }
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
        <div className={`backdrop-blur-md rounded-full px-6 py-2 flex items-center ${
          adminSettings.availabilityStatus === 'available' 
            ? 'bg-green-600/20 border border-green-500/30' 
            : adminSettings.availabilityStatus === 'unavailable'
            ? 'bg-red-600/20 border border-red-500/30'
            : 'bg-blue-600/20 border border-blue-500/30'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            adminSettings.availabilityStatus === 'available' 
              ? 'bg-green-400' 
              : adminSettings.availabilityStatus === 'unavailable'
              ? 'bg-red-400'
              : 'bg-blue-400'
          }`}></div>
          <span className="text-white text-sm font-medium">
            {adminSettings.availabilityStatus === 'available' 
              ? 'Available for Projects' 
              : adminSettings.availabilityStatus === 'unavailable'
              ? 'Unavailable for Projects'
              : '🏝️ Vacation Mode'
            }
          </span>
        </div>
      </motion.div>

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
              
              {adminSettings.showContactForm ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowContactPopup(true)}
                  className="bg-green-600/20 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold border border-green-400/30 hover:border-green-400/50 transition-all duration-300"
                >
                  Let&apos;s Build Something Amazing
                </motion.button>
              ) : (
                <div className="kuest-glass rounded-xl p-6 max-w-md mx-auto">
                  <p className="text-white/80 text-center">
                    {adminSettings.availabilityStatus === 'vacation' && adminSettings.vacationMessage
                      ? adminSettings.vacationMessage
                      : adminSettings.availabilityStatus === 'unavailable' && adminSettings.unavailableMessage
                      ? adminSettings.unavailableMessage
                      : adminSettings.availabilityStatus === 'vacation'
                      ? '🏝️ Currently on vacation. Will be back soon!'
                      : 'Currently unavailable for new projects. Check back later!'
                    }
                  </p>
                </div>
              )}
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
      <div ref={projectsRef} className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Featured</span>
              <span className="text-green-400"> Projects</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              A showcase of innovative applications spanning web, mobile, and gaming platforms.
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {/* Kuest Project Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover"
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
                    {['React', 'TypeScript', 'Forms', 'UI/UX', 'Real-time'].map((feature, index) => (
                      <motion.span 
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 rounded-lg text-sm bg-green-400 text-white transition-all duration-300"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/form-builder">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="kuest-gradient text-white px-6 py-3 rounded-lg font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Try Kuest</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="kuest-glass rounded-2xl p-6 kuest-3d-float"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-kuest-green-light" />
                        <span className="text-white font-medium">Key Features</span>
                      </div>
                      <ul className="space-y-3 text-white/80">
                        {[
                          { icon: '🎯', text: 'Interactive Quiz Builder' },
                          { icon: '⚡', text: 'Intelligent Auto-Scoring' },
                          { icon: '📊', text: 'Real-time Analytics' },
                          { icon: '🎨', text: 'Beautiful Themes' },
                          { icon: '📱', text: 'Mobile Responsive' },
                          { icon: '🔒', text: 'Secure & Private' }
                        ].map((item, index) => (
                          <motion.li 
                            key={item.text}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-lg">{item.icon}</span>
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
              transition={{ duration: 0.8, delay: 0.6 }}
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Auto DMV</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">Coming Soon</span>
                  </div>
                  
                  <p className="text-lg text-white/80 mb-6 leading-relaxed">
                    Auto DMV is a free, web-based CAD/MDT system designed for role-play servers. It provides streamlined tools for managing player data, vehicles, licenses, and law enforcement records, all accessible from any browser.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {['CAD', 'MDT', 'Roleplay', 'Free', 'Web App', 'PoliceRP'].map((feature, index) => (
                      <motion.span 
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 rounded-lg text-sm bg-red-500/20 text-red-300 transition-all duration-300"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>Coming Soon</span>
                    </motion.button>
                  </div>
                </div>

                <div className="flex-1 max-w-md">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="kuest-glass rounded-2xl p-6 kuest-3d-float"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Code className="w-5 h-5 text-red-400" />
                        <span className="text-white font-medium">System Features</span>
                      </div>
                      <ul className="space-y-3 text-white/80">
                        {[
                          { icon: '👮', text: 'Police Records Management' },
                          { icon: '🚗', text: 'Vehicle Registration' },
                          { icon: '📋', text: 'License Management' },
                          { icon: '🏥', text: 'EMS Records' },
                          { icon: '🌐', text: 'Browser-Based Access' },
                          { icon: '⚡', text: 'Lightweight & Fast' }
                        ].map((item, index) => (
                          <motion.li 
                            key={item.text}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-lg">{item.icon}</span>
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
              transition={{ duration: 0.8, delay: 0.8 }}
              className="kuest-glass rounded-3xl p-8 kuest-3d-hover relative group"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 relative z-20">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Gamepad2 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Track Cleared</h3>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-green-400 text-sm font-medium">Beta Coming Soon</span>
                  </div>
                  
                  <p className="text-lg text-white/80 mb-6 leading-relaxed">
                    An innovative mobile game that combines strategy and action elements. Players navigate through challenging tracks, clearing obstacles and collecting rewards. Features stunning graphics, intuitive controls, and engaging gameplay mechanics.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {['Game', 'Mobile', 'iOS', 'Android', 'Strategy', 'Action'].map((feature, index) => (
                      <motion.span 
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.0 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3 py-1 rounded-lg text-sm bg-blue-500/20 text-blue-300 transition-all duration-300"
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex justify-start">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 hover:from-indigo-600 hover:to-purple-700"
                    >
                      <span>Apply for Beta</span>
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
                        <Gamepad2 className="w-5 h-5 text-blue-400" />
                        <span className="text-white font-medium">Game Features</span>
                      </div>
                      <ul className="space-y-3 text-white/80">
                        {[
                          { icon: '🎮', text: 'Strategic Gameplay' },
                          { icon: '🏁', text: 'Track Clearing Mechanics' },
                          { icon: '🏆', text: 'Reward System' },
                          { icon: '📱', text: 'Cross-Platform' },
                          { icon: '🎨', text: 'Stunning Graphics' },
                          { icon: '⚡', text: 'Intuitive Controls' }
                        ].map((item, index) => (
                          <motion.li 
                            key={item.text}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.4 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <span className="text-lg">{item.icon}</span>
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
        </div>
      </div>

      {/* About Me Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">About</span>
              <span className="text-green-400"> Me</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/10 backdrop-blur-md border border-green-400/20 rounded-3xl p-12"
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-green-400/30 flex items-center justify-center mb-4 overflow-hidden bg-green-400/10">
                    <Image src="/profile-photo.jpg" alt="Profile Photo" width={128} height={128} className="w-full h-full object-cover object-center blur-[1px] scale-110" style={{objectPosition: 'center -5%'}} />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400 text-xs">Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <span className="text-blue-400 text-xs">Remote Work</span>
                </div>
              </div>
              
              <div className="flex-1 text-left">
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  Full-stack developer passionate about creating digital experiences that make a difference. With expertise in modern web technologies, I specialize in building responsive applications that combine beautiful design with powerful functionality.
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
                
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg mb-3">Skills</h4>
                  <div>
                    <h5 className="text-green-400 font-medium mb-2">Frontend</h5>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'React Native', 'Next.js', 'Tailwind CSS'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-gray-800/50 text-green-400 text-sm rounded-lg border border-green-400/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-green-400 font-medium mb-2">Backend</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Databases', 'APIs', 'Cloud Deployment', 'Serverless'].map((skill) => (
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
        </div>
      </div>

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
                
                <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Build Something Amazing</h3>
                <p className="text-white/70 mb-6">
                  Tell me about your project idea! Whether it&apos;s a web app, iOS app, or something completely different, I&apos;d love to hear about it.
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
                
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText('home@facsystems.dev');
                      alert('Email copied to clipboard!');
                    }}
                    className="w-full kuest-gradient text-white px-6 py-3 rounded-lg font-semibold kuest-glow-hover transition-all duration-300"
                  >
                    Copy Email
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      window.open('mailto:home@facsystems.dev?subject=Project Inquiry&body=Hi! I have a project idea I\'d like to discuss...', '_blank');
                    }}
                    className="w-full bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Open Email Client
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Admin Link - Subtle */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link href="/admin">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            title="Admin Console"
          >
            <Shield className="w-4 h-4 text-white/60" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}