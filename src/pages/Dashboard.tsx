import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDocuments } from '../contexts/DocumentContext';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  BookOpen,
  PenTool,
  FileText,
  Users,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Plus
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { documents, createDocument } = useDocuments();
  const navigate = useNavigate();

  const stats = [
    { 
      name: 'Writing Score', 
      value: '87%', 
      change: '+5%', 
      icon: TrendingUp,
      color: 'from-primary-500 to-primary-600'
    },
    { 
      name: 'Words Written', 
      value: '12,847', 
      change: '+1,234', 
      icon: PenTool,
      color: 'from-accent-500 to-accent-600'
    },
    { 
      name: 'Exercises Completed', 
      value: '156', 
      change: '+12', 
      icon: BookOpen,
      color: 'from-secondary-500 to-secondary-600'
    },
    { 
      name: 'Documents Saved', 
      value: documents.length.toString(), 
      change: '+3', 
      icon: FileText,
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const recentActivity = [
    { action: 'Completed essay analysis', time: '2 hours ago', type: 'analysis' },
    { action: 'Practiced grammar exercises', time: '1 day ago', type: 'practice' },
    { action: 'Saved "Business Proposal Draft"', time: '2 days ago', type: 'document' },
    { action: 'Generated content outline', time: '3 days ago', type: 'generation' },
  ];

  const achievements = [
    { title: 'Grammar Master', description: 'Completed 50 grammar exercises', icon: '🎯', earned: true },
    { title: 'Prolific Writer', description: 'Wrote over 10,000 words', icon: '✍️', earned: true },
    { title: 'Style Expert', description: 'Improved writing style score by 20%', icon: '🎨', earned: false },
    { title: 'Consistency Champion', description: 'Used EnglishGPT for 30 consecutive days', icon: '🏆', earned: false },
  ];

  const handleStartWriting = () => {
    const newDoc = createDocument('Untitled Document', '');
    navigate('/editor');
  };

  const handleNewDocument = () => {
    const newDoc = createDocument('New Document', '');
    navigate('/editor');
  };

  const handlePracticeGrammar = () => {
    navigate('/practice');
  };

  const handleUploadDocument = () => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt,.doc,.docx,.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const newDoc = createDocument(file.name, content);
          navigate('/editor');
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="mt-2 text-gray-600">Continue your writing journey and track your progress.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button 
            onClick={handleStartWriting}
            className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Start Writing</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-accent-600 text-sm font-medium mt-1">{stat.change} this week</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button 
              onClick={() => navigate('/documents')}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
            >
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={handleNewDocument}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl hover:from-primary-100 hover:to-secondary-100 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <PenTool className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="font-medium text-gray-900">New Document</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary-600 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handlePracticeGrammar}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-accent-50 to-accent-50 rounded-xl hover:from-accent-100 hover:to-accent-100 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-accent-600 mr-3" />
                  <span className="font-medium text-gray-900">Practice Grammar</span>
                </div>
                <ArrowRight className="w-4 h-4 text-accent-600 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleUploadDocument}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-50 rounded-xl hover:from-orange-100 hover:to-orange-100 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="font-medium text-gray-900">Upload Document</span>
                </div>
                <ArrowRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-accent-50' : 'bg-gray-50'
                }`}>
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <p className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.title}
                    </p>
                    <p className={`text-xs ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <Award className="w-5 h-5 text-accent-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Writing Progress</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">7 days</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">30 days</button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">90 days</button>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive progress chart will be displayed here</p>
            <p className="text-sm text-gray-500 mt-2">Track your writing improvements over time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;