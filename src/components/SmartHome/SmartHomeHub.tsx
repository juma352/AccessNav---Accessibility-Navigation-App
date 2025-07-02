import React, { useState } from 'react';
import { Home, Lightbulb, Shield, Thermometer, Volume2, Accessibility, Zap, Settings } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { SmartDevice, Automation } from '../../types';

interface SmartHomeHubProps {
  onClose: () => void;
}

export const SmartHomeHub: React.FC<SmartHomeHubProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'devices' | 'automations' | 'accessibility' | 'setup'>('devices');

  // Mock data
  const smartDevices: SmartDevice[] = [
    {
      id: '1',
      name: 'Living Room Lights',
      type: 'lighting',
      brand: 'Philips Hue',
      accessibilityFeatures: ['Voice control', 'App control', 'Brightness adjustment'],
      voiceControl: true,
      appControl: true,
      automationCapable: true,
      status: 'connected',
    },
    {
      id: '2',
      name: 'Front Door Lock',
      type: 'security',
      brand: 'August',
      accessibilityFeatures: ['Voice unlock', 'Auto-unlock', 'Remote access'],
      voiceControl: true,
      appControl: true,
      automationCapable: true,
      status: 'connected',
    },
    {
      id: '3',
      name: 'Bedroom Thermostat',
      type: 'climate',
      brand: 'Nest',
      accessibilityFeatures: ['Voice control', 'Large display', 'Schedule automation'],
      voiceControl: true,
      appControl: true,
      automationCapable: true,
      status: 'connected',
    },
  ];

  const automations: Automation[] = [
    {
      id: '1',
      name: 'Morning Routine',
      trigger: 'Voice command: "Good morning"',
      actions: ['Turn on lights', 'Adjust thermostat', 'Read weather'],
      enabled: true,
      schedule: 'Weekdays 7:00 AM',
    },
    {
      id: '2',
      name: 'Bedtime Routine',
      trigger: 'Voice command: "Goodnight"',
      actions: ['Turn off all lights', 'Lock doors', 'Set thermostat to sleep mode'],
      enabled: true,
      schedule: 'Daily 10:00 PM',
    },
  ];

  const handleTabChange = (tab: 'devices' | 'automations' | 'accessibility' | 'setup') => {
    setActiveTab(tab);
    speak(`Switched to ${tab} section`);
  };

  const renderDevices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Connected Devices</h3>
        <AccessibleButton
          onClick={() => speak('Adding new smart device')}
          variant="primary"
          size="md"
          ariaLabel="Add new smart device"
          icon={<Home className="w-4 h-4" />}
        >
          Add Device
        </AccessibleButton>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {smartDevices.map((device) => (
          <AccessibleCard key={device.id} className="hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{device.name}</h4>
                  <p className="text-gray-600">{device.brand}</p>
                  <p className="text-sm text-gray-500 capitalize">{device.type}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  device.status === 'connected' ? 'bg-green-100 text-green-800' :
                  device.status === 'disconnected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {device.status}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Accessibility Features:</h5>
                <div className="flex flex-wrap gap-2">
                  {device.accessibilityFeatures.map((feature, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4" />
                  <span className={device.voiceControl ? 'text-green-600' : 'text-gray-400'}>
                    Voice Control
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  <span className={device.automationCapable ? 'text-green-600' : 'text-gray-400'}>
                    Automation
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <AccessibleButton
                  onClick={() => speak(`Controlling ${device.name}`)}
                  variant="primary"
                  size="md"
                  ariaLabel={`Control ${device.name}`}
                >
                  Control
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => speak(`Configuring ${device.name} settings`)}
                  variant="secondary"
                  size="md"
                  ariaLabel={`Configure ${device.name} settings`}
                  icon={<Settings className="w-4 h-4" />}
                >
                  Settings
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>
    </div>
  );

  const renderAutomations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Automations</h3>
        <AccessibleButton
          onClick={() => speak('Creating new automation')}
          variant="primary"
          size="md"
          ariaLabel="Create new automation"
          icon={<Zap className="w-4 h-4" />}
        >
          New Automation
        </AccessibleButton>
      </div>

      <div className="grid gap-6">
        {automations.map((automation) => (
          <AccessibleCard key={automation.id} className="hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{automation.name}</h4>
                  <p className="text-gray-600">{automation.trigger}</p>
                  {automation.schedule && (
                    <p className="text-sm text-gray-500">{automation.schedule}</p>
                  )}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  automation.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {automation.enabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Actions:</h5>
                <ul className="text-gray-700 space-y-1">
                  {automation.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <AccessibleButton
                  onClick={() => speak(`${automation.enabled ? 'Disabling' : 'Enabling'} ${automation.name}`)}
                  variant={automation.enabled ? "secondary" : "primary"}
                  size="md"
                  ariaLabel={`${automation.enabled ? 'Disable' : 'Enable'} ${automation.name}`}
                >
                  {automation.enabled ? 'Disable' : 'Enable'}
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => speak(`Editing ${automation.name} automation`)}
                  variant="secondary"
                  size="md"
                  ariaLabel={`Edit ${automation.name} automation`}
                >
                  Edit
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => speak(`Testing ${automation.name} automation`)}
                  variant="secondary"
                  size="md"
                  ariaLabel={`Test ${automation.name} automation`}
                >
                  Test
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>
    </div>
  );

  const renderAccessibility = () => (
    <div className="space-y-6">
      <AccessibleCard title="Accessibility-Focused Smart Home Features">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Lighting Assistance
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Motion-activated lighting for mobility assistance</li>
                <li>• Color-changing bulbs for visual cues</li>
                <li>• Gradual dimming for sleep routines</li>
                <li>• Emergency lighting activation</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-blue-600" />
                Audio Assistance
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Voice announcements for device status</li>
                <li>• Audio alerts for security events</li>
                <li>• Text-to-speech for notifications</li>
                <li>• Customizable voice commands</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Safety & Security
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Fall detection and emergency alerts</li>
                <li>• Medication reminders</li>
                <li>• Door/window monitoring</li>
                <li>• Emergency contact notifications</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-600" />
                Climate Control
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Temperature regulation for health conditions</li>
                <li>• Humidity control for respiratory needs</li>
                <li>• Air quality monitoring</li>
                <li>• Automated ventilation</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Recommended Accessibility Devices:</h4>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <AccessibleButton
                onClick={() => speak('Learning about voice assistants')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Learn about voice assistants"
              >
                Voice Assistants
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Learning about smart switches')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Learn about smart switches"
              >
                Smart Switches
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Learning about emergency systems')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Learn about emergency systems"
              >
                Emergency Systems
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Learning about medication dispensers')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Learn about medication dispensers"
              >
                Medication Dispensers
              </AccessibleButton>
            </div>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  const renderSetup = () => (
    <div className="space-y-6">
      <AccessibleCard title="Smart Home Setup Guide">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Getting Started</h4>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <h5 className="font-medium">Choose Your Hub</h5>
                  <p className="text-sm text-gray-600">Select a smart home hub that supports accessibility features</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <h5 className="font-medium">Start with Essential Devices</h5>
                  <p className="text-sm text-gray-600">Begin with lighting, security, and climate control</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <h5 className="font-medium">Configure Accessibility Settings</h5>
                  <p className="text-sm text-gray-600">Set up voice commands, visual cues, and automation</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <h5 className="font-medium">Test and Customize</h5>
                  <p className="text-sm text-gray-600">Fine-tune settings based on your specific needs</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recommended Hubs</h4>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <h5 className="font-medium">Amazon Echo</h5>
                  <p className="text-gray-600">Excellent voice control and accessibility features</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h5 className="font-medium">Google Nest Hub</h5>
                  <p className="text-gray-600">Visual interface with voice commands</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h5 className="font-medium">Apple HomePod</h5>
                  <p className="text-gray-600">Seamless integration with iOS accessibility</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Budget Planning</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Smart Hub:</span>
                  <span>$50 - $200</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart Lights (4-pack):</span>
                  <span>$40 - $100</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart Lock:</span>
                  <span>$100 - $300</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart Thermostat:</span>
                  <span>$100 - $250</span>
                </div>
                <div className="border-t pt-2 font-semibold">
                  <div className="flex justify-between">
                    <span>Total Starter Kit:</span>
                    <span>$290 - $850</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <AccessibleButton
              onClick={() => speak('Starting smart home setup wizard')}
              variant="primary"
              size="md"
              ariaLabel="Start smart home setup wizard"
            >
              Start Setup Wizard
            </AccessibleButton>
            <AccessibleButton
              onClick={() => speak('Finding local installation services')}
              variant="secondary"
              size="md"
              ariaLabel="Find local installation services"
            >
              Find Installer
            </AccessibleButton>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Smart Home Integration</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close smart home hub"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'devices', label: 'Devices', icon: <Home className="w-5 h-5" /> },
            { key: 'automations', label: 'Automations', icon: <Zap className="w-5 h-5" /> },
            { key: 'accessibility', label: 'Accessibility', icon: <Accessibility className="w-5 h-5" /> },
            { key: 'setup', label: 'Setup Guide', icon: <Settings className="w-5 h-5" /> },
          ].map((tab) => (
            <AccessibleButton
              key={tab.key}
              onClick={() => handleTabChange(tab.key as any)}
              variant={activeTab === tab.key ? 'primary' : 'secondary'}
              size="md"
              ariaLabel={`Switch to ${tab.label} tab`}
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
        {activeTab === 'devices' && renderDevices()}
        {activeTab === 'automations' && renderAutomations()}
        {activeTab === 'accessibility' && renderAccessibility()}
        {activeTab === 'setup' && renderSetup()}
      </div>
    </div>
  );
};