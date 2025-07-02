import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { LegalResource as LegalResourceType } from '../../types';
import { Phone, ExternalLink } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface LegalResourceProps {
  resource: LegalResourceType;
}

export const LegalResource: React.FC<LegalResourceProps> = ({ resource }) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{resource.name}</h3>
            <p className="text-gray-600 capitalize">{resource.type.replace('-', ' ')}</p>
            <p className="text-sm text-gray-500">{resource.location.address}</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
            {resource.cost}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {resource.specialties.map((specialty, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
          <ul className="text-gray-700 text-sm space-y-1">
            {resource.services.map((service, index) => (
              <li key={index}>• {service}</li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Eligibility:</span>
            <p className="text-gray-600">{resource.eligibility}</p>
          </div>
          <div>
            <span className="font-semibold">Languages:</span>
            <p className="text-gray-600">{resource.languages.join(', ')}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => speak(`Calling ${resource.name}`)}
            variant="primary"
            size="md"
            ariaLabel={`Call ${resource.name}`}
            icon={<Phone className="w-4 h-4" />}
          >
            Call: {resource.contactInfo}
          </AccessibleButton>
          <AccessibleButton
            onClick={() => speak(`Getting more information about ${resource.name}`)}
            variant="secondary"
            size="md"
            ariaLabel={`Get more information about ${resource.name}`}
            icon={<ExternalLink className="w-4 h-4" />}
          >
            More Info
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};