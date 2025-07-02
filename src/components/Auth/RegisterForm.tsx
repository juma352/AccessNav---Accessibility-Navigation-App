import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, AlertCircle, CheckCircle, ChevronRight, Check } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAuth } from '../../contexts/AuthContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { AccessibilityProfile, DisabilityType, AccessibilityPreferences, AssistiveTechnology } from '../../types';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
  onSuccess,
}) => {
  const { register, isLoading } = useAuth();
  const { speak, updateProfile, updatePreferences } = useAccessibility();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    county: '',
    subcounty: '',
    ward: '',
    ncpwdRegistered: false,
    ncpwdNumber: '',
  });
  const [accessibilityData, setAccessibilityData] = useState({
    disabilities: [] as DisabilityType[],
    preferences: {
      fontSize: 'medium',
      contrast: 'normal',
      colorScheme: 'auto',
      voiceGuidance: true,
      hapticFeedback: true,
      autoZoom: false,
      slowNavigation: false,
      language: 'english',
    } as AccessibilityPreferences,
    assistiveTech: [] as AssistiveTechnology[],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const kenyanCounties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay',
    'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii',
    'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
    'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi',
    'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
    'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
  ];

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
    { type: 'hearingAid' as const, name: 'Hearing Aid', description: 'Digital hearing aids, cochlear implants' },
    { type: 'wheelchair' as const, name: 'Wheelchair', description: 'Manual or electric wheelchair' },
    { type: 'walkingStick' as const, name: 'Walking Stick/Cane', description: 'White cane, walking stick' },
    { type: 'other' as const, name: 'Other', description: 'Custom or specialized assistive technology' },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleDisabilityToggle = (category: DisabilityType['category']) => {
    const exists = accessibilityData.disabilities.some(d => d.category === category);
    if (exists) {
      setAccessibilityData(prev => ({
        ...prev,
        disabilities: prev.disabilities.filter(d => d.category !== category),
      }));
    } else {
      setAccessibilityData(prev => ({
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
    const exists = accessibilityData.assistiveTech.some(t => t.type === tech.type);
    if (exists) {
      setAccessibilityData(prev => ({
        ...prev,
        assistiveTech: prev.assistiveTech.filter(t => t.type !== tech.type),
      }));
    } else {
      setAccessibilityData(prev => ({
        ...prev,
        assistiveTech: [...prev.assistiveTech, tech],
      }));
    }
  };

  const handlePreferenceChange = (key: keyof AccessibilityPreferences, value: any) => {
    setAccessibilityData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
    updatePreferences({ [key]: value });
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formData.county) {
      setError('Please select your county');
      return false;
    }

    if (formData.ncpwdRegistered && !formData.ncpwdNumber) {
      setError('Please enter your NCPWD registration number');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      speak('Step 2 of 4: Location and NCPWD information');
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      speak('Step 3 of 4: Accessibility needs');
    } else if (step === 3) {
      setStep(4);
      speak('Step 4 of 4: Accessibility preferences');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      speak(`Step ${step - 1} of 4`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await register(formData);
    
    if (result.success) {
      // Create and save accessibility profile
      const profile: AccessibilityProfile = {
        id: Date.now().toString(),
        name: formData.name + "'s Profile",
        disabilities: accessibilityData.disabilities,
        preferences: accessibilityData.preferences,
        assistiveTech: accessibilityData.assistiveTech,
        county: formData.county,
        subcounty: formData.subcounty,
        ward: formData.ward,
      };
      
      updateProfile(profile);
      updatePreferences(accessibilityData.preferences);
      
      speak('Account created successfully with accessibility profile. Welcome to AccessNav Kenya!');
      onSuccess();
    } else {
      setError(result.error || 'Registration failed');
      speak(result.error || 'Registration failed');
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
      speak(showPassword ? 'Password hidden' : 'Password visible');
    } else {
      setShowConfirmPassword(!showConfirmPassword);
      speak(showConfirmPassword ? 'Confirm password hidden' : 'Confirm password visible');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full pl-10 pr-12 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Create a password"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('password')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">Minimum 6 characters</p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full pl-10 pr-12 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirmPassword')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number (Optional)
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            placeholder="e.g., +254 700 123 456"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="county" className="block text-sm font-medium text-gray-700 mb-2">
          County *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            id="county"
            value={formData.county}
            onChange={(e) => handleInputChange('county', e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            required
            disabled={isLoading}
          >
            <option value="">Select your county</option>
            {kenyanCounties.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subcounty" className="block text-sm font-medium text-gray-700 mb-2">
          Sub-County (Optional)
        </label>
        <input
          type="text"
          id="subcounty"
          value={formData.subcounty}
          onChange={(e) => handleInputChange('subcounty', e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="Enter your sub-county"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-2">
          Ward (Optional)
        </label>
        <input
          type="text"
          id="ward"
          value={formData.ward}
          onChange={(e) => handleInputChange('ward', e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          placeholder="Enter your ward"
          disabled={isLoading}
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-3">NCPWD Registration</h4>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.ncpwdRegistered}
            onChange={(e) => handleInputChange('ncpwdRegistered', e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            disabled={isLoading}
          />
          <div>
            <span className="text-blue-900 font-medium">I am registered with NCPWD</span>
            <p className="text-sm text-blue-800 mt-1">
              National Council for Persons with Disabilities registration provides access to additional services and benefits.
            </p>
          </div>
        </label>

        {formData.ncpwdRegistered && (
          <div className="mt-4">
            <label htmlFor="ncpwdNumber" className="block text-sm font-medium text-blue-900 mb-2">
              NCPWD Registration Number *
            </label>
            <input
              type="text"
              id="ncpwdNumber"
              value={formData.ncpwdNumber}
              onChange={(e) => handleInputChange('ncpwdNumber', e.target.value)}
              className="w-full px-4 py-3 text-lg border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none"
              placeholder="Enter your NCPWD number"
              required={formData.ncpwdRegistered}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Accessibility Needs (Optional)</h3>
        <p className="text-gray-600 mb-6">
          Select the categories that best describe your accessibility needs. This helps us provide better navigation and services.
        </p>
        <div className="space-y-4">
          {disabilityOptions.map((option) => {
            const isSelected = accessibilityData.disabilities.some(d => d.category === option.category);
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

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Assistive Technology (Optional)</h4>
        <p className="text-gray-600 mb-4">
          Select any assistive technologies you use. This helps AccessNav work better with your tools.
        </p>
        <div className="space-y-3">
          {assistiveTechOptions.map((tech) => {
            const isSelected = accessibilityData.assistiveTech.some(t => t.type === tech.type);
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

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
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
                  variant={accessibilityData.preferences.fontSize === size ? 'primary' : 'secondary'}
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
                  variant={accessibilityData.preferences.contrast === contrast ? 'primary' : 'secondary'}
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
              Language Preference
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { code: 'english', name: 'English' },
                { code: 'swahili', name: 'Swahili' },
                { code: 'kikuyu', name: 'Kikuyu' },
                { code: 'luo', name: 'Luo' },
              ].map((lang) => (
                <AccessibleButton
                  key={lang.code}
                  onClick={() => handlePreferenceChange('language', lang.code)}
                  variant={accessibilityData.preferences.language === lang.code ? 'primary' : 'secondary'}
                  size="md"
                  ariaLabel={`Set language to ${lang.name}`}
                >
                  {lang.name}
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
                  onClick={() => handlePreferenceChange(option.key as keyof AccessibilityPreferences, !accessibilityData.preferences[option.key as keyof AccessibilityPreferences])}
                  ariaLabel={`${accessibilityData.preferences[option.key as keyof AccessibilityPreferences] ? 'Disable' : 'Enable'} ${option.label}`}
                  className={`${accessibilityData.preferences[option.key as keyof AccessibilityPreferences] ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium">{option.label}</h4>
                        {accessibilityData.preferences[option.key as keyof AccessibilityPreferences] && 
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

  return (
    <AccessibleCard className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your AccessNav Kenya Account</h2>
          <p className="text-gray-600">Join the community and set up your accessibility preferences</p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step > stepNumber ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-16 h-1 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Step {step} of 4: {
                step === 1 ? 'Account Information' :
                step === 2 ? 'Location & NCPWD' :
                step === 3 ? 'Accessibility Needs' :
                'Display Preferences'
              }
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-900 font-medium">Registration Error</h4>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()} className="space-y-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          <div className="flex gap-3 pt-6">
            {step > 1 && (
              <AccessibleButton
                onClick={handleBack}
                variant="secondary"
                size="lg"
                disabled={isLoading}
                ariaLabel="Go back to previous step"
              >
                Back
              </AccessibleButton>
            )}
            
            {step < 4 ? (
              <AccessibleButton
                onClick={handleNext}
                variant="primary"
                size="lg"
                fullWidth
                disabled={isLoading}
                ariaLabel="Continue to next step"
                icon={<ChevronRight className="w-5 h-5" />}
              >
                Continue
              </AccessibleButton>
            ) : (
              <AccessibleButton
                onClick={() => {}} // Form submission handled by onSubmit
                variant="primary"
                size="lg"
                fullWidth
                disabled={isLoading}
                ariaLabel={isLoading ? 'Creating account...' : 'Create AccessNav Kenya account'}
                type="submit"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </AccessibleButton>
            )}
          </div>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 py-1"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
          Your accessibility preferences and data are protected and used only to provide AccessNav Kenya services.
        </div>
      </div>
    </AccessibleCard>
  );
};