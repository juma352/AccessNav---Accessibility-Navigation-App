import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AccessibilityProfile, AccessibilityPreferences } from '../types';

interface AccessibilityContextType {
  profile: AccessibilityProfile | null;
  preferences: AccessibilityPreferences;
  updateProfile: (profile: AccessibilityProfile) => void;
  updatePreferences: (preferences: Partial<AccessibilityPreferences>) => void;
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  speak: (text: string) => void;
  fontSize: string;
  contrastLevel: string;
}

const defaultPreferences: AccessibilityPreferences = {
  fontSize: 'medium',
  contrast: 'normal',
  colorScheme: 'auto',
  voiceGuidance: true,
  hapticFeedback: true,
  autoZoom: false,
  slowNavigation: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<AccessibilityProfile | null>(null);
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  useEffect(() => {
    // Load saved profile and preferences from localStorage
    const savedProfile = localStorage.getItem('accessibilityProfile');
    const savedPreferences = localStorage.getItem('accessibilityPreferences');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    if (savedPreferences) {
      setPreferences({ ...defaultPreferences, ...JSON.parse(savedPreferences) });
    }

    // Apply theme and contrast settings to document
    document.documentElement.setAttribute('data-theme', preferences.colorScheme);
    document.documentElement.setAttribute('data-contrast', preferences.contrast);
    document.documentElement.setAttribute('data-font-size', preferences.fontSize);
  }, []);

  useEffect(() => {
    // Save preferences to localStorage and apply to document
    localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    document.documentElement.setAttribute('data-theme', preferences.colorScheme);
    document.documentElement.setAttribute('data-contrast', preferences.contrast);
    document.documentElement.setAttribute('data-font-size', preferences.fontSize);
  }, [preferences]);

  const updateProfile = (newProfile: AccessibilityProfile) => {
    setProfile(newProfile);
    localStorage.setItem('accessibilityProfile', JSON.stringify(newProfile));
  };

  const updatePreferences = (newPreferences: Partial<AccessibilityPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const toggleVoice = () => {
    setIsVoiceEnabled(prev => !prev);
  };

  const speak = (text: string) => {
    if (isVoiceEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = preferences.slowNavigation ? 0.7 : 1;
      speechSynthesis.speak(utterance);
    }
  };

  const fontSize = `text-${preferences.fontSize === 'small' ? 'sm' : preferences.fontSize === 'large' ? 'xl' : preferences.fontSize === 'extra-large' ? '2xl' : 'base'}`;
  const contrastLevel = preferences.contrast === 'high' ? 'high-contrast' : preferences.contrast === 'extra-high' ? 'extra-high-contrast' : '';

  return (
    <AccessibilityContext.Provider
      value={{
        profile,
        preferences,
        updateProfile,
        updatePreferences,
        isVoiceEnabled,
        toggleVoice,
        speak,
        fontSize,
        contrastLevel,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};