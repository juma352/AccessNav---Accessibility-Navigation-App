import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { RightsEducation as RightsEducationType } from '../../types';
import { ExternalLink } from 'lucide-react';

interface RightsEducationProps {
  education: RightsEducationType;
}

export const RightsEducation: React.FC<RightsEducationProps> = ({ education }) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{education.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="capitalize">{education.category}</span>
              <span>{education.jurisdiction}</span>
              <span>Updated: {education.lastUpdated.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700">{education.content}</p>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Key Points:</h4>
          <ul className="text-gray-700 space-y-1">
            {education.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Action Steps:</h4>
          <ol className="text-gray-700 space-y-1">
            {education.actionSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 font-semibold">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Additional Resources:</h4>
          <div className="flex flex-wrap gap-2">
            {education.resources.map((resource, index) => (
              <AccessibleButton
                key={index}
                onClick={() => speak(`Opening resource: ${resource}`)}
                variant="secondary"
                size="sm"
                ariaLabel={`Open resource: ${resource}`}
                icon={<ExternalLink className="w-3 h-3" />}
              >
                {resource}
              </AccessibleButton>
            ))}
          </div>
        </div>
      </div>
    </AccessibleCard>
  );
};