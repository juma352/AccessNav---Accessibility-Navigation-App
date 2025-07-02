import React from 'react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { LocalResource } from '../../types';
import { MapPin, Star, Phone, Clock, DollarSign, Accessibility } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface LocalResourceCardProps {
  resource: LocalResource;
  onGetDirections: (resource: LocalResource) => void;
  onCall: (resource: LocalResource) => void;
  onViewDetails: (resource: LocalResource) => void;
  onReview: (resource: LocalResource) => void;
  distance?: string;
}

export const LocalResourceCard: React.FC<LocalResourceCardProps> = ({ 
  resource, 
  onGetDirections, 
  onCall, 
  onViewDetails, 
  onReview,
  distance 
}) => {
  const { speak } = useAccessibility();

  const renderAccessibilityRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Accessibility
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-green-600 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{rating}/5</span>
      </div>
    );
  };

  return (
    <AccessibleCard className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.name}</h3>
            <div className="flex items-center gap-4 text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {resource.location.address}
              </span>
              <span className="capitalize">{resource.category}</span>
              {distance && (
                <span className="font-medium text-blue-600">
                  {distance}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-600 mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">{resource.userRating}</span>
            </div>
            {renderAccessibilityRating(resource.accessibilityRating)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
            <div className="flex flex-wrap gap-2">
              {resource.services.map((service, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Accessibility Features:</h4>
            <div className="flex flex-wrap gap-2">
              {resource.accessibilityFeatures.map((feature, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>{resource.hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{resource.contactInfo}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span>{resource.cost}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <AccessibleButton
            onClick={() => onGetDirections(resource)}
            variant="primary"
            size="md"
            ariaLabel={`Get directions to ${resource.name}`}
            icon={<MapPin className="w-4 h-4" />}
          >
            Directions
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onCall(resource)}
            variant="secondary"
            size="md"
            ariaLabel={`Call ${resource.name}`}
            icon={<Phone className="w-4 h-4" />}
          >
            Call
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onViewDetails(resource)}
            variant="secondary"
            size="md"
            ariaLabel={`View details for ${resource.name}`}
          >
            Details
          </AccessibleButton>
          <AccessibleButton
            onClick={() => onReview(resource)}
            variant="secondary"
            size="md"
            ariaLabel={`Add review for ${resource.name}`}
            icon={<Star className="w-4 h-4" />}
          >
            Review
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );
};