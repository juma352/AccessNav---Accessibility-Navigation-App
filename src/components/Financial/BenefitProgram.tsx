import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { BenefitProgram as BenefitProgramType } from '../../types';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface BenefitProgramProps {
  program: BenefitProgramType;
  onApply: (programId: string) => void;
  isApplied: boolean;
}

export const BenefitProgram: React.FC<BenefitProgramProps> = ({ program, onApply, isApplied }) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="capitalize">{program.type}</span>
              <span className="font-semibold text-green-600">{program.estimatedValue}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {program.renewalRequired && (
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Renewal Required
              </div>
            )}
            {program.ncpwdRegistrationRequired && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                NCPWD Required
              </div>
            )}
            {isApplied && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Applied ✓
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Eligibility Requirements:</h4>
          <ul className="text-gray-700 space-y-1">
            {program.eligibility.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
          <ul className="text-gray-700 space-y-1">
            {program.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Required Documents:</h4>
          <div className="flex flex-wrap gap-2">
            {program.documentsRequired.map((doc, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {doc}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">How to Apply:</h4>
          <p className="text-blue-800 text-sm mb-2">{program.applicationProcess}</p>
          <p className="text-blue-800 text-sm">Contact: {program.contactInfo}</p>
        </div>

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => onApply(program.id)}
            variant={isApplied ? "success" : "primary"}
            size="md"
            disabled={isApplied}
            ariaLabel={isApplied ? `Already applied for ${program.name}` : `Start application for ${program.name}`}
          >
            {isApplied ? 'Applied ✓' : 'Apply Now'}
          </AccessibleButton>
          <AccessibleButton
            onClick={() => speak(`Getting more information about ${program.name}`)}
            variant="secondary"
            size="md"
            ariaLabel={`Get more information about ${program.name}`}
          >
            Learn More
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};