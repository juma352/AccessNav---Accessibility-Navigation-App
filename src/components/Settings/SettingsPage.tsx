import React, { useState } from 'react';
import { Settings, Volume2, Eye, Smartphone, Globe, Shield, Bell, Download } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface SettingsPageProps {
  onClose: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onClose }) => {
  const { preferences, updatePreferences, speak } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'accessibility' | 'language' | 'privacy' | 'notifications' | 'offline'>('accessibility');

  const handleTabChange = (tab: 'accessibility' | 'language' | 'privacy' | 'notifications' | 'offline') => {
    setActiveTab(tab);
    speak(`Switched to ${tab} settings`);
  };

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
    speak(`${key} updated`);
  };

  const renderAccessibilitySettings = () => (
    <div className="space-y-6">
      <AccessibleCard title="Display Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Font Size
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['small', 'medium', 'large', 'extra-large'].map((size) => (
                <AccessibleButton
                  key={size}
                  onClick={() => handlePreferenceChange('fontSize', size)}
                  variant={preferences.fontSize === size ? 'primary' : 'secondary'}
                  size="md"
                  ariaLabel={`Set font size to ${size}`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}
                </AccessibleButton>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Contrast Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['normal', 'high', 'extra-high'].map((contrast) => (
                <AccessibleButton
                  key={contrast}
                  onClick={() => handlePreferenceChange('contrast', contrast)}
                  variant={preferences.contrast === contrast ? 'primary' : 'secondary'}
                  size="md"
                  ariaLabel={`Set contrast to ${contrast}`}
                >
                  {contrast.charAt(0).toUpperCase() + contrast.slice(1).replace('-', ' ')}
                </AccessibleButton>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Color Scheme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['light', 'dark', 'auto'].map((scheme) => (
                <AccessibleButton
                  key={scheme}
                  onClick={() => handlePreferenceChange('colorScheme', scheme)}
                  variant={preferences.colorScheme === scheme ? 'primary' : 'secondary'}
                  size="md"
                  ariaLabel={`Set color scheme to ${scheme}`}
                >
                  {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                </AccessibleButton>
              ))}
            </div>
          </div>
        </div>
      </AccessibleCard>

      <AccessibleCard title="Interaction Settings">
        <div className="space-y-4">
          {[
            { key: 'voiceGuidance', label: 'Voice Guidance', description: 'Spoken navigation instructions and feedback' },
            { key: 'hapticFeedback', label: 'Haptic Feedback', description: 'Vibration feedback for interactions' },
            { key: 'autoZoom', label: 'Auto Zoom', description: 'Automatically zoom in on important content' },
            { key: 'slowNavigation', label: 'Slower Navigation', description: 'Reduce animation speed and timing' },
          ].map((option) => (
            <AccessibleCard
              key={option.key}
              clickable
              onClick={() => handlePreferenceChange(option.key, !preferences[option.key as keyof typeof preferences])}
              ariaLabel={`${preferences[option.key as keyof typeof preferences] ? 'Disable' : 'Enable'} ${option.label}`}
              className={`${preferences[option.key as keyof typeof preferences] ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{option.label}</h4>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors ${
                  preferences[option.key as keyof typeof preferences] ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    preferences[option.key as keyof typeof preferences] ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>
            </AccessibleCard>
          ))}
        </div>
      </AccessibleCard>
    </div>
  );

  const renderLanguageSettings = () => (
    <div className="space-y-6">
      <AccessibleCard title="Language Preferences">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Interface Language
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { code: 'english', name: 'English', native: 'English' },
                { code: 'swahili', name: 'Swahili', native: 'Kiswahili' },
                { code: 'kikuyu', name: 'Kikuyu', native: 'Gĩkũyũ' },
                { code: 'luo', name: 'Luo', native: 'Dholuo' },
                { code: 'luhya', name: 'Luhya', native: 'Luluhya' },
                { code: 'kamba', name: 'Kamba', native: 'Kikamba' },
              ].map((lang) => (
                <AccessibleCard
                  key={lang.code}
                  clickable
                  onClick={() => handlePreferenceChange('language', lang.code)}
                  ariaLabel={`Set language to ${lang.name}`}
                  className={`${preferences.language === lang.code ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                >
                  <div className="text-center">
                    <h4 className="font-medium">{lang.name}</h4>
                    <p className="text-gray-600 text-sm">{lang.native}</p>
                  </div>
                </AccessibleCard>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Voice Guidance Languages</h4>
            <p className="text-sm text-blue-800 mb-3">
              Voice guidance is available in English and Swahili. Other languages will use English voice guidance.
            </p>
            <AccessibleButton
              onClick={() => speak('Testing voice guidance in current language')}
              variant="secondary"
              size="sm"
              ariaLabel="Test voice guidance"
              icon={<Volume2 className="w-4 h-4" />}
            >
              Test Voice
            </AccessibleButton>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <AccessibleCard title="Data Privacy">
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              { key: 'shareLocation', label: 'Share Location Data', description: 'Allow sharing of anonymized location data to improve accessibility mapping' },
              { key: 'shareReports', label: 'Share Community Reports', description: 'Allow your accessibility reports to be visible to other users' },
              { key: 'analytics', label: 'Usage Analytics', description: 'Help improve AccessNav by sharing anonymous usage data' },
              { key: 'marketing', label: 'Marketing Communications', description: 'Receive updates about new features and accessibility resources' },
            ].map((option) => (
              <div key={option.key} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  id={option.key}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  defaultChecked={true}
                />
                <div className="flex-1">
                  <label htmlFor={option.key} className="font-medium text-gray-900 cursor-pointer">
                    {option.label}
                  </label>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Data Protection</h4>
            <p className="text-sm text-yellow-800 mb-3">
              Your personal data is encrypted and stored securely. You can download or delete your data at any time.
            </p>
            <div className="flex gap-3">
              <AccessibleButton
                onClick={() => speak('Downloading your data')}
                variant="secondary"
                size="sm"
                ariaLabel="Download your data"
                icon={<Download className="w-4 h-4" />}
              >
                Download Data
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Opening data deletion options')}
                variant="secondary"
                size="sm"
                ariaLabel="Delete your data"
              >
                Delete Data
              </AccessibleButton>
            </div>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <AccessibleCard title="Notification Preferences">
        <div className="space-y-4">
          {[
            { key: 'emergencyAlerts', label: 'Emergency Alerts', description: 'Critical safety and emergency notifications', enabled: true },
            { key: 'accessibilityUpdates', label: 'Accessibility Updates', description: 'New accessible locations and route changes', enabled: true },
            { key: 'communityReports', label: 'Community Reports', description: 'New accessibility reports in your area', enabled: false },
            { key: 'jobOpportunities', label: 'Job Opportunities', description: 'New employment opportunities for PWDs', enabled: false },
            { key: 'healthReminders', label: 'Health Reminders', description: 'Medication and appointment reminders', enabled: false },
            { key: 'featureUpdates', label: 'Feature Updates', description: 'New app features and improvements', enabled: false },
          ].map((option) => (
            <div key={option.key} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <input
                type="checkbox"
                id={option.key}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                defaultChecked={option.enabled}
              />
              <div className="flex-1">
                <label htmlFor={option.key} className="font-medium text-gray-900 cursor-pointer">
                  {option.label}
                </label>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          ))}

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">Emergency Notifications</h4>
            <p className="text-sm text-red-800">
              Emergency alerts cannot be disabled as they are critical for your safety. 
              These include severe weather warnings, security alerts, and accessibility emergencies.
            </p>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  const renderOfflineSettings = () => (
    <div className="space-y-6">
      <AccessibleCard title="Offline Data Management">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Downloaded Maps</h4>
            <p className="text-sm text-gray-600 mb-4">
              Manage offline maps and accessibility data for areas with limited connectivity.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">Nairobi County</span>
                  <p className="text-sm text-gray-600">Downloaded 2 days ago • 45 MB</p>
                </div>
                <AccessibleButton
                  onClick={() => speak('Updating Nairobi offline data')}
                  variant="secondary"
                  size="sm"
                  ariaLabel="Update Nairobi offline data"
                >
                  Update
                </AccessibleButton>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">Mombasa County</span>
                  <p className="text-sm text-gray-600">Downloaded 1 week ago • 32 MB</p>
                </div>
                <AccessibleButton
                  onClick={() => speak('Updating Mombasa offline data')}
                  variant="secondary"
                  size="sm"
                  ariaLabel="Update Mombasa offline data"
                >
                  Update
                </AccessibleButton>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Auto-Download Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Auto-download for visited areas</span>
                <div className="w-12 h-6 bg-blue-600 rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 mt-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Download only on Wi-Fi</span>
                <div className="w-12 h-6 bg-blue-600 rounded-full">
                  <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 mt-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Storage Usage</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Offline Maps</span>
                <span>77 MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Accessibility Data</span>
                <span>23 MB</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Total</span>
                <span>100 MB</span>
              </div>
            </div>
            <AccessibleButton
              onClick={() => speak('Clearing offline data cache')}
              variant="secondary"
              size="sm"
              className="mt-3"
              ariaLabel="Clear offline data cache"
            >
              Clear Cache
            </AccessibleButton>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close settings"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'accessibility', label: 'Accessibility', icon: <Eye className="w-5 h-5" /> },
            { key: 'language', label: 'Language', icon: <Globe className="w-5 h-5" /> },
            { key: 'privacy', label: 'Privacy', icon: <Shield className="w-5 h-5" /> },
            { key: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
            { key: 'offline', label: 'Offline', icon: <Download className="w-5 h-5" /> },
          ].map((tab) => (
            <AccessibleButton
              key={tab.key}
              onClick={() => handleTabChange(tab.key as any)}
              variant={activeTab === tab.key ? 'primary' : 'secondary'}
              size="md"
              ariaLabel={`Switch to ${tab.label} settings`}
              className={`rounded-none border-b-2 ${
                activeTab === tab.key ? 'border-blue-500' : 'border-transparent'
              }`}
              icon={tab.icon}
            >
              {tab.label}
            </AccessibleButton>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'accessibility' && renderAccessibilitySettings()}
        {activeTab === 'language' && renderLanguageSettings()}
        {activeTab === 'privacy' && renderPrivacySettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'offline' && renderOfflineSettings()}
      </div>
    </div>
  );
};