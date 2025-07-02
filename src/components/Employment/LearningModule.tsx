import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { LearningModule as LearningModuleType } from '../../types';
import { BookOpen, Award, Clock } from 'lucide-react';

interface LearningModuleProps {
  module: LearningModuleType;
  onStart: (moduleId: string) => void;
  isCompleted: boolean;
}

export const LearningModule: React.FC<LearningModuleProps> = ({ module, onStart, isCompleted }) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
          <div className="flex items-center gap-2">
            {isCompleted && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <Award className="w-3 h-3" />
                Completed
              </div>
            )}
            {module.certification && (
              <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                Certificate
              </div>
            )}
            {module.localContext && (
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Kenya Context
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {module.duration} min
          </span>
          <span className="capitalize">{module.difficulty}</span>
          <span className="capitalize">{module.category.replace('-', ' ')}</span>
        </div>

        <p className="text-gray-700">{module.description}</p>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Available Formats:</h4>
          <div className="flex flex-wrap gap-2">
            {module.accessibleFormats.map((format, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm capitalize">
                {format}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Languages:</h4>
          <p className="text-gray-700 text-sm">{module.language.join(', ')}</p>
        </div>

        <AccessibleButton
          onClick={() => onStart(module.id)}
          variant={isCompleted ? "success" : "primary"}
          size="md"
          fullWidth
          disabled={isCompleted}
          ariaLabel={isCompleted ? `${module.title} completed` : `Start ${module.title} learning module`}
          icon={isCompleted ? <Award className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
        >
          {isCompleted ? 'Completed ✓' : 'Start Learning'}
        </AccessibleButton>
      </div>
    </AccessibleCard>
  );
};