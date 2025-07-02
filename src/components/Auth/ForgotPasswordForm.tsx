import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAuth } from '../../contexts/AuthContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { forgotPassword, isLoading } = useAuth();
  const { speak } = useAccessibility();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      speak('Please enter your email address');
      return;
    }

    const result = await forgotPassword(email);
    
    if (result.success) {
      setSuccess(true);
      speak('Password reset instructions sent to your email');
    } else {
      setError(result.error || 'Failed to send reset email');
      speak(result.error || 'Failed to send reset email');
    }
  };

  if (success) {
    return (
      <AccessibleCard className="w-full max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600">
              We've sent password reset instructions to <strong>{email}</strong>
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Check your email inbox (and spam folder)</li>
              <li>2. Click the reset link in the email</li>
              <li>3. Create a new password</li>
              <li>4. Sign in with your new password</li>
            </ol>
          </div>

          <div className="space-y-3">
            <AccessibleButton
              onClick={onSwitchToLogin}
              variant="primary"
              size="lg"
              fullWidth
              ariaLabel="Return to sign in page"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Sign In
            </AccessibleButton>
            
            <AccessibleButton
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              variant="secondary"
              size="md"
              fullWidth
              ariaLabel="Send another reset email"
            >
              Send Another Email
            </AccessibleButton>
          </div>
        </div>
      </AccessibleCard>
    );
  }

  return (
    <AccessibleCard className="w-full max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you instructions to reset your password
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-red-900 font-medium">Reset Error</h4>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              We'll send reset instructions to this email
            </p>
          </div>

          <AccessibleButton
            onClick={() => {}} // Form submission handled by onSubmit
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
            ariaLabel={isLoading ? 'Sending reset instructions...' : 'Send reset instructions'}
            type="submit"
          >
            {isLoading ? 'Sending Instructions...' : 'Send Reset Instructions'}
          </AccessibleButton>
        </form>

        <div className="text-center">
          <AccessibleButton
            onClick={onSwitchToLogin}
            variant="secondary"
            size="md"
            ariaLabel="Return to sign in page"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Sign In
          </AccessibleButton>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">Demo Mode</h4>
          <p className="text-sm text-yellow-800">
            In demo mode, password reset emails are simulated. 
            Use any valid email address to test the flow.
          </p>
        </div>
      </div>
    </AccessibleCard>
  );
};