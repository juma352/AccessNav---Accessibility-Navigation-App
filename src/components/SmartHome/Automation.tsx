import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Automation as AutomationType } from '../../types';

interface AutomationProps {
  automation: AutomationType;
  onToggle: (automationId: string) => void;
  onEdit: (automationId: string) => void;
  onTest: (automationId: string) => void;
}

export const Automation: React.FC<AutomationProps> = ({ automation, onToggle, onEdit, onTest }) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-gray-900">{automation.name}</h4>
            <p className="text-gray-600">{automation.trigger}</p>
            {automation.schedule && (
              <p className="text-sm text-gray-500">{automation.schedule}</p>
            )}
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            automation.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {automation.enabled ? 'Enabled' : 'Disabled'}
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-2">Actions:</h5>
          <ul className="text-gray-700 space-y-1">
            {automation.actions.map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {automation.conditions && automation.conditions.length > 0 && (
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Conditions:</h5>
            <ul className="text-gray-700 space-y-1">
              {automation.conditions.map((condition, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => onToggle(automation.id)}
            variant={automation.enabled ? 'secondary' : 'primary'}
            size="md"
            ariaLabel={`${automation.enabled ? 'Disable' : 'Enable'} ${automation.name}`}
          >
            {automation.enabled ? 'Disable' : 'Enable'}
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onEdit(automation.id)}
            variant="secondary"
            size="md"
            ariaLabel={`Edit ${automation.name} automation`}
          >
            Edit
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onTest(automation.id)}
            variant="secondary"
            size="md"
            ariaLabel={`Test ${automation.name} automation`}
          >
            Test
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};