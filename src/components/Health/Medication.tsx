import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Medication as MedicationType } from '../../types';
import { Clock, AlertTriangle } from 'lucide-react';

interface MedicationProps {
  medication: MedicationType;
  onManage: (medicationId: string) => void;
}

export const Medication: React.FC<MedicationProps> = ({ medication, onManage }) => {
  const { speak } = useAccessibility();

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'readily_available':
        return 'Readily Available';
      case 'sometimes_available':
        return 'Sometimes Available';
      case 'rare':
        return 'Rare';
      case 'imported':
        return 'Imported';
      default:
        return availability.replace('_', ' ');
    }
  };

  return (
    <AccessibleCard className="hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-900">{medication.name}</h4>
          <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
          <p className="text-sm text-gray-500">Prescribed by {medication.prescribedBy}</p>
          
          {medication.instructions && (
            <div className="mt-2">
              <span className="font-semibold text-sm">Instructions: </span>
              <span className="text-sm">{medication.instructions}</span>
            </div>
          )}

          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className={`font-semibold ${medication.nhifCovered ? 'text-green-600' : 'text-red-600'}`}>
              {medication.nhifCovered ? 'NHIF Covered' : 'Not NHIF Covered'}
            </span>
            <span>KES {medication.cost}</span>
            <span className="capitalize">{getAvailabilityLabel(medication.localAvailability)}</span>
          </div>
          
          {medication.sideEffects && medication.sideEffects.length > 0 && (
            <div className="mt-2 flex items-start gap-2 text-amber-700 text-sm">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Side effects: </span>
                <span>{medication.sideEffects.join(', ')}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {medication.refillReminder && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
              Refill Soon
            </span>
          )}
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>Since {medication.startDate.toLocaleDateString()}</span>
          </div>
          <AccessibleButton
            onClick={() => onManage(medication.id)}
            variant="secondary"
            size="sm"
            ariaLabel={`Manage ${medication.name} medication`}
          >
            Manage
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};