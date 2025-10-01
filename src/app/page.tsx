'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Palette, Share2, Gift, ArrowRight, Sparkles, Star, Users, Award, Shield } from 'lucide-react';
import FloatingShapes from '@/components/FloatingShapes';
import FloatingShapes3D from '@/components/FloatingShapes3D';

export default function HomePage() {
  return (
    <div className="min-h-screen kuest-hero-bg relative overflow-hidden">
      <FloatingShapes />
      <FloatingShapes3D />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-center items-center p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 kuest-gradient rounded-xl flex items-center justify-center kuest-3d-float shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-kuest-green-light to-white bg-clip-text text-transparent">
            Kuest
          </span>
        </motion.div>
      </nav>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-white/30 dark:border-gray-700/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-white">
              Create quizzes and forms in seconds, not hours
            </span>
          </motion.div>

          <h1 className="text-7xl md:text-8xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-white via-kuest-green-light to-white bg-clip-text text-transparent kuest-3d-rotate">
              Interactive Quizzes
            </span>
            <br />
            <span className="text-white text-6xl md:text-7xl">
              & Forms Made Simple
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed text-center">
            Create engaging quizzes with auto-scoring, beautiful forms with emojis and 3D animations. 
            Share instantly and collect responses with stunning analytics.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group kuest-gradient text-white px-12 py-6 rounded-2xl font-bold text-xl kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 flex items-center shadow-2xl"
              >
                Create a Kuest
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group kuest-glass text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-kuest-green/20 kuest-3d-hover transition-all duration-300 shadow-xl"
              >
                View Dashboard
              </motion.button>
            </Link>
          </motion.div>
        </motion.header>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {[
            {
              icon: Zap,
              title: "Lightning Fast ⚡",
              description: "Create quizzes and forms in seconds with our intuitive builder",
              color: "from-kuest-green to-kuest-green-dark",
              stats: "10x faster"
            },
            {
              icon: Palette,
              title: "Stunning Design 🎨",
              description: "Beautiful 3D animations, emojis, and green-black gradients",
              color: "from-kuest-green to-kuest-black",
              stats: "100+ themes"
            },
            {
              icon: Share2,
              title: "Auto-Scoring 📊",
              description: "Interactive quizzes with instant scoring and teacher review",
              color: "from-kuest-black to-kuest-green",
              stats: "Real-time"
            },
            {
              icon: Gift,
              title: "Completely Free 🆓",
              description: "No hidden costs, no limitations - just pure kuest-building fun",
              color: "from-kuest-green-dark to-kuest-green",
              stats: "Forever free"
            },
            {
              icon: Users,
              title: "Team Collaboration 👥",
              description: "Share forms with your team and collaborate in real-time",
              color: "from-kuest-green to-kuest-green-dark",
              stats: "Unlimited users"
            },
            {
              icon: Shield,
              title: "Secure & Private 🔒",
              description: "Your data is protected with enterprise-grade security",
              color: "from-kuest-black to-kuest-green",
              stats: "GDPR compliant"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="kuest-glass p-8 rounded-3xl h-full kuest-glow-hover kuest-3d-hover transition-all duration-300 text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed mb-4 text-lg">
                  {feature.description}
                </p>
                <div className="text-kuest-green-light font-bold text-lg">
                  {feature.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* What Kuest Can Do Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-kuest-green-light to-white bg-clip-text text-transparent mb-6">
              What Kuest Can Do
            </h2>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto">
              Discover the powerful features that make Kuest the ultimate quiz and form creation platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Quiz Creation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="kuest-glass p-8 rounded-3xl kuest-glow-hover kuest-3d-hover transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-kuest-green to-kuest-green-dark rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Interactive Quizzes</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-lg">
                Create engaging quizzes with multiple choice, rating scales, and auto-scoring. Perfect for education, training, and assessments.
              </p>
              <ul className="text-white/70 text-left space-y-2">
                <li>• Auto-scoring with instant feedback</li>
                <li>• Multiple question types</li>
                <li>• Teacher review system</li>
                <li>• Student progress tracking</li>
              </ul>
            </motion.div>

            {/* Form Builder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="kuest-glass p-8 rounded-3xl kuest-glow-hover kuest-3d-hover transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-kuest-green to-kuest-black rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Beautiful Forms</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-lg">
                Design stunning forms with drag-and-drop builder, emoji customization, and glassmorphism effects.
              </p>
              <ul className="text-white/70 text-left space-y-2">
                <li>• Drag & drop question builder</li>
                <li>• Emoji and color customization</li>
                <li>• Glassmorphism design</li>
                <li>• Dark/light mode support</li>
              </ul>
            </motion.div>

            {/* Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="kuest-glass p-8 rounded-3xl kuest-glow-hover kuest-3d-hover transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-kuest-black to-kuest-green rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Share2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-time Analytics</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-lg">
                Get instant insights with beautiful charts, response tracking, and detailed analytics dashboards.
              </p>
              <ul className="text-white/70 text-left space-y-2">
                <li>• Live response tracking</li>
                <li>• Beautiful data visualizations</li>
                <li>• CSV export functionality</li>
                <li>• Performance metrics</li>
              </ul>
            </motion.div>

            {/* Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="kuest-glass p-8 rounded-3xl kuest-glow-hover kuest-3d-hover transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-kuest-green-dark to-kuest-green rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Team Collaboration</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-lg">
                Share forms with your team, collaborate in real-time, and manage multiple projects effortlessly.
              </p>
              <ul className="text-white/70 text-left space-y-2">
                <li>• Share with unlimited users</li>
                <li>• Real-time collaboration</li>
                <li>• Team project management</li>
                <li>• Role-based permissions</li>
              </ul>
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="kuest-glass p-8 rounded-3xl kuest-glow-hover kuest-3d-hover transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-kuest-green to-kuest-green-dark rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Security</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-lg">
                Your data is protected with enterprise-grade security, GDPR compliance, and privacy controls.
              </p>
              <ul className="text-white/70 text-left space-y-2">
                <li>• GDPR compliant</li>
                <li>• End-to-end encryption</li>
                <li>• Privacy controls</li>
                <li>• Secure data storage</li>
              </ul>
            </motion.div>

            {/* Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="kuest-glass p-8 rounded-3xl kuest-glow-hover kuest-3d-hover transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-kuest-black to-kuest-green rounded-3xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Easy Integration</h3>
              <p className="text-white/80 leading-relaxed mb-4 text-lg">
                Seamlessly integrate with your existing workflow with instant sharing, embed codes, and API access.
              </p>
              <ul className="text-white/70 text-left space-y-2">
                <li>• Instant shareable links</li>
                <li>• Embed in websites</li>
                <li>• API integration</li>
                <li>• Webhook support</li>
              </ul>
            </motion.div>
          </div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Perfect For</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { title: "Education", desc: "Classroom quizzes, exams, and student assessments" },
                { title: "Business", desc: "Employee surveys, feedback forms, and training" },
                { title: "Events", desc: "Registration forms, feedback collection, and polls" },
                { title: "Research", desc: "Data collection, surveys, and market research" }
              ].map((useCase, index) => (
                <div key={index} className="kuest-glass p-6 rounded-2xl text-center">
                  <h4 className="text-xl font-bold text-white mb-3">{useCase.title}</h4>
                  <p className="text-white/70 text-sm">{useCase.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Comparison Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-kuest-green-light to-white bg-clip-text text-transparent mb-6">
              COMPARE FORM BUILDERS
            </h2>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              See how Kuest compares to other form creation software
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Comparison Table */}
            <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-2xl kuest-glow">
              {/* Features Column */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-black/20 backdrop-blur-md border-r border-white/10"
              >
                {/* Header */}
                <div className="bg-black/40 backdrop-blur-md p-8 border-b border-white/10">
                  <div className="text-center">
                    <h3 className="text-white font-bold text-2xl">FEATURES</h3>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="space-y-0">
                  {[
                    "Shareable Links",
                    "CSV Export",
                    "3D Animations",
                    "Auto-Scoring",
                    "Real-time Analytics",
                    "Glassmorphism Design",
                    "Emoji Customization",
                    "Drag & Drop Builder",
                    "Dark/Light Mode",
                    "Mobile Responsive",
                    "Free Forever",
                    "No Account Required",
                    "Offline Capability",
                    "Teacher Review"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + index * 0.05 }}
                      className="px-8 py-6 bg-white/5 border-b border-white/5 text-white text-lg font-medium text-center"
                    >
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Kuest Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-kuest-green/20 backdrop-blur-md border-r border-white/10"
              >
                {/* Header */}
                <div className="bg-kuest-green/40 backdrop-blur-md p-8 border-b border-white/10">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-kuest-green font-bold text-2xl">K</span>
                    </div>
                    <span className="text-white font-bold text-2xl">KUEST</span>
                  </div>
                </div>
                
                {/* Checkmarks/X marks */}
                <div className="space-y-0">
                  {[
                    true, true, true, true, true, true, true, true, true, true, true, true, true, true
                  ].map((supported, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.05 }}
                      className="px-8 py-6 bg-white/5 border-b border-white/5 flex items-center justify-center"
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        supported 
                          ? 'border-kuest-green bg-kuest-green/20' 
                          : 'border-white/30 bg-white/10'
                      }`}>
                        <span className={`text-sm font-bold ${
                          supported ? 'text-kuest-green' : 'text-white/30'
                        }`}>
                          {supported ? '✓' : '✗'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Other Software Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-gray-600/20 backdrop-blur-md"
              >
                {/* Header */}
                <div className="bg-gray-600/40 backdrop-blur-md p-8 border-b border-white/10">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-gray-600 font-bold text-2xl">O</span>
                    </div>
                    <span className="text-white font-bold text-2xl">OTHERS</span>
                  </div>
                </div>
                
                {/* Checkmarks/X marks */}
                <div className="space-y-0">
                  {[
                    false, false, false, false, false, false, true, true, false, false, false, false, false, false
                  ].map((supported, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4 + index * 0.05 }}
                      className="px-8 py-6 bg-white/5 border-b border-white/5 flex items-center justify-center"
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        supported 
                          ? 'border-gray-400 bg-gray-400/20' 
                          : 'border-white/30 bg-white/10'
                      }`}>
                        <span className={`text-sm font-bold ${
                          supported ? 'text-gray-400' : 'text-white/30'
                        }`}>
                          {supported ? '✓' : '✗'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="text-center mt-12"
            >
              <div className="kuest-glass p-10 rounded-3xl max-w-3xl mx-auto kuest-glow text-center">
                <h3 className="text-3xl font-bold text-white mb-6">
                  The Choice is Clear
                </h3>
                <p className="text-white/80 mb-8 text-xl">
                  Join thousands of users who have already made the switch to Kuest
                </p>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="kuest-gradient text-white px-12 py-4 rounded-2xl font-bold text-xl kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 shadow-2xl"
                  >
                    Try Kuest Now - It&apos;s Free!
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="text-center"
        >
          <div className="kuest-glass p-16 rounded-3xl max-w-5xl mx-auto kuest-glow kuest-3d-hover text-center">
            <h2 className="text-5xl font-bold text-white mb-8">
              Ready to create amazing kuest?
            </h2>
            <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
              Join thousands of users who are already creating engaging quizzes and forms with Kuest.
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="kuest-gradient text-white px-16 py-6 rounded-2xl font-bold text-2xl kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 shadow-2xl"
              >
                Start Your Kuest
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.4 }}
        className="relative z-10 text-center py-8 border-t border-kuest-green/20"
      >
        <div className="container mx-auto px-4">
          <p className="text-white/70 text-lg">
            © 2024 Kuest. Made with ❤️ for quiz and form creators everywhere.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
