import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { CivicOpportunity as CivicOpportunityType } from '../../types';
import { MapPin, Calendar } from 'lucide-react';

interface CivicOpportunityProps {
  opportunity: CivicOpportunityType;
  onLearnMore: (opportunityId: string) => void;
  onRegister: (opportunityId: string) => void;
  onAddToCalendar: (opportunityId: string) => void;
}

export const CivicOpportunity: React.FC<CivicOpportunityProps> = ({ 
  opportunity, 
  onLearnMore, 
  onRegister,
  onAddToCalendar
}) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{opportunity.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="capitalize">{opportunity.type.replace('-', ' ')}</span>
              <span>{opportunity.date.toLocaleDateString()}</span>
              <span>{opportunity.location.address}</span>
            </div>
          </div>
          {opportunity.registrationRequired && (
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Registration Required
            </div>
          )}
        </div>

        <p className="text-gray-700">{opportunity.description}</p>

        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Accessibility Information:</h4>
          <p className="text-green-800 text-sm">{opportunity.accessibilityInfo}</p>
        </div>

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => onLearnMore(opportunity.id)}
            variant="primary"
            size="md"
            ariaLabel={`Get more details about ${opportunity.title}`}
          >
            Learn More
          </AccessibleButton>
          {opportunity.registrationRequired ? (
            <AccessibleButton
              onClick={() => onRegister(opportunity.id)}
              variant="secondary"
              size="md"
              ariaLabel={`Register for ${opportunity.title}`}
            >
              Register
            </AccessibleButton>
          ) : (
            <AccessibleButton
              onClick={() => onAddToCalendar(opportunity.id)}
              variant="secondary"
              size="md"
              ariaLabel={`Add ${opportunity.title} to calendar`}
              icon={<Calendar className="w-4 h-4" />}
            >
              Add to Calendar
            </AccessibleButton>
          )}
        </div>
      </div>
    </AccessibleCard>
  );
};