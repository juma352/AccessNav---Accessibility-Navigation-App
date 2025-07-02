import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Clock, DollarSign, AlertTriangle, Phone, Car, Users, Route } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { GoogleMap } from '../common/GoogleMap';
import { RealTimeNavigation } from './RealTimeNavigation';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { Route as RouteType, TransportMode, MataturRoute } from '../../types';

interface NavigationInterfaceProps {
  onClose: () => void;
}

export const NavigationInterface: React.FC<NavigationInterfaceProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedTransport, setSelectedTransport] = useState<string[]>(['walking', 'matatu']);
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);
  const [showRealTimeNav, setShowRealTimeNav] = useState(false);
  const [mapMarkers, setMapMarkers] = useState<Array<{
    position: { lat: number; lng: number };
    title: string;
    accessible?: boolean;
    info?: string;
  }>>([]);

  // Mock Kenyan locations for demonstration
  const popularLocations = [
    'Nairobi CBD',
    'Westlands',
    'Karen',
    'Kibera',
    'Eastleigh',
    'Kasarani',
    'Thika',
    'Kiambu',
    'Machakos',
    'Nakuru',
    'Mombasa',
    'Kisumu',
    'Eldoret',
    'Nyeri',
    'Meru'
  ];

  // Mock matatu routes
  const mataturRoutes: MataturRoute[] = [
    {
      id: '1',
      routeName: 'CBD - Kibera',
      startPoint: 'Nairobi CBD',
      endPoint: 'Kibera',
      fare: 30,
      accessibilityRating: 2,
      wheelchairAccessible: false,
      stages: ['Railways', 'Dagoretti Corner', 'Kibera'],
      operatingHours: '5:00 AM - 11:00 PM',
      frequency: 'Every 5 minutes'
    },
    {
      id: '2',
      routeName: 'CBD - Westlands',
      startPoint: 'Nairobi CBD',
      endPoint: 'Westlands',
      fare: 50,
      accessibilityRating: 4,
      wheelchairAccessible: true,
      stages: ['Museum Hill', 'Westlands'],
      operatingHours: '5:30 AM - 10:30 PM',
      frequency: 'Every 8 minutes'
    }
  ];

  const transportOptions = [
    { id: 'walking', name: 'Walking', icon: '🚶', accessible: true },
    { id: 'wheelchair', name: 'Wheelchair', icon: '♿', accessible: true },
    { id: 'matatu', name: 'Matatu', icon: '🚐', accessible: false },
    { id: 'boda_boda', name: 'Boda Boda', icon: '🏍️', accessible: false },
    { id: 'tuk_tuk', name: 'Tuk Tuk', icon: '🛺', accessible: true },
    { id: 'taxi', name: 'Taxi', icon: '🚕', accessible: true },
    { id: 'uber', name: 'Uber', icon: '🚗', accessible: true }
  ];

  // Sample accessible locations in Nairobi
  const accessibleLocations = [
    {
      position: { lat: -1.3013, lng: 36.8067 },
      title: 'Kenyatta National Hospital',
      accessible: true,
      info: 'Fully accessible hospital with wheelchair access, accessible parking, and sign language interpreters'
    },
    {
      position: { lat: -1.2634, lng: 36.8047 },
      title: 'Sarit Centre',
      accessible: true,
      info: 'Shopping mall with full wheelchair access, accessible restrooms, and elevators'
    },
    {
      position: { lat: -1.2921, lng: 36.8219 },
      title: 'Huduma Centre CBD',
      accessible: false,
      info: 'Government services center with limited accessibility features'
    },
    {
      position: { lat: -1.2841, lng: 36.8155 },
      title: 'Kenya National Library',
      accessible: true,
      info: 'Library with wheelchair access, Braille materials, and assistive technology'
    }
  ];

  useEffect(() => {
    // Set initial map markers
    setMapMarkers(accessibleLocations);
  }, []);

  const handleCalculateRoute = async () => {
    if (!fromLocation || !toLocation) {
      speak('Please enter both starting point and destination');
      return;
    }

    setIsCalculating(true);
    speak('Calculating accessible routes with real-time traffic data');

    // Simulate route calculation with real-time data
    setTimeout(() => {
      const mockRoutes: RouteType[] = [
        {
          id: '1',
          start: {
            latitude: -1.2921,
            longitude: 36.8219,
            address: fromLocation,
            type: 'building',
            county: 'Nairobi'
          },
          end: {
            latitude: -1.3032,
            longitude: 36.8073,
            address: toLocation,
            type: 'building',
            county: 'Nairobi'
          },
          waypoints: [],
          accessibilityRating: 4,
          estimatedTime: 45,
          cost: 80,
          transportModes: [
            {
              type: 'walking',
              accessible: true,
              duration: 15,
              cost: 0
            },
            {
              type: 'matatu',
              accessible: false,
              duration: 25,
              cost: 50,
              route: 'Route 46'
            },
            {
              type: 'walking',
              accessible: true,
              duration: 5,
              cost: 0
            }
          ],
          warnings: ['Matatu stage has steps', 'Busy road crossing at Kencom'],
          alternatives: []
        },
        {
          id: '2',
          start: {
            latitude: -1.2921,
            longitude: 36.8219,
            address: fromLocation,
            type: 'building',
            county: 'Nairobi'
          },
          end: {
            latitude: -1.3032,
            longitude: 36.8073,
            address: toLocation,
            type: 'building',
            county: 'Nairobi'
          },
          waypoints: [],
          accessibilityRating: 5,
          estimatedTime: 35,
          cost: 200,
          transportModes: [
            {
              type: 'uber',
              accessible: true,
              duration: 35,
              cost: 200
            }
          ],
          warnings: [],
          alternatives: []
        }
      ];

      setRoutes(mockRoutes);
      setIsCalculating(false);
      speak(`Found ${mockRoutes.length} accessible routes with real-time updates`);

      // Add route markers to map
      const routeMarkers = mockRoutes.map((route, index) => [
        {
          position: { lat: route.start.latitude, lng: route.start.longitude },
          title: `Route ${index + 1} Start`,
          accessible: route.accessibilityRating >= 4,
          info: `Starting point for ${route.transportModes.map(m => m.type).join(', ')} route`
        },
        {
          position: { lat: route.end.latitude, lng: route.end.longitude },
          title: `Route ${index + 1} End`,
          accessible: route.accessibilityRating >= 4,
          info: `Destination for ${route.transportModes.map(m => m.type).join(', ')} route`
        }
      ]).flat();

      setMapMarkers([...accessibleLocations, ...routeMarkers]);
    }, 2000);
  };

  const handleStartRealTimeNavigation = (route: RouteType) => {
    setSelectedRoute(route);
    setShowRealTimeNav(true);
    speak('Starting real-time navigation with live GPS tracking');
  };

  const handleNavigationEnd = () => {
    setShowRealTimeNav(false);
    setSelectedRoute(null);
    speak('Navigation ended. Returning to route planning');
  };

  const handleTransportToggle = (transportId: string) => {
    setSelectedTransport(prev => 
      prev.includes(transportId) 
        ? prev.filter(id => id !== transportId)
        : [...prev, transportId]
    );
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFromLocation('Current Location');
          speak('Current location set as starting point');
        },
        () => {
          speak('Unable to get current location');
        }
      );
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (!fromLocation) {
      setFromLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      speak('Starting location set from map');
    } else if (!toLocation) {
      setToLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      speak('Destination set from map');
    }
  };

  // Show real-time navigation if active
  if (showRealTimeNav && selectedRoute) {
    const realTimeRoute = {
      start: { 
        lat: selectedRoute.start.latitude, 
        lng: selectedRoute.start.longitude, 
        address: selectedRoute.start.address 
      },
      end: { 
        lat: selectedRoute.end.latitude, 
        lng: selectedRoute.end.longitude, 
        address: selectedRoute.end.address 
      },
      waypoints: [],
      transportMode: selectedRoute.transportModes[0]?.type || 'walking',
      estimatedTime: selectedRoute.estimatedTime * 60, // Convert to seconds
      distance: 2500 // Mock distance in meters
    };

    return (
      <RealTimeNavigation 
        route={realTimeRoute}
        onNavigationEnd={handleNavigationEnd}
      />
    );
  }

  const renderRouteCard = (route: RouteType, index: number) => (
    <AccessibleCard key={route.id} className="hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Route {index + 1}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {route.estimatedTime} min
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                KES {route.cost}
              </span>
              <div className="flex items-center gap-1">
                <span>Accessibility:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${star <= route.accessibilityRating ? 'text-green-500' : 'text-gray-300'}`}
                    >
                      ♿
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Real-time
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Transport Modes:</h4>
          <div className="space-y-2">
            {route.transportModes.map((mode, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="capitalize">{mode.type.replace('_', ' ')}</span>
                  {mode.accessible && <span className="text-green-600">♿</span>}
                  {mode.route && <span className="text-sm text-gray-500">({mode.route})</span>}
                </div>
                <div className="text-sm text-gray-600">
                  {mode.duration} min • KES {mode.cost || 0}
                </div>
              </div>
            ))}
          </div>
        </div>

        {route.warnings.length > 0 && (
          <div className="bg-yellow-50 p-3 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Accessibility Warnings:
            </h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              {route.warnings.map((warning, idx) => (
                <li key={idx}>• {warning}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3">
          <AccessibleButton
            onClick={() => handleStartRealTimeNavigation(route)}
            variant="primary"
            size="md"
            ariaLabel={`Start real-time navigation for route ${index + 1}`}
            icon={<Navigation className="w-4 h-4" />}
          >
            Start Live Navigation
          </AccessibleButton>
          <AccessibleButton
            onClick={() => speak(`Viewing detailed directions for route ${index + 1}`)}
            variant="secondary"
            size="md"
            ariaLabel={`View detailed directions for route ${index + 1}`}
          >
            View Details
          </AccessibleButton>
        </div>
      </div>
    </AccessibleCard>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Real-time Accessible Navigation</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close navigation interface"
        >
          Close
        </AccessibleButton>
      </div>

      {/* Real-time Features Banner */}
      <AccessibleCard className="mb-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-3xl">🛰️</div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Live GPS Navigation</h3>
            <p className="text-gray-600">
              Real-time traffic updates, live accessibility alerts, and turn-by-turn voice guidance
            </p>
          </div>
        </div>
      </AccessibleCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Route Planning */}
        <div className="space-y-6">
          {/* Location Input */}
          <AccessibleCard title="Plan Your Journey">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From (Starting Point)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="Enter starting location or click on map"
                    className="flex-1 p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    aria-label="Starting location"
                    list="locations"
                  />
                  <AccessibleButton
                    onClick={getCurrentLocation}
                    variant="secondary"
                    size="lg"
                    ariaLabel="Use current location"
                    icon={<MapPin className="w-5 h-5" />}
                  >
                    Current
                  </AccessibleButton>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To (Destination)
                </label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  placeholder="Enter destination or click on map"
                  className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  aria-label="Destination"
                  list="locations"
                />
              </div>

              <datalist id="locations">
                {popularLocations.map((location) => (
                  <option key={location} value={location} />
                ))}
              </datalist>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Transport (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {transportOptions.map((option) => (
                    <AccessibleCard
                      key={option.id}
                      clickable
                      onClick={() => handleTransportToggle(option.id)}
                      ariaLabel={`${selectedTransport.includes(option.id) ? 'Deselect' : 'Select'} ${option.name}`}
                      className={`text-center ${selectedTransport.includes(option.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="text-sm font-medium">{option.name}</div>
                      {option.accessible && (
                        <div className="text-xs text-green-600 mt-1">Accessible</div>
                      )}
                    </AccessibleCard>
                  ))}
                </div>
              </div>

              <AccessibleButton
                onClick={handleCalculateRoute}
                variant="primary"
                size="lg"
                fullWidth
                disabled={isCalculating || !fromLocation || !toLocation}
                ariaLabel={isCalculating ? 'Calculating routes with real-time data' : 'Calculate accessible routes with real-time data'}
                icon={<Route className="w-5 h-5" />}
              >
                {isCalculating ? 'Calculating Live Routes...' : 'Find Live Accessible Routes'}
              </AccessibleButton>
            </div>
          </AccessibleCard>

          {/* Matatu Routes Information */}
          <AccessibleCard title="Popular Matatu Routes">
            <div className="space-y-4">
              <p className="text-gray-600">
                Common matatu routes with real-time accessibility information
              </p>
              <div className="grid gap-4">
                {mataturRoutes.map((route) => (
                  <div key={route.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{route.routeName}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">KES {route.fare}</span>
                        {route.wheelchairAccessible && (
                          <span className="text-green-600">♿</span>
                        )}
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          Live
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Stages: {route.stages.join(' → ')}</p>
                      <p>Hours: {route.operatingHours}</p>
                      <p>Frequency: {route.frequency}</p>
                      <p>Accessibility Rating: {route.accessibilityRating}/5</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccessibleCard>
        </div>

        {/* Right Column - Map */}
        <div className="space-y-6">
          <AccessibleCard title="Live Interactive Map">
            <div className="space-y-4">
              <p className="text-gray-600">
                Click on the map to set your starting point and destination. Green markers show accessible locations with real-time updates.
              </p>
              <GoogleMap
                center={{ lat: -1.2921, lng: 36.8219 }}
                zoom={13}
                markers={mapMarkers}
                onMapClick={handleMapClick}
                height="500px"
                className="w-full"
              />
            </div>
          </AccessibleCard>
        </div>
      </div>

      {/* Route Results */}
      {routes.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold">Available Routes (Real-time)</h3>
          <div className="grid gap-6">
            {routes.map((route, index) => renderRouteCard(route, index))}
          </div>
        </div>
      )}

      {/* Emergency Transport */}
      <AccessibleCard title="Emergency Transport" priority="high" className="mt-8">
        <div className="space-y-4">
          <p className="text-gray-600">
            Quick access to accessible emergency transportation with live tracking
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <AccessibleButton
              onClick={() => speak('Calling accessible taxi service with live tracking')}
              variant="danger"
              size="lg"
              fullWidth
              ariaLabel="Call accessible taxi for emergency with live tracking"
              icon={<Phone className="w-5 h-5" />}
            >
              Emergency Accessible Taxi
            </AccessibleButton>
            <AccessibleButton
              onClick={() => speak('Calling medical transport with live tracking')}
              variant="danger"
              size="lg"
              fullWidth
              ariaLabel="Call medical transport with live tracking"
              icon={<Car className="w-5 h-5" />}
            >
              Medical Transport
            </AccessibleButton>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Emergency Numbers:</strong><br />
              Red Cross Ambulance: 1199<br />
              St. John Ambulance: 020 2210000<br />
              Accessible Taxi: 0700 123 456<br />
              <em>All services now include live GPS tracking</em>
            </p>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );
};