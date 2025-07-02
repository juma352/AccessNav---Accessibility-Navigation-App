import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { FinancialGoal as FinancialGoalType } from '../../types';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Smartphone } from 'lucide-react';

interface FinancialGoalProps {
  goal: FinancialGoalType;
  onAddMoney: (goalId: string, amount: number) => void;
  onEdit: (goalId: string) => void;
}

export const FinancialGoal: React.FC<FinancialGoalProps> = ({ goal, onAddMoney, onEdit }) => {
  const { speak } = useAccessibility();
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const daysLeft = Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <AccessibleCard priority={goal.priority} className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-gray-900">{goal.title}</h4>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="capitalize">{goal.category.replace('-', ' ')}</span>
              <span className="capitalize">{goal.savingsMethod.replace('-', ' ')}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              KES {goal.currentAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              of KES {goal.targetAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">
            {daysLeft > 0 ? `${daysLeft} days left` : 'Goal deadline passed'}
          </span>
          <span className="text-gray-600">
            Target: {goal.deadline.toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => onAddMoney(goal.id, 1000)}
            variant="primary"
            size="md"
            ariaLabel={`Add money to ${goal.title} goal`}
            icon={<Smartphone className="w-4 h-4" />}
          >
            Add KES 1,000
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onEdit(goal.id)}
            variant="secondary"
            size="md"
            ariaLabel={`Edit ${goal.title} goal`}
          >
            Edit Goal
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};