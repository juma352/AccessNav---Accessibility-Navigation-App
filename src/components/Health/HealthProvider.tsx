import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { HealthProvider as HealthProviderType } from '../../types';
import { MapPin, Star, Phone, Calendar } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface HealthProviderProps {
  provider: HealthProviderType;
  onBookAppointment: (providerId: string) => void;
  isAppointmentPending: boolean;
}

export const HealthProvider: React.FC<HealthProviderProps> = ({ 
  provider, 
  onBookAppointment, 
  isAppointmentPending 
}) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
            <p className="text-gray-600">{provider.specialty}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {provider.location.address}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-yellow-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">{provider.rating}</span>
            </div>
            {provider.nhifAccredited && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                NHIF Accredited
              </div>
            )}
            {provider.governmentFacility && (
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Government
              </div>
            )}
            {provider.telehealth && (
              <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                Telehealth
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Accessibility Features:</h4>
            <div className="flex flex-wrap gap-2">
              {provider.accessibilityFeatures.map((feature, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Disability Experience:</h4>
            <div className="flex flex-wrap gap-2">
              {provider.disabilityExperience.map((exp, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Languages: {provider.languages.join(', ')}</span>
            <span>Cost: {provider.cost}</span>
          </div>
          <div className="text-sm text-gray-600">
            Insurance: {provider.acceptedInsurance.join(', ')}
          </div>
        </div>

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => onBookAppointment(provider.id)}
            variant={isAppointmentPending ? "success" : "primary"}
            size="md"
            disabled={isAppointmentPending}
            ariaLabel={isAppointmentPending ? `Appointment pending with ${provider.name}` : `Book appointment with ${provider.name}`}
            icon={<Calendar className="w-4 h-4" />}
          >
            {isAppointmentPending ? 'Appointment Pending' : 'Book Appointment'}
          </AccessibleButton>
          <AccessibleButton
            onClick={() => speak(`Calling ${provider.name}`)}
            variant="secondary"
            size="md"
            ariaLabel={`Call ${provider.name}`}
            icon={<Phone className="w-4 h-4" />}
          >
            Call
          </AccessibleButton>
          {provider.telehealth && (
            <AccessibleButton
              onClick={() => speak(`Starting telehealth session with ${provider.name}`)}
              variant="secondary"
              size="md"
              ariaLabel={`Start telehealth with ${provider.name}`}
            >
              Telehealth
            </AccessibleButton>
          )}
        </div>
      </div>
    </AccessibleCard>
  );
};