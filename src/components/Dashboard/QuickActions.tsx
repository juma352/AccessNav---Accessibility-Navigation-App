import React from 'react';
import { Navigation, MapPin, Users, AlertTriangle, Phone, Map } from 'lucide-react';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface QuickActionsProps {
  onNavigateClick: () => void;
  onFindNearbyClick: () => void;
  onCommunityClick: () => void;
  onReportClick: () => void;
  onEmergencyClick: () => void;
  onOfflineClick: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onNavigateClick,
  onFindNearbyClick,
  onCommunityClick,
  onReportClick,
  onEmergencyClick,
  onOfflineClick,
}) => {
  const { speak } = useAccessibility();

  const actions = [
    {
      title: 'Start Navigation',
      description: 'Get accessible directions to your destination',
      icon: <Navigation className="w-8 h-8 text-blue-600" />,
      onClick: onNavigateClick,
      ariaLabel: 'Start accessible navigation to destination',
      priority: 'medium' as const,
    },
    {
      title: 'Find Nearby',
      description: 'Discover accessible places around you',
      icon: <MapPin className="w-8 h-8 text-green-600" />,
      onClick: onFindNearbyClick,
      ariaLabel: 'Find accessible places nearby',
      priority: 'medium' as const,
    },
    {
      title: 'Community',
      description: 'Connect with other users and share updates',
      icon: <Users className="w-8 h-8 text-purple-600" />,
      onClick: onCommunityClick,
      ariaLabel: 'Access community features and updates',
      priority: 'low' as const,
    },
    {
      title: 'Report Issue',
      description: 'Help improve accessibility by reporting barriers',
      icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
      onClick: onReportClick,
      ariaLabel: 'Report accessibility barriers or issues',
      priority: 'medium' as const,
    },
    {
      title: 'Emergency',
      description: 'Quick access to emergency assistance',
      icon: <Phone className="w-8 h-8 text-red-600" />,
      onClick: onEmergencyClick,
      ariaLabel: 'Access emergency assistance features',
      priority: 'high' as const,
    },
    {
      title: 'Offline Maps',
      description: 'Download maps for offline navigation',
      icon: <Map className="w-8 h-8 text-teal-600" />,
      onClick: onOfflineClick,
      ariaLabel: 'Manage offline maps and navigation',
      priority: 'low' as const,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <AccessibleCard
            key={index}
            title={action.title}
            clickable
            onClick={action.onClick}
            ariaLabel={action.ariaLabel}
            priority={action.priority}
            className="hover:bg-gray-50"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>
    </div>
  );
};