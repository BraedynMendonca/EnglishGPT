import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download,
  Trash2,
  Key,
  Monitor,
  Moon,
  Sun,
  Volume2,
  Eye,
  Lock,
  Mail,
  Smartphone,
  CreditCard,
  Award,
  HelpCircle,
  ExternalLink,
  ArrowLeft,
  Save,
  CheckCircle
} from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    desktop: true,
    analysis: true,
    practice: false,
    achievements: true
  });
  const [profileData, setProfileData] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate writer and English language enthusiast. Currently improving my business writing skills with EnglishGPT.'
  });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'preferences', name: 'Preferences', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'support', name: 'Support', icon: HelpCircle },
  ];

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-UK', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'en-AU', name: 'English (Australia)', flag: '🇦🇺' },
    { code: 'en-CA', name: 'English (Canada)', flag: '🇨🇦' },
  ];

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    // In a real app, this would open a password change modal
    alert('Password change functionality would be implemented here');
  };

  const handleEnable2FA = () => {
    // In a real app, this would start 2FA setup process
    alert('Two-factor authentication setup would be implemented here');
  };

  const handleDownloadData = () => {
    // In a real app, this would trigger data export
    alert('Data download would be initiated here');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // In a real app, this would delete the account
      alert('Account deletion would be processed here');
    }
  };

  const handleUpgrade = () => {
    // In a real app, this would redirect to billing/upgrade page
    alert('Upgrade functionality would be implemented here');
  };

  const handleSendFeedback = () => {
    // In a real app, this would send feedback to backend
    alert('Feedback sent successfully!');
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{user?.name}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <button className="mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm">
            Change Profile Picture
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          rows={4}
          value={profileData.bio}
          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleSaveProfile}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {showSaveSuccess && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex items-center space-x-2 animate-slide-up">
          <CheckCircle className="w-5 h-5" />
          <span>Profile updated successfully!</span>
        </div>
      )}
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
              <div>
                <p className="font-medium text-gray-900">Theme</p>
                <p className="text-sm text-gray-600">Choose your preferred theme</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setDarkMode(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  !darkMode ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setDarkMode(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  darkMode ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interface Language</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">English Variant</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Editor Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-save</p>
              <p className="text-sm text-gray-600">Automatically save changes while typing</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Real-time analysis</p>
              <p className="text-sm text-gray-600">Show writing suggestions as you type</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Sound effects</p>
              <p className="text-sm text-gray-600">Play sounds for achievements and completions</p>
            </div>
            <input type="checkbox" className="w-5 h-5 text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Email notifications</p>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.email}
              onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
              className="w-5 h-5 text-primary-600" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Push notifications</p>
                <p className="text-sm text-gray-600">Receive notifications on your device</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.push}
              onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
              className="w-5 h-5 text-primary-600" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Monitor className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Desktop notifications</p>
                <p className="text-sm text-gray-600">Show notifications on your desktop</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.desktop}
              onChange={(e) => setNotifications(prev => ({ ...prev, desktop: e.target.checked }))}
              className="w-5 h-5 text-primary-600" 
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What to notify me about</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Analysis completed</p>
              <p className="text-sm text-gray-600">When your document analysis is ready</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.analysis}
              onChange={(e) => setNotifications(prev => ({ ...prev, analysis: e.target.checked }))}
              className="w-5 h-5 text-primary-600" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Practice reminders</p>
              <p className="text-sm text-gray-600">Daily reminders to practice your writing</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.practice}
              onChange={(e) => setNotifications(prev => ({ ...prev, practice: e.target.checked }))}
              className="w-5 h-5 text-primary-600" 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Achievement unlocked</p>
              <p className="text-sm text-gray-600">When you earn new achievements</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.achievements}
              onChange={(e) => setNotifications(prev => ({ ...prev, achievements: e.target.checked }))}
              className="w-5 h-5 text-primary-600" 
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Key className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                </div>
              </div>
              <button 
                onClick={handleChangePassword}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Two-factor authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
              </div>
              <button 
                onClick={handleEnable2FA}
                className="bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-700 transition-colors"
              >
                Enable
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Share usage analytics</p>
              <p className="text-sm text-gray-600">Help us improve EnglishGPT by sharing anonymous usage data</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Personalized recommendations</p>
              <p className="text-sm text-gray-600">Use your writing history to provide better suggestions</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 text-primary-600" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button 
            onClick={handleDownloadData}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Download className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Download your data</p>
                <p className="text-sm text-gray-600">Get a copy of all your documents and analysis</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-between p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors text-red-600"
          >
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Delete account</p>
                <p className="text-sm">Permanently remove your account and all data</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Plan: {user?.plan === 'pro' ? 'Pro' : 'Free'}</h3>
            <p className="text-gray-600">
              {user?.plan === 'pro' 
                ? 'You have access to all premium features.' 
                : "You're currently on the free plan with limited features."
              }
            </p>
          </div>
          {user?.plan === 'free' && (
            <button 
              onClick={handleUpgrade}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all"
            >
              Upgrade to Pro
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-primary-600 mb-2">156</div>
            <p className="text-gray-600 text-sm">Documents Analyzed</p>
            <p className="text-xs text-gray-500 mt-1">{user?.plan === 'pro' ? 'Unlimited' : '25 remaining'}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-accent-600 mb-2">28</div>
            <p className="text-gray-600 text-sm">Documents Saved</p>
            <p className="text-xs text-gray-500 mt-1">{user?.plan === 'pro' ? 'Unlimited' : '2 remaining'}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-secondary-600 mb-2">∞</div>
            <p className="text-gray-600 text-sm">Practice Exercises</p>
            <p className="text-xs text-gray-500 mt-1">Unlimited</p>
          </div>
        </div>
      </div>

      {user?.plan === 'pro' && (
        <>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2025</p>
                </div>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Update
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Pro Plan - Monthly</p>
                  <p className="text-sm text-gray-600">December 1, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$19.99</p>
                  <button className="text-primary-600 hover:text-primary-700 text-sm">Download</button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Pro Plan - Monthly</p>
                  <p className="text-sm text-gray-600">November 1, 2024</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$19.99</p>
                  <button className="text-primary-600 hover:text-primary-700 text-sm">Download</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderSupportTab = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Help</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-3">
              <HelpCircle className="w-6 h-6 text-primary-600" />
              <h4 className="font-medium text-gray-900">Help Center</h4>
            </div>
            <p className="text-sm text-gray-600">Browse our comprehensive help articles and tutorials</p>
          </button>
          <button className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center space-x-3 mb-3">
              <Mail className="w-6 h-6 text-accent-600" />
              <h4 className="font-medium text-gray-900">Contact Support</h4>
            </div>
            <p className="text-sm text-gray-600">Send us a message and we'll get back to you within 24 hours</p>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="bg-gray-50 rounded-xl p-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Version</span>
            <span className="font-medium text-gray-900">2.1.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated</span>
            <span className="font-medium text-gray-900">December 15, 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Browser</span>
            <span className="font-medium text-gray-900">Chrome 120.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform</span>
            <span className="font-medium text-gray-900">Web Application</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback</h3>
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-gray-600 mb-4">Help us improve EnglishGPT by sharing your feedback.</p>
          <div className="space-y-4">
            <textarea
              rows={4}
              placeholder="Tell us what you think about EnglishGPT..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
            <button 
              onClick={handleSendFeedback}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:from-primary-600 hover:to-primary-700 transition-all"
            >
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'preferences': return renderPreferencesTab();
      case 'notifications': return renderNotificationsTab();
      case 'privacy': return renderPrivacyTab();
      case 'billing': return renderBillingTab();
      case 'support': return renderSupportTab();
      default: return renderProfileTab();
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-gray-600">Manage your account preferences and application settings.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;