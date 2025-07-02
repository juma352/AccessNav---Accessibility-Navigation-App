import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { JobListing as JobListingType } from '../../types';
import { MapPin, Briefcase, DollarSign, Calendar, ExternalLink, Phone } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface JobListingProps {
  job: JobListingType;
  onApply: (jobId: string) => void;
  isApplied: boolean;
}

export const JobListing: React.FC<JobListingProps> = ({ job, onApply, isApplied }) => {
  const { speak } = useAccessibility();

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}, {job.county}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {job.salaryRange}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {job.disabilityFriendly && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Disability Friendly
              </div>
            )}
            {job.ncpwdPartner && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                NCPWD Partner
              </div>
            )}
            {job.remote && (
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Remote Work
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-700">{job.description}</p>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
            <ul className="text-gray-700 text-sm space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index}>• {req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Accessibility Features:</h4>
            <div className="flex flex-wrap gap-2">
              {job.accessibilityFeatures.map((feature, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Accommodations Offered:</h4>
            <div className="flex flex-wrap gap-2">
              {job.accommodationsOffered.map((accommodation, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {accommodation}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Languages Required:</h4>
            <p className="text-gray-700 text-sm">{job.languageRequirements.join(', ')}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-500">
            Posted {job.postedDate.toLocaleDateString()}
            {job.applicationDeadline && ` • Deadline: ${job.applicationDeadline.toLocaleDateString()}`}
          </span>
          <div className="flex gap-3">
            <AccessibleButton
              onClick={() => speak(`Viewing details for ${job.title} at ${job.company}`)}
              variant="secondary"
              size="md"
              ariaLabel={`View details for ${job.title} position`}
              icon={<ExternalLink className="w-4 h-4" />}
            >
              View Details
            </AccessibleButton>
            <AccessibleButton
              onClick={() => window.open(`mailto:${job.contactInfo}?subject=Application for ${job.title}`)}
              variant="secondary"
              size="md"
              ariaLabel={`Contact ${job.company} about ${job.title}`}
              icon={<Phone className="w-4 h-4" />}
            >
              Contact
            </AccessibleButton>
            <AccessibleButton
              onClick={() => onApply(job.id)}
              variant={isApplied ? "success" : "primary"}
              size="md"
              disabled={isApplied}
              ariaLabel={isApplied ? `Already applied for ${job.title}` : `Apply for ${job.title} position`}
            >
              {isApplied ? 'Applied ✓' : 'Apply Now'}
            </AccessibleButton>
          </div>
        </div>
      </div>
    </AccessibleCard>
  );
};