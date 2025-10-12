'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Copy, 
  Share2,
  Clock,
  MapPin,
  Trophy,
  BookOpen,
  Users2,
  Zap,
  TrendingUp,
  Download,
  Mail,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  ArrowUpRight,
  Bot,
  MessageSquare
} from 'lucide-react';

interface Event {
  id: number;
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: string;
  coverImage: string;
}

export default function SigniumDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Conference 2024",
      type: "Conference",
      date: "2024-03-15",
      time: "09:00",
      location: "San Francisco, CA",
      participants: 245,
      maxParticipants: 500,
      status: "active",
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Gaming Tournament",
      type: "Tournament",
      date: "2024-03-20",
      time: "14:00",
      location: "Online",
      participants: 128,
      maxParticipants: 128,
      status: "full",
      coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Web Development Course",
      type: "Course",
      date: "2024-04-01",
      time: "10:00",
      location: "Online",
      participants: 67,
      maxParticipants: 100,
      status: "active",
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
    }
  ]);

  // Event handlers
  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const confirmDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setShowDeleteModal(false);
      setSelectedEvent(null);
    }
  };

  const handleViewEvent = (event: Event) => {
    // Navigate to event details page or show event info
    alert(`Viewing event: ${event.name}`);
  };

  const handleShareEvent = (event: Event) => {
    // Copy event link to clipboard
    const eventLink = `https://signium.app/event/${event.id}`;
    navigator.clipboard.writeText(eventLink);
    alert(`Event link copied to clipboard: ${eventLink}`);
  };

  const handleCreateEvent = () => {
    // Add new event logic here
    const newEvent: Event = {
      id: Date.now(),
      name: "New Event",
      type: "Conference",
      date: "2024-04-15",
      time: "10:00",
      location: "TBD",
      participants: 0,
      maxParticipants: 100,
      status: "active",
      coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop"
    };
    setEvents([...events, newEvent]);
    setShowCreateModal(false);
  };

  const analytics = {
    totalEvents: 12,
    totalParticipants: 1250,
    conversionRate: 68,
    revenue: 15420
  };

  const recentActivity = [
    { type: 'signup', message: 'John Doe signed up for Tech Conference 2024', time: '2 minutes ago' },
    { type: 'payment', message: 'Payment received from Sarah Wilson', time: '5 minutes ago' },
    { type: 'event', message: 'Gaming Tournament is now full', time: '1 hour ago' },
    { type: 'message', message: 'New message from participant', time: '2 hours ago' }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'Tournament': return Trophy;
      case 'Course': return BookOpen;
      case 'Conference': return Users2;
      default: return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'full': return 'bg-orange-100 text-orange-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/signium" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Signium
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your events, track analytics, and engage with participants</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalEvents}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Participants</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalParticipants}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.conversionRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${analytics.revenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'events', label: 'Events', icon: Calendar },
                    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                    { id: 'participants', label: 'Participants', icon: Users },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'events' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Your Events</h2>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Event
                      </button>
                    </div>

                    <div className="space-y-4">
                      {events.map((event) => {
                        const EventIcon = getEventTypeIcon(event.type);
                        return (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden">
                                  <Image src={event.coverImage} alt={event.name} width={64} height={64} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                    <div className="flex items-center">
                                      <EventIcon className="w-4 h-4 mr-1" />
                                      {event.type}
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      {event.date}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {event.time}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 mr-1" />
                                      {event.location}
                                    </div>
                                  </div>
                                  <div className="flex items-center mt-2">
                                    <span className="text-sm text-gray-600">
                                      {event.participants}/{event.maxParticipants} participants
                                    </span>
                                    <div className="ml-4">
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                                        {event.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={() => handleViewEvent(event)}
                                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                  title="View Event"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleEditEvent(event)}
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                  title="Edit Event"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleShareEvent(event)}
                                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                                  title="Share Event"
                                >
                                  <Share2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteEvent(event)}
                                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                  title="Delete Event"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Views</span>
                            <span className="font-semibold">2,450</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Sign-ups</span>
                            <span className="font-semibold">440</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Conversion Rate</span>
                            <span className="font-semibold text-green-600">18%</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Tracking</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">This Month</span>
                            <span className="font-semibold">$5,420</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Last Month</span>
                            <span className="font-semibold">$4,890</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Growth</span>
                            <span className="font-semibold text-green-600">+11%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'participants' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Participant Management</h2>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">JD</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">John Doe</p>
                              <p className="text-sm text-gray-600">john@example.com</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              Confirmed
                            </span>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="John Doe" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="john@example.com" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Create New Event</span>
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('participants');
                    alert('Navigate to participant invitation');
                  }}
                  className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Invite Participants</span>
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('analytics');
                    alert('Navigate to analytics dashboard');
                  }}
                  className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700">View Analytics</span>
                </button>
                <button 
                  onClick={() => alert('AI Assistant: How can I help you optimize your events today?')}
                  className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Bot className="w-5 h-5 text-pink-600 mr-3" />
                  <span className="text-gray-700">AI Assistant</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-700">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Get suggestions for better event titles, descriptions, and optimal timing.
              </p>
              <button 
                onClick={() => alert('AI Assistant: I can help you with:\n\n• Optimize event titles and descriptions\n• Suggest best times for your events\n• Generate social media captions\n• Analyze participant engagement\n• Detect potential spam signups\n\nWhat would you like help with?')}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Event</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="Enter event name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Tournament</option>
                    <option>Course</option>
                    <option>Conference</option>
                    <option>Meetup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCreateEvent}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Edit Event Modal */}
        <AnimatePresence>
          {showEditModal && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Event</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                      defaultValue={selectedEvent.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="Tournament" selected={selectedEvent.type === 'Tournament'}>Tournament</option>
                      <option value="Course" selected={selectedEvent.type === 'Course'}>Course</option>
                      <option value="Conference" selected={selectedEvent.type === 'Conference'}>Conference</option>
                      <option value="Meetup" selected={selectedEvent.type === 'Meetup'}>Meetup</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                      defaultValue={selectedEvent.date}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input 
                      type="time" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                      defaultValue={selectedEvent.time}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                      defaultValue={selectedEvent.location}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                      defaultValue={selectedEvent.maxParticipants}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        alert('Event updated successfully!');
                        setShowEditModal(false);
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                    >
                      Update Event
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Event</h2>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete &quot;{selectedEvent.name}&quot;? This action cannot be undone.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={confirmDeleteEvent}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}
