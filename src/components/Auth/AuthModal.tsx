import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AccessibleButton } from '../common/AccessibleButton';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register' | 'forgot-password';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialView = 'login',
  onSuccess,
}) => {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgot-password'>(initialView);
  const { speak } = useAccessibility();

  const handleSuccess = () => {
    speak('Authentication successful');
    onSuccess?.();
    onClose();
  };

  const handleClose = () => {
    speak('Authentication dialog closed');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 id="auth-modal-title" className="text-lg font-semibold text-gray-900">
            {currentView === 'login' && 'Sign In to AccessNav Kenya'}
            {currentView === 'register' && 'Create AccessNav Kenya Account'}
            {currentView === 'forgot-password' && 'Reset Your Password'}
          </h2>
          <AccessibleButton
            onClick={handleClose}
            variant="secondary"
            size="sm"
            ariaLabel="Close authentication dialog"
            icon={<X className="w-4 h-4" />}
          >
            <span className="sr-only">Close</span>
          </AccessibleButton>
        </div>

        <div className="p-6">
          {currentView === 'login' && (
            <LoginForm
              onSwitchToRegister={() => {
                setCurrentView('register');
                speak('Switched to registration form');
              }}
              onSwitchToForgotPassword={() => {
                setCurrentView('forgot-password');
                speak('Switched to password reset form');
              }}
              onSuccess={handleSuccess}
            />
          )}

          {currentView === 'register' && (
            <RegisterForm
              onSwitchToLogin={() => {
                setCurrentView('login');
                speak('Switched to login form');
              }}
              onSuccess={handleSuccess}
            />
          )}

          {currentView === 'forgot-password' && (
            <ForgotPasswordForm
              onSwitchToLogin={() => {
                setCurrentView('login');
                speak('Switched to login form');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};