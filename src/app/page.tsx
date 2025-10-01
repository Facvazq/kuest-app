'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Sparkles, ExternalLink } from 'lucide-react';
import FloatingShapes3D from '@/components/FloatingShapes3D';

export default function HomePage() {
  return (
    <div className="min-h-screen kuest-hero-bg relative overflow-hidden">
      {/* 3D Background Elements */}
      <FloatingShapes3D />
      
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
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="kuest-gradient text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center space-x-2 kuest-glow-hover"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover the innovative tools and applications I&apos;ve built to solve real-world challenges.
            </p>
          </div>

          {/* Quest Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="kuest-glass rounded-3xl p-8 mb-8 kuest-3d-hover"
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

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="kuest-glass rounded-3xl p-8 text-center"
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
        transition={{ duration: 0.8, delay: 1.6 }}
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
          <div className="flex justify-center space-x-6">
            {[
              { name: "GitHub", href: "#" },
              { name: "LinkedIn", href: "#" },
              { name: "Contact", href: "#" }
            ].map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -2,
                  textShadow: "0 0 10px rgba(34, 197, 94, 0.5)"
                }}
                className="text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}