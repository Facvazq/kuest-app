'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  Home, 
  Users, 
  BarChart3, 
  FileText,
  Save,
  X,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plane
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
  updatedAt: string;
  client?: string;
  budget?: number;
  deadline?: string;
}

interface AdminSettings {
  availabilityStatus: 'available' | 'unavailable' | 'vacation';
  vacationMessage?: string;
  unavailableMessage?: string;
  showContactForm: boolean;
  maintenanceMode: boolean;
}

export default function AdminConsole() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    availabilityStatus: 'available',
    showContactForm: true,
    maintenanceMode: false
  });
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    status: 'active',
    client: '',
    budget: 0,
    deadline: ''
  });
  const [loading, setLoading] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('admin-projects');
    const savedSettings = localStorage.getItem('admin-settings');
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('admin-projects', JSON.stringify(projects));
    }
  }, [projects]);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('admin-settings', JSON.stringify(settings));
  }, [settings]);

  const handleAuth = () => {
    if (authCode === 'builtforthisdev101') {
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } else {
      alert('Invalid access code');
    }
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleSaveProject = () => {
    if (!newProject.title || !newProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    const now = new Date().toISOString();
    
    if (editingProject) {
      // Update existing project
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...newProject, updatedAt: now }
          : p
      );
      setProjects(updatedProjects);
    } else {
      // Create new project
      const project: Project = {
        id: generateId(),
        title: newProject.title!,
        description: newProject.description!,
        status: newProject.status as 'active' | 'completed' | 'on-hold',
        createdAt: now,
        updatedAt: now,
        client: newProject.client,
        budget: newProject.budget,
        deadline: newProject.deadline
      };
      setProjects([...projects, project]);
    }

    // Reset form
    setNewProject({
      title: '',
      description: '',
      status: 'active',
      client: '',
      budget: 0,
      deadline: ''
    });
    setEditingProject(null);
    setShowProjectModal(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      status: project.status,
      client: project.client,
      budget: project.budget,
      deadline: project.deadline
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('admin-settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'unavailable':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'vacation':
        return <Plane className="w-4 h-4 text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available for Projects';
      case 'unavailable':
        return 'Unavailable for Projects';
      case 'vacation':
        return '🏝️ Vacation Mode';
      default:
        return 'Unknown';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'completed':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'on-hold':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <AnimatePresence>
          {showAuthModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="kuest-glass p-8 rounded-2xl max-w-md w-full mx-4"
            >
              <div className="text-center mb-6">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Admin Console</h1>
                <p className="text-white/70">Enter access code to continue</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="Enter access code"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAuth}
                  className="w-full kuest-gradient text-white px-6 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300"
                >
                  Access Admin Console
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <div className="flex items-center space-x-2 text-green-400">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Admin Console</span>
          </div>
        </nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Admin Console</h1>
          <p className="text-white/70 text-lg">Manage projects and site settings</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="kuest-glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Total Projects</p>
                <p className="text-2xl font-bold text-white">{projects.length}</p>
              </div>
              <FileText className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="kuest-glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-white">
                  {projects.filter(p => p.status === 'active').length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="kuest-glass p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Current Status</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(settings.availabilityStatus)}
                  <span className="text-white font-medium">
                    {getStatusText(settings.availabilityStatus)}
                  </span>
                </div>
              </div>
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="kuest-glass p-8 rounded-2xl mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-purple-400" />
            Site Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Availability Status
              </label>
              <select
                value={settings.availabilityStatus}
                onChange={(e) => setSettings({
                  ...settings,
                  availabilityStatus: e.target.value as 'available' | 'unavailable' | 'vacation'
                })}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
              >
                <option value="available">Available for Projects</option>
                <option value="unavailable">Unavailable for Projects</option>
                <option value="vacation">🏝️ Vacation Mode</option>
              </select>
            </div>
            
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Show Contact Form
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSettings({ ...settings, showContactForm: !settings.showContactForm })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.showContactForm ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.showContactForm ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
                <span className="text-white/80 text-sm">
                  {settings.showContactForm ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
          
          {(settings.availabilityStatus === 'vacation' || settings.availabilityStatus === 'unavailable') && (
            <div className="mt-6">
              <label className="block text-white/80 text-sm font-medium mb-2">
                Custom Message
              </label>
              <textarea
                value={settings.availabilityStatus === 'vacation' ? settings.vacationMessage || '' : settings.unavailableMessage || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  [settings.availabilityStatus === 'vacation' ? 'vacationMessage' : 'unavailableMessage']: e.target.value
                })}
                placeholder="Enter a custom message for visitors..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors h-24 resize-none"
              />
            </div>
          )}
          
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveSettings}
              className="kuest-gradient text-white px-6 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Settings
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="kuest-glass p-8 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FileText className="w-6 h-6 mr-3 text-green-400" />
              Projects
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProjectModal(true)}
              className="kuest-gradient text-white px-6 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Project
            </motion.button>
          </div>
          
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
              <p className="text-white/70 mb-6">Create your first project to get started</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowProjectModal(true)}
                className="kuest-gradient text-white px-6 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300"
              >
                Create First Project
              </motion.button>
            </div>
          ) : (
            <div className="grid gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-white/70 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-white/60">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                        {project.client && (
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            Client: {project.client}
                          </div>
                        )}
                        {project.budget && (
                          <div className="flex items-center">
                            <span className="mr-1">$</span>
                            Budget: ${project.budget.toLocaleString()}
                          </div>
                        )}
                        {project.deadline && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Deadline: {new Date(project.deadline).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProjectStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEditProject(project)}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {showProjectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="kuest-glass p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                    setNewProject({
                      title: '',
                      description: '',
                      status: 'active',
                      client: '',
                      budget: 0,
                      deadline: ''
                    });
                  }}
                  className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProject.title || ''}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors"
                    placeholder="Enter project title"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newProject.description || ''}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors h-24 resize-none"
                    placeholder="Enter project description"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      value={newProject.status || 'active'}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value as 'active' | 'completed' | 'on-hold' })}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                    >
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Client
                    </label>
                    <input
                      type="text"
                      value={newProject.client || ''}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="Client name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Budget ($)
                    </label>
                    <input
                      type="number"
                      value={newProject.budget || ''}
                      onChange={(e) => setNewProject({ ...newProject, budget: parseInt(e.target.value) || 0 })}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={newProject.deadline || ''}
                      onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                      className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowProjectModal(false);
                      setEditingProject(null);
                      setNewProject({
                        title: '',
                        description: '',
                        status: 'active',
                        client: '',
                        budget: 0,
                        deadline: ''
                      });
                    }}
                    className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveProject}
                    className="kuest-gradient text-white px-6 py-3 rounded-xl font-semibold kuest-glow kuest-glow-hover kuest-3d-hover transition-all duration-300"
                  >
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
