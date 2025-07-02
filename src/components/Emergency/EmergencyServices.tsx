import React, { useState } from 'react';
import { Phone, MapPin, AlertTriangle, Heart, Shield, Car, Users, Clock } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { EmergencyContact } from '../../types';

interface EmergencyServicesProps {
  onClose: () => void;
}

export const EmergencyServices: React.FC<EmergencyServicesProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [emergencyType, setEmergencyType] = useState<string>('');

  // Kenya-specific emergency contacts
  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Kenya Police Service',
      type: 'police',
      phoneNumber: '999',
      available24h: true,
      accessibilitySupport: false,
      languages: ['English', 'Swahili'],
      county: 'National'
    },
    {
      id: '2',
      name: 'Kenya Red Cross Ambulance',
      type: 'medical',
      phoneNumber: '1199',
      available24h: true,
      accessibilitySupport: true,
      languages: ['English', 'Swahili'],
      county: 'National'
    },
    {
      id: '3',
      name: 'St. John Ambulance Kenya',
      type: 'medical',
      phoneNumber: '020 2210000',
      available24h: true,
      accessibilitySupport: true,
      languages: ['English', 'Swahili'],
      county: 'National'
    },
    {
      id: '4',
      name: 'Kenya Fire Brigade',
      type: 'fire',
      phoneNumber: '999',
      available24h: true,
      accessibilitySupport: false,
      languages: ['English', 'Swahili'],
      county: 'National'
    },
    {
      id: '5',
      name: 'Disability Rights Advocacy Centre (DRAC)',
      type: 'disability-support',
      phoneNumber: '020 2730338',
      available24h: false,
      accessibilitySupport: true,
      languages: ['English', 'Swahili', 'Sign Language'],
      county: 'Nairobi'
    },
    {
      id: '6',
      name: 'Kenya Association of the Intellectually Handicapped (KAIH)',
      type: 'disability-support',
      phoneNumber: '020 2714502',
      available24h: false,
      accessibilitySupport: true,
      languages: ['English', 'Swahili'],
      county: 'Nairobi'
    },
    {
      id: '7',
      name: 'Kenya Union of the Blind (KUB)',
      type: 'disability-support',
      phoneNumber: '020 2720392',
      available24h: false,
      accessibilitySupport: true,
      languages: ['English', 'Swahili', 'Braille'],
      county: 'Nairobi'
    },
    {
      id: '8',
      name: 'Kenya National Association of the Deaf (KNAD)',
      type: 'disability-support',
      phoneNumber: '020 2714502',
      available24h: false,
      accessibilitySupport: true,
      languages: ['Sign Language', 'English', 'Swahili'],
      county: 'Nairobi'
    }
  ];

  const emergencyTypes = [
    {
      id: 'medical',
      label: 'Medical Emergency',
      icon: <Heart className="w-6 h-6 text-red-600" />,
      description: 'Serious injury, illness, or health crisis',
      priority: 'critical'
    },
    {
      id: 'police',
      label: 'Security Emergency',
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      description: 'Crime, violence, or security threat',
      priority: 'high'
    },
    {
      id: 'fire',
      label: 'Fire Emergency',
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      description: 'Fire, explosion, or hazardous materials',
      priority: 'critical'
    },
    {
      id: 'transport',
      label: 'Transport Emergency',
      icon: <Car className="w-6 h-6 text-purple-600" />,
      description: 'Stranded, accident, or transport breakdown',
      priority: 'medium'
    },
    {
      id: 'disability-support',
      label: 'Disability Support',
      icon: <Users className="w-6 h-6 text-green-600" />,
      description: 'Accessibility crisis or disability-related emergency',
      priority: 'high'
    }
  ];

  const quickActions = [
    {
      id: 'call-999',
      label: 'Call 999 (Police/Fire)',
      action: () => window.open('tel:999'),
      variant: 'danger' as const,
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: 'call-1199',
      label: 'Call 1199 (Red Cross)',
      action: () => window.open('tel:1199'),
      variant: 'danger' as const,
      icon: <Heart className="w-5 h-5" />
    },
    {
      id: 'share-location',
      label: 'Share My Location',
      action: () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const location = `${position.coords.latitude},${position.coords.longitude}`;
            speak(`Your location is ${location}`);
          });
        }
      },
      variant: 'primary' as const,
      icon: <MapPin className="w-5 h-5" />
    }
  ];

  const handleEmergencyCall = (contact: EmergencyContact) => {
    speak(`Calling ${contact.name}`);
    window.open(`tel:${contact.phoneNumber}`);
  };

  const handleEmergencyTypeSelect = (type: string) => {
    setEmergencyType(type);
    speak(`Selected ${type} emergency`);
  };

  const getContactsByType = (type: string) => {
    return emergencyContacts.filter(contact => contact.type === type);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Emergency Services</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close emergency services"
        >
          Close
        </AccessibleButton>
      </div>

      {/* Quick Emergency Actions */}
      <AccessibleCard title="Quick Emergency Actions" priority="high" className="mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <AccessibleButton
              key={action.id}
              onClick={action.action}
              variant={action.variant}
              size="lg"
              fullWidth
              ariaLabel={action.label}
              icon={action.icon}
            >
              {action.label}
            </AccessibleButton>
          ))}
        </div>
        <div className="mt-4 bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-800">
            <strong>In case of immediate danger:</strong> Call 999 for police or fire emergencies, 
            or 1199 for medical emergencies. These services are available 24/7 across Kenya.
          </p>
        </div>
      </AccessibleCard>

      {/* Emergency Type Selection */}
      <AccessibleCard title="Select Emergency Type" className="mb-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyTypes.map((type) => (
            <AccessibleCard
              key={type.id}
              clickable
              onClick={() => handleEmergencyTypeSelect(type.id)}
              ariaLabel={`Select ${type.label}`}
              className={`text-center ${emergencyType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
              priority={type.priority as any}
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {type.icon}
                </div>
                <h3 className="font-semibold">{type.label}</h3>
                <p className="text-sm text-gray-600 text-center">{type.description}</p>
              </div>
            </AccessibleCard>
          ))}
        </div>
      </AccessibleCard>

      {/* Emergency Contacts */}
      {emergencyType && (
        <AccessibleCard title={`${emergencyTypes.find(t => t.id === emergencyType)?.label} Contacts`} className="mb-6">
          <div className="space-y-4">
            {getContactsByType(emergencyType).map((contact) => (
              <div key={contact.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{contact.name}</h4>
                    <p className="text-gray-600">{contact.county}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {contact.available24h && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        24/7
                      </span>
                    )}
                    {contact.accessibilitySupport && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Accessible
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Languages: {contact.languages.join(', ')}
                    </p>
                    <p className="text-lg font-mono font-semibold">{contact.phoneNumber}</p>
                  </div>
                  <AccessibleButton
                    onClick={() => handleEmergencyCall(contact)}
                    variant="danger"
                    size="lg"
                    ariaLabel={`Call ${contact.name}`}
                    icon={<Phone className="w-5 h-5" />}
                  >
                    Call Now
                  </AccessibleButton>
                </div>
              </div>
            ))}
          </div>
        </AccessibleCard>
      )}

      {/* All Emergency Contacts */}
      <AccessibleCard title="All Emergency Contacts">
        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold">{contact.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span className="capitalize">{contact.type.replace('-', ' ')}</span>
                    <span>{contact.county}</span>
                    <span className="font-mono">{contact.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {contact.available24h && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        24/7 Available
                      </span>
                    )}
                    {contact.accessibilitySupport && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Accessibility Support
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Languages: {contact.languages.join(', ')}
                  </p>
                </div>
                <AccessibleButton
                  onClick={() => handleEmergencyCall(contact)}
                  variant="primary"
                  size="md"
                  ariaLabel={`Call ${contact.name}`}
                  icon={<Phone className="w-4 h-4" />}
                >
                  Call
                </AccessibleButton>
              </div>
            </div>
          ))}
        </div>
      </AccessibleCard>

      {/* Emergency Preparedness Tips */}
      <AccessibleCard title="Emergency Preparedness for People with Disabilities" className="mt-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Before an Emergency:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Keep emergency contacts in your phone and written down</li>
                <li>• Register with your local emergency services</li>
                <li>• Keep extra medication and medical supplies</li>
                <li>• Have backup power for assistive devices</li>
                <li>• Plan evacuation routes from your home/workplace</li>
                <li>• Keep copies of important documents</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">During an Emergency:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Stay calm and follow your emergency plan</li>
                <li>• Call emergency services immediately if needed</li>
                <li>• Inform responders about your disability and needs</li>
                <li>• Use your emergency communication device</li>
                <li>• Stay with your service animal if you have one</li>
                <li>• Follow evacuation instructions from authorities</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Important for Kenya:</h4>
            <p className="text-sm text-yellow-800">
              Register with your County Emergency Response Team and ensure they know about your 
              accessibility needs. Keep your NCPWD disability card with you for identification 
              and to help emergency responders understand your needs.
            </p>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );
};