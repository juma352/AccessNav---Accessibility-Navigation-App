import React, { useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { AccessibilityProfile, DisabilityType, AccessibilityPreferences, AssistiveTechnology } from '../../types';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface AccessibilitySetupProps {
  onComplete: (profile: AccessibilityProfile) => void;
  onSkip: () => void;
}

export const AccessibilitySetup: React.FC<AccessibilitySetupProps> = ({
  onComplete,
  onSkip,
}) => {
  const { speak, updatePreferences } = useAccessibility();
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: '',
    disabilities: [] as DisabilityType[],
    preferences: {
      fontSize: 'medium',
      contrast: 'normal',
      colorScheme: 'auto',
      voiceGuidance: true,
      hapticFeedback: true,
      autoZoom: false,
      slowNavigation: false,
    } as AccessibilityPreferences,
    assistiveTech: [] as AssistiveTechnology[],
  });

  const disabilityOptions = [
    {
      category: 'mobility' as const,
      label: 'Mobility',
      description: 'Wheelchair use, walking difficulties, limited mobility',
      examples: ['Wheelchair user', 'Walking with cane', 'Limited mobility'],
    },
    {
      category: 'visual' as const,
      label: 'Visual',
      description: 'Blindness, low vision, color blindness',
      examples: ['Screen reader user', 'Low vision', 'Color blind'],
    },
    {
      category: 'hearing' as const,
      label: 'Hearing',
      description: 'Deafness, hard of hearing, audio processing',
      examples: ['Deaf', 'Hard of hearing', 'Audio processing issues'],
    },
    {
      category: 'cognitive' as const,
      label: 'Cognitive',
      description: 'Learning disabilities, memory issues, attention difficulties',
      examples: ['Memory issues', 'Attention difficulties', 'Learning disabilities'],
    },
    {
      category: 'multiple' as const,
      label: 'Multiple',
      description: 'Combination of different accessibility needs',
      examples: ['Multiple disabilities', 'Complex needs'],
    },
  ];

  const assistiveTechOptions = [
    { type: 'screenReader' as const, name: 'Screen Reader', description: 'NVDA, JAWS, VoiceOver, etc.' },
    { type: 'voiceControl' as const, name: 'Voice Control', description: 'Dragon, Voice Access, etc.' },
    { type: 'switch' as const, name: 'Switch Navigation', description: 'Single or multiple switch control' },
    { type: 'eyeTracking' as const, name: 'Eye Tracking', description: 'Tobii, Eye Gaze systems' },
    { type: 'other' as const, name: 'Other', description: 'Custom or specialized assistive technology' },
  ];

  const handleDisabilityToggle = (category: DisabilityType['category']) => {
    const exists = profileData.disabilities.some(d => d.category === category);
    if (exists) {
      setProfileData(prev => ({
        ...prev,
        disabilities: prev.disabilities.filter(d => d.category !== category),
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        disabilities: [...prev.disabilities, {
          category,
          severity: 'moderate',
          specificNeeds: [],
        }],
      }));
    }
  };

  const handleAssistiveTechToggle = (tech: AssistiveTechnology) => {
    const exists = profileData.assistiveTech.some(t => t.type === tech.type);
    if (exists) {
      setProfileData(prev => ({
        ...prev,
        assistiveTech: prev.assistiveTech.filter(t => t.type !== tech.type),
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        assistiveTech: [...prev.assistiveTech, tech],
      }));
    }
  };

  const handlePreferenceChange = (key: keyof AccessibilityPreferences, value: any) => {
    setProfileData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
    updatePreferences({ [key]: value });
  };

  const handleComplete = () => {
    const profile: AccessibilityProfile = {
      id: Date.now().toString(),
      name: profileData.name || 'My Profile',
      disabilities: profileData.disabilities,
      preferences: profileData.preferences,
      assistiveTech: profileData.assistiveTech,
    };
    onComplete(profile);
    speak('Accessibility profile created successfully');
  };

  const handleNext = () => {
    setStep(step + 1);
    speak(`Step ${step + 1} of 4`);
  };

  const handlePrevious = () => {
    setStep(step - 1);
    speak(`Step ${step - 1} of 4`);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Welcome to AccessNav</h3>
              <p className="text-gray-600 mb-6">
                Let's set up your accessibility profile to provide the best navigation experience for your needs.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Name (Optional)
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter a name for your profile"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  aria-label="Enter profile name"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Accessibility Needs</h3>
              <p className="text-gray-600 mb-6">
                Select the categories that best describe your accessibility needs. This helps us provide better navigation.
              </p>
              <div className="space-y-4">
                {disabilityOptions.map((option) => {
                  const isSelected = profileData.disabilities.some(d => d.category === option.category);
                  return (
                    <AccessibleCard
                      key={option.category}
                      clickable
                      onClick={() => handleDisabilityToggle(option.category)}
                      ariaLabel={`${isSelected ? 'Deselect' : 'Select'} ${option.label} accessibility needs`}
                      className={`${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg">{option.label}</h4>
                            {isSelected && <Check className="w-5 h-5 text-blue-600" />}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                          <p className="text-gray-500 text-xs">
                            Examples: {option.examples.join(', ')}
                          </p>
                        </div>
                      </div>
                    </AccessibleCard>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Display Preferences</h3>
              <p className="text-gray-600 mb-6">
                Customize how AccessNav looks and behaves to match your needs.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Font Size
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['small', 'medium', 'large', 'extra-large'].map((size) => (
                      <AccessibleButton
                        key={size}
                        onClick={() => handlePreferenceChange('fontSize', size)}
                        variant={profileData.preferences.fontSize === size ? 'primary' : 'secondary'}
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
                        variant={profileData.preferences.contrast === contrast ? 'primary' : 'secondary'}
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
                    Additional Options
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'voiceGuidance', label: 'Voice Guidance', description: 'Spoken navigation instructions' },
                      { key: 'hapticFeedback', label: 'Haptic Feedback', description: 'Vibration feedback for interactions' },
                      { key: 'autoZoom', label: 'Auto Zoom', description: 'Automatically zoom in on important content' },
                      { key: 'slowNavigation', label: 'Slower Navigation', description: 'Reduce animation speed and timing' },
                    ].map((option) => (
                      <AccessibleCard
                        key={option.key}
                        clickable
                        onClick={() => handlePreferenceChange(option.key as keyof AccessibilityPreferences, !profileData.preferences[option.key as keyof AccessibilityPreferences])}
                        ariaLabel={`${profileData.preferences[option.key as keyof AccessibilityPreferences] ? 'Disable' : 'Enable'} ${option.label}`}
                        className={`${profileData.preferences[option.key as keyof AccessibilityPreferences] ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-medium">{option.label}</h4>
                              {profileData.preferences[option.key as keyof AccessibilityPreferences] && 
                                <Check className="w-4 h-4 text-blue-600" />}
                            </div>
                            <p className="text-gray-600 text-sm">{option.description}</p>
                          </div>
                        </div>
                      </AccessibleCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Assistive Technology</h3>
              <p className="text-gray-600 mb-6">
                Select any assistive technologies you use. This helps AccessNav work better with your tools.
              </p>
              <div className="space-y-4">
                {assistiveTechOptions.map((tech) => {
                  const isSelected = profileData.assistiveTech.some(t => t.type === tech.type);
                  return (
                    <AccessibleCard
                      key={tech.type}
                      clickable
                      onClick={() => handleAssistiveTechToggle({ type: tech.type, name: tech.name })}
                      ariaLabel={`${isSelected ? 'Deselect' : 'Select'} ${tech.name}`}
                      className={`${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-medium">{tech.name}</h4>
                            {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                          </div>
                          <p className="text-gray-600 text-sm">{tech.description}</p>
                        </div>
                      </div>
                    </AccessibleCard>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Accessibility Setup
          </h2>
          <span className="text-sm text-gray-500">
            Step {step} of 4
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <div>
          {step > 1 && (
            <AccessibleButton
              onClick={handlePrevious}
              variant="secondary"
              size="lg"
              ariaLabel="Go to previous step"
            >
              Previous
            </AccessibleButton>
          )}
        </div>

        <div className="flex gap-4">
          <AccessibleButton
            onClick={onSkip}
            variant="secondary"
            size="lg"
            ariaLabel="Skip accessibility setup"
          >
            Skip Setup
          </AccessibleButton>

          {step < 4 ? (
            <AccessibleButton
              onClick={handleNext}
              variant="primary"
              size="lg"
              ariaLabel="Go to next step"
              icon={<ChevronRight className="w-5 h-5" />}
            >
              Next
            </AccessibleButton>
          ) : (
            <AccessibleButton
              onClick={handleComplete}
              variant="primary"
              size="lg"
              ariaLabel="Complete accessibility setup"
            >
              Complete Setup
            </AccessibleButton>
          )}
        </div>
      </div>
    </div>
  );
};