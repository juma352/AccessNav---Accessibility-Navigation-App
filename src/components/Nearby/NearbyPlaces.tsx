import React, { useState, useEffect } from 'react';
import { MapPin, Star, Filter, Search, Phone, Clock, DollarSign, Accessibility, Navigation, ExternalLink } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { GoogleMap } from '../common/GoogleMap';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useAuth } from '../../contexts/AuthContext';
import { LocalResource } from '../../types';

interface NearbyPlacesProps {
  onClose: () => void;
}

export const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<LocalResource[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState<LocalResource | null>(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          loadNearbyPlaces(location);
          setIsLoadingLocation(false);
          speak('Location found. Loading nearby accessible places.');
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback to user's county center or default location
          const fallbackLocation = getFallbackLocation();
          setUserLocation(fallbackLocation);
          loadNearbyPlaces(fallbackLocation);
          setIsLoadingLocation(false);
          speak('Using your county location to find nearby places.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      const fallbackLocation = getFallbackLocation();
      setUserLocation(fallbackLocation);
      loadNearbyPlaces(fallbackLocation);
      setIsLoadingLocation(false);
      speak('GPS not available. Using your county location.');
    }
  }, []);

  const getFallbackLocation = () => {
    // County centers for major Kenyan counties
    const countyLocations: Record<string, { lat: number; lng: number }> = {
      'Nairobi': { lat: -1.2921, lng: 36.8219 },
      'Mombasa': { lat: -4.0435, lng: 39.6682 },
      'Kisumu': { lat: -0.0917, lng: 34.7680 },
      'Nakuru': { lat: -0.3031, lng: 36.0800 },
      'Eldoret': { lat: 0.5143, lng: 35.2698 },
      'Thika': { lat: -1.0332, lng: 37.0692 },
      'Machakos': { lat: -1.5177, lng: 37.2634 },
      'Nyeri': { lat: -0.4209, lng: 36.9483 },
      'Meru': { lat: 0.0467, lng: 37.6556 },
      'Kitui': { lat: -1.3667, lng: 38.0167 }
    };

    const userCounty = user?.county || 'Nairobi';
    return countyLocations[userCounty] || countyLocations['Nairobi'];
  };

  const loadNearbyPlaces = (location: { lat: number; lng: number }) => {
    // Generate places based on location and user's county
    const places = generateNearbyPlaces(location, user?.county || 'Nairobi');
    setNearbyPlaces(places);
  };

  const generateNearbyPlaces = (location: { lat: number; lng: number }, county: string): LocalResource[] => {
    const baseDistance = 0.01; // Roughly 1km in degrees
    
    const places: LocalResource[] = [
      // Healthcare facilities
      {
        id: '1',
        name: `${county} County Hospital`,
        category: 'healthcare',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 2,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 2,
          address: `Hospital Road, ${county}`,
          type: 'hospital',
          county: county,
          ward: 'Central'
        },
        accessibilityRating: 4,
        accessibilityFeatures: ['Wheelchair accessible', 'Accessible parking', 'Sign language interpreters', 'Accessible restrooms'],
        services: ['Emergency care', 'Outpatient services', 'Rehabilitation', 'Pharmacy'],
        hours: '24/7 Emergency, Clinics 8AM-5PM',
        contactInfo: '020 2726300',
        cost: 'NHIF accepted, subsidized rates',
        userRating: 4.2,
        reviews: [],
        nhifAccepted: true,
        governmentFacility: true,
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Physiotherapy', 'Occupational therapy', 'Mental health counseling']
      },
      {
        id: '2',
        name: `${county} Health Centre`,
        category: 'healthcare',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.5,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.5,
          address: `Health Centre Road, ${county}`,
          type: 'hospital',
          county: county
        },
        accessibilityRating: 3,
        accessibilityFeatures: ['Wheelchair accessible entrance', 'Accessible restrooms'],
        services: ['Primary healthcare', 'Maternal health', 'Immunization', 'Basic pharmacy'],
        hours: 'Mon-Fri 8AM-5PM, Sat 8AM-12PM',
        contactInfo: '020 2234567',
        cost: 'Free basic services, NHIF accepted',
        userRating: 3.8,
        reviews: [],
        nhifAccepted: true,
        governmentFacility: true,
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Basic rehabilitation', 'Health education']
      },

      // Educational institutions
      {
        id: '3',
        name: `${county} Public Library`,
        category: 'education',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.2,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.2,
          address: `Library Street, ${county}`,
          type: 'building',
          county: county
        },
        accessibilityRating: 4,
        accessibilityFeatures: ['Wheelchair accessible', 'Braille materials', 'Audio books', 'Large print books'],
        services: ['Books and media', 'Computer access', 'Study rooms', 'Research assistance'],
        hours: 'Mon-Fri 8AM-6PM, Sat 8AM-4PM',
        contactInfo: '020 2345678',
        cost: 'Free membership',
        userRating: 4.1,
        reviews: [],
        governmentFacility: true,
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Screen reader software', 'Magnification tools', 'Braille printing']
      },
      {
        id: '4',
        name: `${county} Technical Institute`,
        category: 'education',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 2,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 2,
          address: `Technical Road, ${county}`,
          type: 'building',
          county: county
        },
        accessibilityRating: 3,
        accessibilityFeatures: ['Wheelchair accessible', 'Accessible classrooms', 'Assistive technology'],
        services: ['Technical courses', 'Skills training', 'Certification programs', 'Job placement'],
        hours: 'Mon-Fri 7AM-5PM',
        contactInfo: '020 2456789',
        cost: 'Course fees apply, scholarships available',
        userRating: 4.0,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Inclusive education', 'Assistive technology training']
      },

      // Government services
      {
        id: '5',
        name: `${county} Huduma Centre`,
        category: 'government',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.8,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.8,
          address: `Government Road, ${county}`,
          type: 'government_office',
          county: county
        },
        accessibilityRating: 3,
        accessibilityFeatures: ['Wheelchair accessible entrance', 'Priority queue for PWDs', 'Sign language interpreters'],
        services: ['ID applications', 'Passport services', 'Business registration', 'NHIF services', 'Birth certificates'],
        hours: 'Mon-Fri 8AM-5PM',
        contactInfo: '020 2567890',
        cost: 'Government fees apply',
        userRating: 3.5,
        reviews: [],
        governmentFacility: true,
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Priority service', 'Assistance with forms', 'Accessible counters']
      },
      {
        id: '6',
        name: `${county} County Assembly`,
        category: 'government',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 2.2,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 2.2,
          address: `Assembly Road, ${county}`,
          type: 'government_office',
          county: county
        },
        accessibilityRating: 4,
        accessibilityFeatures: ['Wheelchair accessible', 'Accessible seating', 'Audio enhancement', 'Sign language interpretation'],
        services: ['Public participation', 'County legislation', 'Budget participation', 'Civic education'],
        hours: 'Mon-Fri 8AM-5PM, Public sessions vary',
        contactInfo: '020 2678901',
        cost: 'Free public access',
        userRating: 3.9,
        reviews: [],
        governmentFacility: true,
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Accessible public participation', 'Disability advocacy support']
      },

      // Financial services
      {
        id: '7',
        name: `Equity Bank - ${county} Branch`,
        category: 'financial',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.5,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.5,
          address: `Bank Street, ${county}`,
          type: 'bank',
          county: county
        },
        accessibilityRating: 4,
        accessibilityFeatures: ['Wheelchair accessible', 'Accessible ATM', 'Audio banking', 'Priority service'],
        services: ['Banking', 'Loans', 'Mobile banking', 'Insurance', 'Foreign exchange'],
        hours: 'Mon-Fri 9AM-4PM, Sat 9AM-12PM',
        contactInfo: '020 2789012',
        cost: 'Standard banking fees',
        userRating: 4.3,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Audio ATM', 'Assistance with transactions', 'Accessible banking halls']
      },
      {
        id: '8',
        name: `${county} SACCO`,
        category: 'financial',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.3,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.3,
          address: `SACCO Plaza, ${county}`,
          type: 'bank',
          county: county
        },
        accessibilityRating: 3,
        accessibilityFeatures: ['Wheelchair accessible', 'Large print materials', 'Patient service'],
        services: ['Savings', 'Loans', 'Insurance', 'Investment', 'Financial education'],
        hours: 'Mon-Fri 8AM-5PM, Sat 8AM-1PM',
        contactInfo: '020 2890123',
        cost: 'Member rates, low fees',
        userRating: 4.1,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Financial counseling', 'Accessible loan processing']
      },

      // Shopping and markets
      {
        id: '9',
        name: `${county} Central Market`,
        category: 'market',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.7,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.7,
          address: `Market Road, ${county}`,
          type: 'building',
          county: county
        },
        accessibilityRating: 2,
        accessibilityFeatures: ['Some wheelchair access', 'Wide aisles in sections'],
        services: ['Fresh produce', 'Clothing', 'Household items', 'Food vendors'],
        hours: 'Daily 6AM-7PM',
        contactInfo: '020 2901234',
        cost: 'Varies by vendor',
        userRating: 3.6,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Vendor assistance available']
      },
      {
        id: '10',
        name: `${county} Shopping Centre`,
        category: 'market',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 2.1,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 2.1,
          address: `Shopping Centre Road, ${county}`,
          type: 'building',
          county: county
        },
        accessibilityRating: 4,
        accessibilityFeatures: ['Full wheelchair access', 'Accessible parking', 'Elevators', 'Accessible restrooms'],
        services: ['Supermarket', 'Pharmacy', 'Banking', 'Restaurants', 'Clothing stores'],
        hours: 'Daily 8AM-9PM',
        contactInfo: '020 3012345',
        cost: 'Free entry, varies by store',
        userRating: 4.4,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Wheelchair rental', 'Shopping assistance']
      },

      // Religious centers
      {
        id: '11',
        name: `${county} Cathedral`,
        category: 'religious',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.9,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.9,
          address: `Cathedral Road, ${county}`,
          type: 'church',
          county: county
        },
        accessibilityRating: 3,
        accessibilityFeatures: ['Wheelchair accessible entrance', 'Reserved seating for PWDs', 'Audio enhancement'],
        services: ['Worship services', 'Community programs', 'Counseling', 'Events'],
        hours: 'Services: Sun 7AM, 9AM, 11AM; Daily prayers 6AM, 6PM',
        contactInfo: '020 3123456',
        cost: 'Free worship, donations welcome',
        userRating: 4.2,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Sign language interpretation (on request)', 'Accessible seating', 'Large print materials']
      },
      {
        id: '12',
        name: `${county} Central Mosque`,
        category: 'religious',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.6,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.6,
          address: `Mosque Street, ${county}`,
          type: 'mosque',
          county: county
        },
        accessibilityRating: 3,
        accessibilityFeatures: ['Wheelchair accessible', 'Accessible ablution facilities', 'Reserved prayer space'],
        services: ['Prayer services', 'Islamic education', 'Community support', 'Religious counseling'],
        hours: 'Daily prayers, Friday Juma 1PM',
        contactInfo: '020 3234567',
        cost: 'Free worship, donations welcome',
        userRating: 4.0,
        reviews: [],
        languagesSupported: ['English', 'Swahili', 'Arabic'],
        disabilityServices: ['Accessible prayer facilities', 'Community support']
      },

      // Transport hubs
      {
        id: '13',
        name: `${county} Matatu Stage`,
        category: 'transport',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 1.4,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 1.4,
          address: `Transport Hub, ${county}`,
          type: 'matatu_stage',
          county: county
        },
        accessibilityRating: 2,
        accessibilityFeatures: ['Some accessible routes', 'Assistance available'],
        services: ['Matatu transport', 'Route information', 'Ticketing', 'Waiting area'],
        hours: '5AM-10PM daily',
        contactInfo: '020 3345678',
        cost: 'Varies by route',
        userRating: 3.2,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Transport assistance', 'Priority boarding']
      },

      // Recreation
      {
        id: '14',
        name: `${county} Public Park`,
        category: 'recreation',
        location: {
          latitude: location.lat + (Math.random() - 0.5) * baseDistance * 2.3,
          longitude: location.lng + (Math.random() - 0.5) * baseDistance * 2.3,
          address: `Park Avenue, ${county}`,
          type: 'building',
          county: county
        },
        accessibilityRating: 3,
        accessibilityFeatures: ['Paved pathways', 'Accessible restrooms', 'Accessible playground equipment'],
        services: ['Recreation', 'Exercise facilities', 'Children\'s playground', 'Events space'],
        hours: '6AM-6PM daily',
        contactInfo: '020 3456789',
        cost: 'Free entry',
        userRating: 4.0,
        reviews: [],
        languagesSupported: ['English', 'Swahili'],
        disabilityServices: ['Accessible recreation facilities', 'Adaptive sports equipment']
      }
    ];

    return places;
  };

  const categories = [
    { key: 'all', label: 'All Places', count: nearbyPlaces.length },
    { key: 'healthcare', label: 'Healthcare', count: nearbyPlaces.filter(p => p.category === 'healthcare').length },
    { key: 'education', label: 'Education', count: nearbyPlaces.filter(p => p.category === 'education').length },
    { key: 'government', label: 'Government', count: nearbyPlaces.filter(p => p.category === 'government').length },
    { key: 'financial', label: 'Banking', count: nearbyPlaces.filter(p => p.category === 'financial').length },
    { key: 'market', label: 'Shopping', count: nearbyPlaces.filter(p => p.category === 'market').length },
    { key: 'religious', label: 'Religious', count: nearbyPlaces.filter(p => p.category === 'religious').length },
    { key: 'transport', label: 'Transport', count: nearbyPlaces.filter(p => p.category === 'transport').length },
    { key: 'recreation', label: 'Recreation', count: nearbyPlaces.filter(p => p.category === 'recreation').length },
  ];

  const filteredPlaces = nearbyPlaces.filter(place => {
    const matchesCategory = activeCategory === 'all' || place.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    speak(`Showing ${category === 'all' ? 'all' : category} places`);
  };

  const handleGetDirections = (place: LocalResource) => {
    if (!userLocation) {
      speak('Unable to get directions. Location not available.');
      return;
    }

    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${place.location.latitude},${place.location.longitude}`;
    
    // Open Google Maps with directions
    const googleMapsUrl = `https://www.google.com/maps/dir/${origin}/${destination}`;
    window.open(googleMapsUrl, '_blank');
    
    speak(`Opening directions to ${place.name} in Google Maps`);
  };

  const handleCall = (place: LocalResource) => {
    if (place.contactInfo) {
      window.open(`tel:${place.contactInfo}`);
      speak(`Calling ${place.name}`);
    } else {
      speak('Phone number not available');
    }
  };

  const handleViewDetails = (place: LocalResource) => {
    setSelectedPlace(place);
    speak(`Viewing details for ${place.name}`);
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

  const calculateDistance = (place: LocalResource) => {
    if (!userLocation) return 'Unknown distance';
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = (place.location.latitude - userLocation.lat) * Math.PI / 180;
    const dLon = (place.location.longitude - userLocation.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(place.location.latitude * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else {
      return `${distance.toFixed(1)}km`;
    }
  };

  if (isLoadingLocation) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="loading-spinner w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Finding Your Location</h3>
          <p className="text-gray-600">
            Getting your location to find nearby accessible places...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Nearby Accessible Places</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close nearby places"
        >
          Close
        </AccessibleButton>
      </div>

      {/* Location Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">
            Showing places near {user?.county || 'your location'}
          </span>
        </div>
        <p className="text-sm text-blue-800">
          {userLocation ? 
            `Found ${filteredPlaces.length} accessible places within 5km of your location` :
            `Showing places in ${user?.county || 'your area'}`
          }
        </p>
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
                placeholder="Search places by name or service..."
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                aria-label="Search nearby places"
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
              ariaLabel={`Filter by ${category.label}, ${category.count} places`}
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Places List */}
        <div className="space-y-4 max-h-[800px] overflow-y-auto">
          {filteredPlaces.map((place) => (
            <AccessibleCard key={place.id} className="hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h3>
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {place.location.address}
                      </span>
                      <span className="capitalize">{place.category}</span>
                      <span className="font-medium text-blue-600">
                        {calculateDistance(place)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600 mb-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{place.userRating}</span>
                    </div>
                    {renderAccessibilityRating(place.accessibilityRating)}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {place.services.slice(0, 3).map((service, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {service}
                        </span>
                      ))}
                      {place.services.length > 3 && (
                        <span className="text-sm text-gray-500">+{place.services.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Accessibility:</h4>
                    <div className="flex flex-wrap gap-2">
                      {place.accessibilityFeatures.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                          {feature}
                        </span>
                      ))}
                      {place.accessibilityFeatures.length > 2 && (
                        <span className="text-sm text-gray-500">+{place.accessibilityFeatures.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{place.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span>{place.cost}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <AccessibleButton
                    onClick={() => handleGetDirections(place)}
                    variant="primary"
                    size="md"
                    ariaLabel={`Get directions to ${place.name}`}
                    icon={<Navigation className="w-4 h-4" />}
                  >
                    Directions
                  </AccessibleButton>
                  <AccessibleButton
                    onClick={() => handleCall(place)}
                    variant="secondary"
                    size="md"
                    ariaLabel={`Call ${place.name}`}
                    icon={<Phone className="w-4 h-4" />}
                  >
                    Call
                  </AccessibleButton>
                  <AccessibleButton
                    onClick={() => handleViewDetails(place)}
                    variant="secondary"
                    size="md"
                    ariaLabel={`View details for ${place.name}`}
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Details
                  </AccessibleButton>
                </div>
              </div>
            </AccessibleCard>
          ))}

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No places found</h3>
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
        </div>

        {/* Map */}
        <div className="space-y-4">
          <AccessibleCard title="Map View">
            <GoogleMap
              center={userLocation || { lat: -1.2921, lng: 36.8219 }}
              zoom={14}
              markers={[
                ...(userLocation ? [{
                  position: userLocation,
                  title: 'Your Location',
                  accessible: true,
                  info: 'Your current location'
                }] : []),
                ...filteredPlaces.map(place => ({
                  position: { lat: place.location.latitude, lng: place.location.longitude },
                  title: place.name,
                  accessible: place.accessibilityRating >= 3,
                  info: `${place.name} - ${place.category} - ${calculateDistance(place)}`
                }))
              ]}
              height="500px"
              className="w-full"
            />
          </AccessibleCard>

          {/* Quick Stats */}
          <AccessibleCard title="Area Summary">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{nearbyPlaces.length}</div>
                <div className="text-sm text-gray-600">Total Places</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {nearbyPlaces.filter(p => p.accessibilityRating >= 4).length}
                </div>
                <div className="text-sm text-gray-600">Highly Accessible</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {nearbyPlaces.filter(p => p.nhifAccepted).length}
                </div>
                <div className="text-sm text-gray-600">NHIF Accepted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {nearbyPlaces.filter(p => p.governmentFacility).length}
                </div>
                <div className="text-sm text-gray-600">Government</div>
              </div>
            </div>
          </AccessibleCard>
        </div>
      </div>

      {/* Place Details Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl font-bold text-gray-900">{selectedPlace.name}</h3>
              <AccessibleButton
                onClick={() => setSelectedPlace(null)}
                variant="secondary"
                size="sm"
                ariaLabel="Close place details"
              >
                ×
              </AccessibleButton>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                  <p className="text-gray-700">{selectedPlace.location.address}</p>
                  <p className="text-sm text-gray-500">{calculateDistance(selectedPlace)} away</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                  <p className="text-gray-700">{selectedPlace.contactInfo}</p>
                  <p className="text-sm text-gray-500">{selectedPlace.hours}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">All Services</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlace.services.map((service, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Accessibility Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlace.accessibilityFeatures.map((feature, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPlace.disabilityServices && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Disability Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlace.disabilityServices.map((service, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <AccessibleButton
                  onClick={() => handleGetDirections(selectedPlace)}
                  variant="primary"
                  size="lg"
                  ariaLabel={`Get directions to ${selectedPlace.name}`}
                  icon={<Navigation className="w-5 h-5" />}
                >
                  Get Directions
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => handleCall(selectedPlace)}
                  variant="secondary"
                  size="lg"
                  ariaLabel={`Call ${selectedPlace.name}`}
                  icon={<Phone className="w-5 h-5" />}
                >
                  Call Now
                </AccessibleButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};