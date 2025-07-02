import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { MentorProfile as MentorProfileType } from '../../types';
import { Star, ExternalLink, MapPin } from 'lucide-react';

interface MentorProfileProps {
  mentor: MentorProfileType;
  onConnect: (mentorId: string) => void;
  isConnected: boolean;
}

export const MentorProfile: React.FC<MentorProfileProps> = ({ mentor, onConnect, isConnected }) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
            <p className="text-gray-600">{mentor.profession}</p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {mentor.county} County
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-yellow-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">{mentor.rating}</span>
            </div>
            {mentor.ncpwdMember && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                NCPWD Member
              </div>
            )}
            {isConnected && (
              <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                Connected ✓
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-700 text-sm">{mentor.bio}</p>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Experience:</span>
              <p>{mentor.experience} years</p>
            </div>
            <div>
              <span className="font-semibold">Availability:</span>
              <p>{mentor.availability}</p>
            </div>
          </div>

          <div>
            <span className="font-semibold">Languages:</span>
            <p className="text-sm">{mentor.languages.join(', ')}</p>
          </div>

          <div>
            <span className="font-semibold">Mentorship Style:</span>
            <p className="text-sm">{mentor.mentorshipStyle}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => speak(`Viewing ${mentor.name}'s full profile and testimonials`)}
            variant="secondary"
            size="md"
            ariaLabel={`View ${mentor.name}'s full profile`}
            icon={<ExternalLink className="w-4 h-4" />}
          >
            View Profile
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onConnect(mentor.id)}
            variant={isConnected ? "success" : "primary"}
            size="md"
            disabled={isConnected}
            ariaLabel={isConnected ? `Already connected with ${mentor.name}` : `Connect with mentor ${mentor.name}`}
          >
            {isConnected ? 'Connected ✓' : 'Connect'}
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};