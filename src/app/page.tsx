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
                  An interactive quiz and form builder with advanced features including auto-scoring, 
                  multiple question types, beautiful themes, and real-time analytics. Built with Next.js, 
                  TypeScript, and 3D animations.
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Auto-Scoring'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 text-white/90 rounded-lg text-sm">
                      {tech}
                    </span>
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
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    View Source
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
                    <ul className="space-y-2 text-white/80">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-kuest-green rounded-full"></div>
                        <span>Interactive Quiz Builder</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-kuest-green rounded-full"></div>
                        <span>Auto-Scoring System</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-kuest-green rounded-full"></div>
                        <span>Multiple Question Types</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-kuest-green rounded-full"></div>
                        <span>Beautiful Themes</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-kuest-green rounded-full"></div>
                        <span>Real-time Analytics</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-kuest-green rounded-full"></div>
                        <span>3D Animations</span>
                      </li>
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
              <h3 className="text-2xl font-bold text-white mb-4">More Projects Coming Soon</h3>
              <p className="text-white/70 mb-6">
                I&apos;m constantly working on new projects and tools. Stay tuned for more innovative solutions!
              </p>
              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
          <h4 className="text-xl font-bold text-white mb-4">Fac Systems</h4>
          <p className="text-white/70 mb-6">
            Building the future of web applications with innovative technology and creative solutions.
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-white/70 hover:text-white transition-colors"
            >
              GitHub
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-white/70 hover:text-white transition-colors"
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-white/70 hover:text-white transition-colors"
            >
              Contact
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}