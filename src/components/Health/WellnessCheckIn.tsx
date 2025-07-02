import React, { useState } from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { WellnessCheckIn as WellnessCheckInType } from '../../types';

interface WellnessCheckInProps {
  onSubmit: (checkIn: Omit<WellnessCheckInType, 'id' | 'date'>) => void;
}

export const WellnessCheckIn: React.FC<WellnessCheckInProps> = ({ onSubmit }) => {
  const { speak } = useAccessibility();
  const [mood, setMood] = useState<WellnessCheckInType['mood']>('okay');
  const [painLevel, setPainLevel] = useState<number>(3);
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [sleepQuality, setSleepQuality] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [accessToCare, setAccessToCare] = useState<boolean>(true);
  const [financialStress, setFinancialStress] = useState<number>(3);

  const handleSubmit = () => {
    const checkIn = {
      mood,
      painLevel,
      energyLevel,
      sleepQuality,
      notes,
      accessToCare,
      financialStress
    };
    
    onSubmit(checkIn);
    speak('Wellness check-in saved successfully');
  };

  return (
    <AccessibleCard title="Daily Wellness Check-In">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How are you feeling today?
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { emoji: '😢', label: 'Struggling', value: 'struggling' },
              { emoji: '😕', label: 'Difficult', value: 'difficult' },
              { emoji: '😐', label: 'Okay', value: 'okay' },
              { emoji: '🙂', label: 'Good', value: 'good' },
              { emoji: '😊', label: 'Excellent', value: 'excellent' }
            ].map((moodOption) => (
              <AccessibleButton
                key={moodOption.value}
                onClick={() => {
                  setMood(moodOption.value as WellnessCheckInType['mood']);
                  speak(`Selected mood: ${moodOption.label}`);
                }}
                variant={mood === moodOption.value ? 'primary' : 'secondary'}
                size="md"
                ariaLabel={`Mood level: ${moodOption.label}`}
                className="text-2xl"
              >
                {moodOption.emoji}
              </AccessibleButton>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="pain-level" className="block text-sm font-medium text-gray-700 mb-2">
            Pain Level (1-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              id="pain-level"
              min="1"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(parseInt(e.target.value))}
              className="w-full"
              aria-label="Pain level from 1 to 10"
            />
            <span className="text-lg font-semibold">{painLevel}</span>
          </div>
        </div>

        <div>
          <label htmlFor="energy-level" className="block text-sm font-medium text-gray-700 mb-2">
            Energy Level (1-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              id="energy-level"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
              className="w-full"
              aria-label="Energy level from 1 to 10"
            />
            <span className="text-lg font-semibold">{energyLevel}</span>
          </div>
        </div>

        <div>
          <label htmlFor="sleep-quality" className="block text-sm font-medium text-gray-700 mb-2">
            Sleep Quality (1-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              id="sleep-quality"
              min="1"
              max="10"
              value={sleepQuality}
              onChange={(e) => setSleepQuality(parseInt(e.target.value))}
              className="w-full"
              aria-label="Sleep quality from 1 to 10"
            />
            <span className="text-lg font-semibold">{sleepQuality}</span>
          </div>
        </div>

        <div>
          <label htmlFor="financial-stress" className="block text-sm font-medium text-gray-700 mb-2">
            Financial Stress Level (1-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              id="financial-stress"
              min="1"
              max="10"
              value={financialStress}
              onChange={(e) => setFinancialStress(parseInt(e.target.value))}
              className="w-full"
              aria-label="Financial stress level from 1 to 10"
            />
            <span className="text-lg font-semibold">{financialStress}</span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={accessToCare}
              onChange={(e) => setAccessToCare(e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">I have access to healthcare if needed today</span>
          </label>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical"
            rows={3}
            placeholder="Any additional notes about how you're feeling today..."
          />
        </div>

        <AccessibleButton
          onClick={handleSubmit}
          variant="primary"
          size="lg"
          fullWidth
          ariaLabel="Save wellness check-in"
        >
          Save Check-in
        </AccessibleButton>
      </div>
    </AccessibleCard>
  );
};