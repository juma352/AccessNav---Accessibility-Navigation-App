import React, { useState } from 'react';
import { MapPin, Star, Filter, Search, Phone, Clock, DollarSign, Accessibility } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { LocalResource } from '../../types';

interface LocalResourcesProps {
  onClose: () => void;
}

export const LocalResources: React.FC<LocalResourcesProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for Kenya-specific resources
  const localResources: LocalResource[] = [
    {
      id: '1',
      name: 'Kenyatta National Hospital Rehabilitation Center',
      category: 'healthcare',
      location: { latitude: -1.3013, longitude: 36.8067, address: 'Hospital Rd, Nairobi', type: 'hospital', county: 'Nairobi' },
      accessibilityRating: 4,
      accessibilityFeatures: ['Wheelchair accessible', 'Accessible parking', 'Accessible restrooms', 'Rehabilitation equipment'],
      services: ['Physical therapy', 'Occupational therapy', 'Speech therapy', 'Assistive device fitting'],
      hours: 'Mon-Fri 8AM-5PM, Sat 8AM-12PM',
      contactInfo: '020 2726300',
      cost: 'NHIF accepted, subsidized rates',
      userRating: 4.2,
      reviews: [],
      nhifAccepted: true,
      governmentFacility: true,
      languagesSupported: ['English', 'Swahili'],
      disabilityServices: ['Comprehensive rehabilitation', 'Assistive device provision', 'Disability assessment']
    },
    {
      id: '2',
      name: 'Kenya Institute of Special Education (KISE)',
      category: 'education',
      location: { latitude: -1.2986, longitude: 36.7652, address: 'Kasarani, Nairobi', type: 'building', county: 'Nairobi' },
      accessibilityRating: 5,
      accessibilityFeatures: ['Fully accessible campus', 'Braille materials', 'Sign language interpreters', 'Accessible classrooms'],
      services: ['Special education training', 'Assessment services', 'Resource center', 'Assistive technology'],
      hours: 'Mon-Fri 8AM-5PM',
      contactInfo: '020 8091267',
      cost: 'Varies by program, scholarships available',
      userRating: 4.7,
      reviews: [],
      governmentFacility: true,
      languagesSupported: ['English', 'Swahili', 'Kenyan Sign Language'],
      disabilityServices: ['Educational assessment', 'Teacher training', 'Assistive technology training']
    },
    {
      id: '3',
      name: 'National Council for Persons with Disabilities (NCPWD)',
      category: 'government',
      location: { latitude: -1.2921, longitude: 36.8219, address: 'Waiyaki Way, Nairobi', type: 'government_office', county: 'Nairobi' },
      accessibilityRating: 4,
      accessibilityFeatures: ['Wheelchair accessible', 'Sign language services', 'Accessible documents', 'Accessible restrooms'],
      services: ['Disability registration', 'Tax exemption', 'Assistive device funding', 'Advocacy'],
      hours: 'Mon-Fri 8AM-5PM',
      contactInfo: '020 2727904',
      cost: 'Free services',
      userRating: 4.0,
      reviews: [],
      governmentFacility: true,
      languagesSupported: ['English', 'Swahili', 'Kenyan Sign Language'],
      disabilityServices: ['Disability registration', 'Policy implementation', 'Grants and funding']
    },
    {
      id: '4',
      name: 'Equity Bank - Accessible Banking',
      category: 'financial',
      location: { latitude: -1.2864, longitude: 36.8172, address: 'Muindi Mbingu St, Nairobi', type: 'bank', county: 'Nairobi' },
      accessibilityRating: 4,
      accessibilityFeatures: ['Wheelchair accessible', 'Priority service', 'Braille ATMs', 'Sign language staff'],
      services: ['Accessible banking', 'Financial literacy', 'Disability-friendly loans', 'Mobile banking'],
      hours: 'Mon-Fri 8AM-4PM, Sat 9AM-12PM',
      contactInfo: '0763 000 000',
      cost: 'Standard banking fees',
      userRating: 4.3,
      reviews: [],
      languagesSupported: ['English', 'Swahili'],
      disabilityServices: ['Accessible banking services', 'Financial inclusion programs']
    },
    {
      id: '5',
      name: 'Nairobi Accessible Transport Services',
      category: 'transport',
      location: { latitude: -1.2921, longitude: 36.8219, address: 'Nairobi CBD', type: 'matatu_stage', county: 'Nairobi' },
      accessibilityRating: 3,
      accessibilityFeatures: ['Accessible vehicles', 'Trained staff', 'Booking assistance'],
      services: ['Wheelchair accessible transport', 'Door-to-door service', 'Group transport'],
      hours: 'Daily 6AM-8PM',
      contactInfo: '0722 123 456',
      cost: 'Subsidized rates for PWDs',
      userRating: 4.1,
      reviews: [],
      languagesSupported: ['English', 'Swahili'],
      disabilityServices: ['Accessible transportation', 'Travel assistance']
    },
    {
      id: '6',
      name: 'Two Rivers Mall',
      category: 'market',
      location: { latitude: -1.2249, longitude: 36.8062, address: 'Limuru Rd, Nairobi', type: 'building', county: 'Nairobi' },
      accessibilityRating: 5,
      accessibilityFeatures: ['Wheelchair accessible', 'Accessible parking', 'Accessible restrooms', 'Elevators', 'Wide corridors'],
      services: ['Shopping', 'Dining', 'Entertainment', 'Customer service'],
      hours: 'Daily 9AM-9PM',
      contactInfo: '020 4403000',
      cost: 'Free entry',
      userRating: 4.5,
      reviews: [],
      languagesSupported: ['English', 'Swahili'],
      disabilityServices: ['Mobility assistance', 'Accessible shopping experience']
    },
    {
      id: '7',
      name: 'Kenya Association of the Intellectually Handicapped (KAIH)',
      category: 'ngo',
      location: { latitude: -1.3013, longitude: 36.7833, address: 'Waiyaki Way, Nairobi', type: 'building', county: 'Nairobi' },
      accessibilityRating: 4,
      accessibilityFeatures: ['Accessible entrance', 'Accessible materials', 'Sensory-friendly spaces'],
      services: ['Advocacy', 'Support groups', 'Skills training', 'Family support'],
      hours: 'Mon-Fri 8AM-5PM',
      contactInfo: '020 2714502',
      cost: 'Free services',
      userRating: 4.6,
      reviews: [],
      languagesSupported: ['English', 'Swahili'],
      disabilityServices: ['Intellectual disability support', 'Family counseling', 'Skills development']
    }
  ];

  const categories = [
    { key: 'all', label: 'All Resources', count: localResources.length },
    { key: 'healthcare', label: 'Healthcare', count: localResources.filter(r => r.category === 'healthcare').length },
    { key: 'education', label: 'Education', count: localResources.filter(r => r.category === 'education').length },
    { key: 'government', label: 'Government', count: localResources.filter(r => r.category === 'government').length },
    { key: 'financial', label: 'Banking', count: localResources.filter(r => r.category === 'financial').length },
    { key: 'market', label: 'Shopping', count: localResources.filter(r => r.category === 'market').length },
    { key: 'transport', label: 'Transport', count: localResources.filter(r => r.category === 'transport').length },
    { key: 'ngo', label: 'NGOs', count: localResources.filter(r => r.category === 'ngo').length },
  ];

  const filteredResources = localResources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    speak(`Showing ${category === 'all' ? 'all' : category} resources`);
  };

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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Local Resources</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close local resources"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources by name or service..."
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                aria-label="Search local resources"
              />
            </div>
          </div>
          <AccessibleButton
            onClick={() => speak('Opening advanced filters')}
            variant="secondary"
            size="lg"
            ariaLabel="Open advanced filters"
            icon={<Filter className="w-5 h-5" />}
          >
            Filters
          </AccessibleButton>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <AccessibleButton
              key={category.key}
              onClick={() => handleCategoryChange(category.key)}
              variant={activeCategory === category.key ? 'primary' : 'secondary'}
              size="md"
              ariaLabel={`Filter by ${category.label}, ${category.count} resources`}
              className="flex items-center gap-2"
            >
              {category.label}
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {category.count}
              </span>
            </AccessibleButton>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredResources.map((resource) => (
          <AccessibleCard key={resource.id} className="hover:shadow-xl transition-shadow">
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
                  onClick={() => speak(`Getting directions to ${resource.name}`)}
                  variant="primary"
                  size="md"
                  ariaLabel={`Get directions to ${resource.name}`}
                  icon={<MapPin className="w-4 h-4" />}
                >
                  Directions
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => speak(`Calling ${resource.name}`)}
                  variant="secondary"
                  size="md"
                  ariaLabel={`Call ${resource.name}`}
                  icon={<Phone className="w-4 h-4" />}
                >
                  Call
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => speak(`Viewing details for ${resource.name}`)}
                  variant="secondary"
                  size="md"
                  ariaLabel={`View details for ${resource.name}`}
                >
                  Details
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => speak(`Adding review for ${resource.name}`)}
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
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or category filters.
          </p>
          <AccessibleButton
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('all');
              speak('Cleared search filters');
            }}
            variant="primary"
            size="md"
            ariaLabel="Clear all filters"
          >
            Clear Filters
          </AccessibleButton>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Can't find what you're looking for?</h3>
        <p className="text-blue-800 mb-4">
          Help us improve our resource database by suggesting new locations or reporting outdated information.
        </p>
        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => speak('Suggesting new resource')}
            variant="primary"
            size="md"
            ariaLabel="Suggest new resource"
          >
            Suggest Resource
          </AccessibleButton>
          <AccessibleButton
            onClick={() => speak('Reporting issue with resource')}
            variant="secondary"
            size="md"
            ariaLabel="Report issue with resource"
          >
            Report Issue
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
};