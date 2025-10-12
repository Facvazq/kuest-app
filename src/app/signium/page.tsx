'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  Check, 
  Star,
  Trophy,
  Clock,
  MapPin,
  CreditCard,
  Bot,
  MessageSquare,
  TrendingUp,
  Settings,
  Eye,
  Download,
  Mail,
  Bell
} from 'lucide-react';

export default function SigniumHomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Calendar,
      title: "Event Creation Dashboard",
      description: "Create events with custom details, dates, locations, and participant limits. Clone previous events as templates.",
      details: [
        "Event name, description, and cover image",
        "Date, time, and timezone settings",
        "Event types (Tournament, Course, Meetup)",
        "Physical or online location",
        "Max seats and waitlist mode",
        "Clone previous events as templates"
      ]
    },
    {
      icon: Users,
      title: "Custom Signup Form Builder",
      description: "Build custom registration forms with fields, questions, and payment integration.",
      details: [
        "Choose which fields to include",
        "Custom questions (short answer, multiple choice)",
        "File upload capabilities",
        "Terms & conditions checkbox",
        "Payment integration (Stripe, Apple Pay, Google Pay)",
        "Auto-approval or manual approval mode"
      ]
    },
    {
      icon: Globe,
      title: "Shareable Smart Links",
      description: "Beautiful, shareable links that work everywhere with automatic landing pages.",
      details: [
        "Unique Signium links (signium.app/event/techconf2025)",
        "Social media optimized sharing",
        "Embeddable on websites",
        "Mini landing page with event info",
        "Countdown timers and theme colors",
        "Mobile-responsive design"
      ]
    },
    {
      icon: BarChart3,
      title: "Participant Management",
      description: "Complete dashboard to manage participants, export data, and track attendance.",
      details: [
        "View all participants with filters",
        "Export to Excel/CSV",
        "Mass email and updates",
        "Approve or deny signups",
        "Check-in system for events",
        "Attendance analytics"
      ]
    },
    {
      icon: TrendingUp,
      title: "Smart Event Analytics",
      description: "Track performance with AI-generated insights and engagement analytics.",
      details: [
        "Signup tracking over time",
        "Conversion rate analysis",
        "Traffic source tracking",
        "Engagement analytics",
        "AI-generated insights",
        "Performance recommendations"
      ]
    },
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Signium AI helps optimize your events with smart suggestions and automation.",
      details: [
        "Optimal event titles and descriptions",
        "Email invitation suggestions",
        "Social media captions",
        "Spam detection",
        "Optimal date/time suggestions",
        "Audience engagement insights"
      ]
    }
  ];

  const useCases = [
    {
      icon: Trophy,
      title: "Gaming Tournaments",
      description: "128-player tournaments with auto brackets and live scoring",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Online Courses",
      description: "Student registration with file submissions and progress tracking",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Sports Leagues",
      description: "Team management and participant coordination",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageSquare,
      title: "Workshops & Conferences",
      description: "Collect info, payments, and track attendance seamlessly",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Star,
      title: "Talent Contests",
      description: "Custom questions and file uploads for auditions",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Calendar,
      title: "Meetups & Events",
      description: "Local community events with easy registration",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      company: "TechMeetups",
      content: "Signium transformed how we manage our events. The custom forms and analytics are incredible!",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Mike Chen",
      role: "Tournament Director",
      company: "Gaming League",
      content: "Perfect for gaming tournaments. The bracket system and participant management is top-notch.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Course Creator",
      company: "EduPlatform",
      content: "The AI assistant helps me create better event descriptions and the analytics are so detailed.",
      rating: 5,
      avatar: "👩‍🏫"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Signium
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#use-cases" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Use Cases</a>
                <a href="#pricing" className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <Link href="/signium/dashboard" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Create. Share. Join.
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                  Seamlessly.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                The next-generation platform for creating, managing, and sharing events, tournaments, and courses. 
                Think Linktree + Google Forms + Eventbrite + Calendly, all in one beautiful app.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/signium/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Creating Events
                  <ArrowRight className="ml-2 w-5 h-5 inline" />
                </Link>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-purple-600 hover:text-purple-600 transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, manage, and share amazing events
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature Tabs */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      activeFeature === index
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gray-200'
                    }`}>
                      <feature.icon className={`w-6 h-6 ${
                        activeFeature === index ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Details */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                    {React.createElement(features[activeFeature].icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{features[activeFeature].title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{features[activeFeature].description}</p>
                <ul className="space-y-3">
                  {features[activeFeature].details.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect For Every Event</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From gaming tournaments to online courses, Signium adapts to your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${useCase.color} rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6`}>
                  <useCase.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of event organizers who trust Signium
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                <div className="flex items-center">
                  <div className="text-2xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-purple-600 text-sm font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Amazing Events?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of organizers who use Signium to create, share, and manage their events seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signium/dashboard"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Signium</h3>
              <p className="text-gray-400 mb-4">
                Create. Share. Join. Seamlessly.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Event Creation</li>
                <li>Custom Forms</li>
                <li>Analytics</li>
                <li>AI Assistant</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Use Cases</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Gaming Tournaments</li>
                <li>Online Courses</li>
                <li>Sports Leagues</li>
                <li>Workshops</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>API Docs</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Signium by Fac Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
