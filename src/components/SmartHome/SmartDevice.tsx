import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { SmartDevice as SmartDeviceType } from '../../types';
import { Volume2, Zap, Settings } from 'lucide-react';

interface SmartDeviceProps {
  device: SmartDeviceType;
  onControl: (deviceId: string) => void;
  onSettings: (deviceId: string) => void;
}

export const SmartDevice: React.FC<SmartDeviceProps> = ({ device, onControl, onSettings }) => {
  const { speak } = useAccessibility();

  const getDeviceTypeLabel = (type: string) => {
    return type.replace('-', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'disconnected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-gray-900">{device.name}</h4>
            <p className="text-gray-600">{device.brand}</p>
            <p className="text-sm text-gray-500 capitalize">{getDeviceTypeLabel(device.type)}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(device.status)}`}>
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
            onClick={() => onControl(device.id)}
            variant="primary"
            size="md"
            ariaLabel={`Control ${device.name}`}
          >
            Control
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onSettings(device.id)}
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
  );
};