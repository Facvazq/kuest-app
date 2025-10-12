'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Star, Users, Zap, Shield, Globe, Smartphone, BarChart3, Headphones, Award, TrendingUp, Clock, Target, Lightbulb, Rocket, Wrench, Gamepad2, Trophy } from 'lucide-react';
import Image from 'next/image';
import AnimatedGlobe from '@/components/AnimatedGlobe';

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@facsystems.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const openEmailClient = () => {
    window.location.href = 'mailto:hello@facsystems.com?subject=Business Inquiry&body=Hello Fac Systems, I would like to learn more about your services.';
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for individuals and small teams",
      features: [
        "Access to Kuest (Quiz Builder)",
        "Access to Signium (Tournament Platform)",
        "Basic analytics dashboard",
        "Community support",
        "Standard integrations",
        "Mobile app access",
        "Basic reporting",
        "Up to 3 team members"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "ONE",
      price: "$29",
      period: "/month",
      description: "Ideal for growing businesses and teams",
      features: [
        "Access to all Fac Systems apps",
        "Advanced analytics & insights",
        "Priority support",
        "Custom integrations",
        "Advanced reporting",
        "API access",
        "White-label options",
        "Up to 25 team members",
        "Advanced tournament features",
        "Custom quiz templates"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organizations and enterprises",
      features: [
        "Access to all Fac Systems apps",
        "Unlimited team members",
        "Custom analytics suite",
        "24/7 dedicated support",
        "Full API access",
        "Custom development",
        "SLA guarantee",
        "On-premise deployment",
        "Advanced security",
        "Custom branding",
        "Dedicated account manager",
        "Training & onboarding"
      ],
      popular: false,
      color: "from-green-500 to-green-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "99.9%", label: "Uptime Guarantee", icon: Shield },
    { number: "24/7", label: "Support Available", icon: Headphones },
    { number: "150+", label: "Countries Served", icon: Globe }
  ];

  const services = [
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native iOS and Android apps with cutting-edge technology and seamless user experiences.",
      stats: "95% client satisfaction rate"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Responsive, fast, and scalable web applications that drive business growth.",
      stats: "300% average performance improvement"
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      description: "Data-driven insights and analytics to help you make informed business decisions.",
      stats: "40% increase in operational efficiency"
    },
    {
      icon: Zap,
      title: "System Integration",
      description: "Seamlessly connect your existing systems and streamline your workflows.",
      stats: "60% reduction in manual processes"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content: "Fac Systems transformed our business operations. Their solutions increased our efficiency by 300% and reduced costs significantly.",
      rating: 5,
      company: "TechStart Inc."
    },
    {
      name: "Michael Chen",
      role: "CTO, Global Solutions",
      content: "The team at Fac Systems delivered exactly what we needed. Their expertise in system integration is unmatched.",
      rating: 5,
      company: "Global Solutions"
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director, InnovateCorp",
      content: "Outstanding service and support. Fac Systems helped us scale from 50 to 500 employees seamlessly.",
      rating: 5,
      company: "InnovateCorp"
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
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Fac Systems
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Services</a>
                <a href="#tools" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Tools</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                <button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                </button>
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
                Transform Your Business with
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Fac Systems
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                We deliver cutting-edge technology solutions that drive growth, increase efficiency, and scale your business operations. 
                Join 500+ companies that trust us with their digital transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 inline" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Global Reach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Serving businesses and individuals across the globe with our innovative technology solutions
            </p>
          </div>
          
          {/* Animated Globe */}
          <div className="mb-16">
            <AnimatedGlobe />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to accelerate your business growth and digital transformation
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                  {service.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful applications built by Fac Systems to help you create, engage, and grow your audience
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Kuest Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                Under Construction
              </div>
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kuest</h3>
              <p className="text-gray-600 mb-6">
                Interactive quiz builder that lets you create engaging quizzes, surveys, and assessments. 
                Perfect for education, marketing, and team building with real-time analytics and beautiful designs.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Drag & drop quiz builder</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Real-time analytics dashboard</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Custom branding & themes</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Multi-language support</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </motion.div>

            {/* Signium Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                Under Construction
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Signium</h3>
              <p className="text-gray-600 mb-6">
                Tournament and conquest platform that allows you to create competitive events, manage participants, 
                and track results. Perfect for gaming tournaments, sports events, and business competitions.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Tournament bracket management</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Player registration system</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Live score tracking</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                  <span>Prize & reward management</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Fac Systems?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With over 5 years of experience in the technology industry, we&apos;ve helped hundreds of businesses 
                transform their operations and achieve remarkable growth. Our team of expert developers, designers, 
                and consultants work tirelessly to deliver solutions that exceed expectations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Award-winning development team</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">24/7 dedicated support</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Custom solutions for every need</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Client Satisfaction</span>
                    <span className="font-bold">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Project Success Rate</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average ROI Increase</span>
                    <span className="font-bold">250%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Time to Market Reduction</span>
                    <span className="font-bold">60%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing options designed to scale with your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  plan.popular ? 'border-purple-500 scale-105' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 px-4 rounded-full text-sm font-semibold mb-6 -mt-4">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it - hear from the businesses we&apos;ve helped succeed
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  <div className="text-blue-600 text-sm font-medium">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let&apos;s discuss how Fac Systems can transform your business. Get in touch with our team today.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Transformation</h3>
                <p className="text-gray-600 mb-8">
                  Ready to take your business to the next level? Contact us today to discuss your project and discover how we can help you achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={copyEmail}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center"
                  >
                    {emailCopied ? 'Email Copied!' : 'Copy Email'}
                  </button>
                  <button
                    onClick={openEmailClient}
                    className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-200"
                  >
                    Send Email
                  </button>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                  Email: hello@facsystems.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Fac Systems</h3>
              <p className="text-gray-400 mb-4">
                Transforming businesses through innovative technology solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>System Integration</li>
                <li>Business Intelligence</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@facsystems.com</li>
                <li>+1 (555) 123-4567</li>
                <li>24/7 Support Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Fac Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}