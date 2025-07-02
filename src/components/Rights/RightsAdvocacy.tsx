import React, { useState, useEffect } from 'react';
import { Scale, BookOpen, Vote, Phone, FileText, Users, ExternalLink } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { LegalResource, RightsEducation, CivicOpportunity } from '../../types';
import { LegalResource as LegalResourceComponent } from './LegalResource';
import { RightsEducation as RightsEducationComponent } from './RightsEducation';
import { CivicOpportunity as CivicOpportunityComponent } from './CivicOpportunity';

interface RightsAdvocacyProps {
  onClose: () => void;
}

export const RightsAdvocacy: React.FC<RightsAdvocacyProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'legal' | 'education' | 'civic' | 'advocacy'>('legal');
  const [legalResources, setLegalResources] = useState<LegalResource[]>([]);
  const [rightsEducation, setRightsEducation] = useState<RightsEducation[]>([]);
  const [civicOpportunities, setCivicOpportunities] = useState<CivicOpportunity[]>([]);

  // Load initial data
  useEffect(() => {
    // Mock data
    setLegalResources([
      {
        id: '1',
        name: 'Kenya National Commission on Human Rights',
        type: 'government-agency',
        specialties: ['Disability rights', 'Human rights violations', 'Legal representation'],
        location: { 
          latitude: -1.2921, 
          longitude: 36.8219, 
          address: 'CVS Plaza, Lenana Road, Nairobi', 
          type: 'government_office' 
        },
        contactInfo: '020 2717908',
        services: ['Legal advocacy', 'Rights education', 'Policy work', 'Complaint handling'],
        eligibility: 'All Kenyan citizens',
        cost: 'free',
        languages: ['English', 'Swahili'],
        ncpwdAffiliated: true,
        governmentRecognized: true
      },
      {
        id: '2',
        name: 'Kituo Cha Sheria',
        type: 'legal-aid',
        specialties: ['Disability discrimination', 'Housing rights', 'Employment discrimination'],
        location: { 
          latitude: -1.2864, 
          longitude: 36.8172, 
          address: 'Ole Odume Road, Nairobi', 
          type: 'building' 
        },
        contactInfo: '020 2451631',
        services: ['Legal representation', 'Advice', 'Self-help resources', 'Community legal education'],
        eligibility: 'Low-income individuals',
        cost: 'free',
        languages: ['English', 'Swahili', 'Local languages'],
        ncpwdAffiliated: false,
        governmentRecognized: true
      },
      {
        id: '3',
        name: 'United Disabled Persons of Kenya',
        type: 'dpo',
        specialties: ['Disability rights advocacy', 'Policy development', 'Inclusive education'],
        location: { 
          latitude: -1.2921, 
          longitude: 36.8219, 
          address: 'Waiyaki Way, Nairobi', 
          type: 'building' 
        },
        contactInfo: '020 2244600',
        services: ['Advocacy', 'Capacity building', 'Research', 'Networking'],
        eligibility: 'Persons with disabilities and DPOs',
        cost: 'free',
        languages: ['English', 'Swahili', 'Sign language'],
        ncpwdAffiliated: true,
        governmentRecognized: true
      }
    ]);

    setRightsEducation([
      {
        id: '1',
        title: 'Persons with Disabilities Act 2025 - Key Rights',
        category: 'employment',
        content: 'The Persons with Disabilities Act 2025 strengthens employment rights for persons with disabilities in Kenya, including reasonable accommodations, non-discrimination, and affirmative action.',
        lastUpdated: new Date('2025-03-01'),
        jurisdiction: 'national',
        keyPoints: [
          'Employers must provide reasonable accommodations',
          'Discrimination based on disability is prohibited',
          'Affirmative action requires 5% of positions for PWDs',
          'Tax incentives for employers hiring PWDs',
          'Right to accessible workplaces and equal pay'
        ],
        resources: ['NCPWD.go.ke', 'KenyaLawReports.org', 'DisabilityRightsKE.org'],
        actionSteps: [
          'Document any discrimination',
          'Request accommodations in writing',
          'Contact NCPWD if rights are violated',
          'File complaint with Kenya National Commission on Human Rights',
          'Seek legal aid from disability rights organizations'
        ],
        relevantLaws: ['Persons with Disabilities Act 2025', 'Employment Act', 'Constitution of Kenya 2010'],
        language: ['English', 'Swahili']
      },
      {
        id: '2',
        title: 'Accessible Housing Rights in Kenya',
        category: 'housing',
        content: 'Under Kenyan law, persons with disabilities have the right to accessible housing and reasonable modifications to their living spaces.',
        lastUpdated: new Date('2025-02-15'),
        jurisdiction: 'national',
        keyPoints: [
          'Right to accessible housing under PWD Act 2025',
          'Landlords must allow reasonable modifications',
          'New buildings must meet accessibility standards',
          'Protection from housing discrimination',
          'Right to accessible common areas in apartments'
        ],
        resources: ['NCPWD.go.ke/housing', 'KenyaHousingAuthority.org', 'AccessibleKE.org'],
        actionSteps: [
          'Request reasonable modifications in writing',
          'Document housing discrimination',
          'Contact NCPWD for housing rights violations',
          'File complaint with Kenya National Commission on Human Rights',
          'Seek legal aid for housing disputes'
        ],
        relevantLaws: ['Persons with Disabilities Act 2025', 'Housing Act', 'Constitution of Kenya 2010'],
        language: ['English', 'Swahili']
      }
    ]);

    setCivicOpportunities([
      {
        id: '1',
        title: 'County Assembly Public Participation',
        type: 'public-participation',
        description: 'Participate in county assembly sessions and provide input on disability-inclusive policies.',
        location: {
          latitude: -1.2921,
          longitude: 36.8219,
          address: 'County Assembly Chambers, Nairobi',
          type: 'government_office'
        },
        date: new Date('2025-04-15'),
        registrationRequired: true,
        accessibilityFeatures: ['Sign language interpretation', 'Wheelchair accessible', 'Audio assistance'],
        contactInfo: '020 2234567',
        eligibility: 'All citizens',
        impact: 'high',
        category: 'policy'
      }
    ]);
  }, []);

  // Handler functions for civic opportunities
  const handleLearnMore = (opportunityId: string) => {
    speak(`Learning more about civic opportunity ${opportunityId}`);
    // Add logic to show more details or navigate to detailed view
  };

  const handleRegister = (opportunityId: string) => {
    speak(`Registering for civic opportunity ${opportunityId}`);
    // Add logic to handle registration process
  };

  const handleAddToCalendar = (opportunityId: string) => {
    speak(`Adding civic opportunity ${opportunityId} to calendar`);
    // Add logic to add event to calendar
  };

  const tabs = [
    { id: 'legal', label: 'Legal Resources', icon: Scale },
    { id: 'education', label: 'Rights Education', icon: BookOpen },
    { id: 'civic', label: 'Civic Engagement', icon: Vote },
    { id: 'advocacy', label: 'Advocacy Tools', icon: Users }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'legal':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Legal Resources & Support</h3>
            {legalResources.map((resource) => (
              <LegalResourceComponent key={resource.id} resource={resource} />
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Rights Education</h3>
            {rightsEducation.map((education) => (
              <RightsEducationComponent key={education.id} education={education} />
            ))}
          </div>
        );
      case 'civic':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Civic Engagement Opportunities</h3>
            {civicOpportunities.map((opportunity) => (
              <CivicOpportunityComponent 
                key={opportunity.id} 
                opportunity={opportunity}
                onLearnMore={handleLearnMore}
                onRegister={handleRegister}
                onAddToCalendar={handleAddToCalendar}
              />
            ))}
          </div>
        );
      case 'advocacy':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Advocacy Tools</h3>
            <AccessibleCard className="p-6">
              <div className="flex items-start space-x-4">
                <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Complaint Templates</h4>
                  <p className="text-gray-600 mb-4">
                    Pre-written templates for filing complaints about disability discrimination or rights violations.
                  </p>
                  <AccessibleButton
                    variant="primary"
                    onClick={() => speak('Opening complaint templates')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Access Templates
                  </AccessibleButton>
                </div>
              </div>
            </AccessibleCard>
            
            <AccessibleCard className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Emergency Advocacy Hotline</h4>
                  <p className="text-gray-600 mb-4">
                    24/7 hotline for urgent disability rights violations and emergency advocacy support.
                  </p>
                  <AccessibleButton
                    variant="secondary"
                    onClick={() => speak('Calling emergency advocacy hotline')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: 0800-RIGHTS
                  </AccessibleButton>
                </div>
              </div>
            </AccessibleCard>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Scale className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Rights & Advocacy</h1>
            </div>
            <AccessibleButton
              variant="ghost"
              onClick={onClose}
              aria-label="Close Rights & Advocacy"
            >
              ×
            </AccessibleButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Rights and Advocacy tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <AccessibleButton
                    key={tab.id}
                    variant="ghost"
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      speak(`Switched to ${tab.label} tab`);
                    }}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </AccessibleButton>
                );
              })}
            </nav>
          </div>

          <div className="p-6" role="tabpanel">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};