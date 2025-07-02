import React, { useState } from 'react';
import { Camera, MapPin, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { CommunityReport } from '../../types';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface CommunityReportingProps {
  onSubmitReport: (report: Omit<CommunityReport, 'id' | 'reportedAt' | 'upvotes' | 'downvotes'>) => void;
  onClose: () => void;
}

export const CommunityReporting: React.FC<CommunityReportingProps> = ({
  onSubmitReport,
  onClose,
}) => {
  const { speak } = useAccessibility();
  const [reportType, setReportType] = useState<CommunityReport['reportType']>('barrier');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<CommunityReport['severity']>('medium');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    {
      type: 'barrier' as const,
      label: 'Accessibility Barrier',
      description: 'Report obstacles, broken elevators, blocked paths',
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    },
    {
      type: 'improvement' as const,
      label: 'Accessibility Improvement',
      description: 'Report new ramps, accessible facilities, improvements',
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    },
    {
      type: 'verification' as const,
      label: 'Verify Information',
      description: 'Confirm or update existing accessibility information',
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    },
    {
      type: 'emergency' as const,
      label: 'Emergency Issue',
      description: 'Report dangerous conditions requiring immediate attention',
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    },
  ];

  const severityLevels = [
    { level: 'low' as const, label: 'Low', description: 'Minor inconvenience', color: 'text-green-600' },
    { level: 'medium' as const, label: 'Medium', description: 'Significant barrier', color: 'text-yellow-600' },
    { level: 'high' as const, label: 'High', description: 'Major accessibility issue', color: 'text-orange-600' },
    { level: 'critical' as const, label: 'Critical', description: 'Dangerous or blocking access', color: 'text-red-600' },
  ];

  const handleSubmit = async () => {
    if (!description.trim()) {
      speak('Please provide a description for your report');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmitReport({
        location: {
          latitude: 0, // In real app, get from GPS/map
          longitude: 0,
          address: location || 'Current location',
          type: 'building',
        },
        reportType,
        description: description.trim(),
        severity,
        status: 'pending',
        reportedBy: 'current-user', // In real app, get from auth
      });
      
      speak('Report submitted successfully. Thank you for helping improve accessibility.');
      onClose();
    } catch (error) {
      speak('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`);
          speak('Current location added to report');
        },
        () => {
          speak('Unable to get current location');
        }
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Community Report</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close community reporting"
        >
          Cancel
        </AccessibleButton>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">What would you like to report?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((type) => (
              <AccessibleCard
                key={type.type}
                clickable
                onClick={() => setReportType(type.type)}
                ariaLabel={`Select ${type.label} report type`}
                className={`${reportType === type.type ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                    {type.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1">{type.label}</h4>
                    <p className="text-gray-600 text-xs">{type.description}</p>
                  </div>
                </div>
              </AccessibleCard>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the accessibility issue or improvement in detail..."
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical"
            rows={5}
            aria-label="Report description"
            required
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Severity Level</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {severityLevels.map((level) => (
              <AccessibleCard
                key={level.level}
                clickable
                onClick={() => setSeverity(level.level)}
                ariaLabel={`Set severity to ${level.label}: ${level.description}`}
                className={`${severity === level.level ? 'ring-2 ring-blue-500 bg-blue-50' : ''} text-center`}
              >
                <h4 className={`font-semibold text-sm ${level.color}`}>{level.label}</h4>
                <p className="text-gray-600 text-xs mt-1">{level.description}</p>
              </AccessibleCard>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Location
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter address or use current location"
              className="flex-1 p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              aria-label="Report location"
            />
            <AccessibleButton
              onClick={getCurrentLocation}
              variant="secondary"
              size="lg"
              ariaLabel="Use current location"
              icon={<MapPin className="w-5 h-5" />}
            >
              <span className="sr-only">Current Location</span>
            </AccessibleButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Add Photos (Optional)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Photos help verify and understand accessibility issues
            </p>
            <AccessibleButton
              onClick={() => speak('Photo upload feature would be implemented here')}
              variant="secondary"
              size="md"
              ariaLabel="Add photos to report"
              icon={<Camera className="w-5 h-5" />}
            >
              Add Photos
            </AccessibleButton>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <AccessibleButton
            onClick={onClose}
            variant="secondary"
            size="lg"
            ariaLabel="Cancel report"
          >
            Cancel
          </AccessibleButton>
          <AccessibleButton
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            disabled={isSubmitting || !description.trim()}
            ariaLabel={isSubmitting ? 'Submitting report' : 'Submit community report'}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
};