import React, { useState, useEffect, useRef } from 'react';
import { Navigation, MapPin, Volume2, VolumeX, Pause, Play, RotateCcw, AlertTriangle, Clock, Route } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { GoogleMap } from '../common/GoogleMap';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface RealTimeNavigationProps {
  route: {
    start: { lat: number; lng: number; address: string };
    end: { lat: number; lng: number; address: string };
    waypoints: Array<{ lat: number; lng: number; instruction: string }>;
    transportMode: string;
    estimatedTime: number;
    distance: number;
  };
  onNavigationEnd: () => void;
}

interface NavigationStep {
  instruction: string;
  distance: number;
  duration: number;
  maneuver: string;
  accessibilityNote?: string;
  warning?: string;
}

interface LiveLocation {
  lat: number;
  lng: number;
  accuracy: number;
  heading?: number;
  speed?: number;
}

export const RealTimeNavigation: React.FC<RealTimeNavigationProps> = ({
  route,
  onNavigationEnd
}) => {
  const { speak } = useAccessibility();
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LiveLocation | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [distanceToNextTurn, setDistanceToNextTurn] = useState<number>(0);
  const [estimatedArrival, setEstimatedArrival] = useState<Date | null>(null);
  const [trafficDelay, setTrafficDelay] = useState<number>(0);
  const watchIdRef = useRef<number | null>(null);
  const lastAnnouncementRef = useRef<number>(0);

  // Mock navigation steps - in real app, this would come from routing service
  const navigationSteps: NavigationStep[] = [
    {
      instruction: "Head north on Kenyatta Avenue toward Moi Avenue",
      distance: 200,
      duration: 120,
      maneuver: "straight",
      accessibilityNote: "Wide sidewalk available"
    },
    {
      instruction: "Turn right onto Moi Avenue",
      distance: 300,
      duration: 180,
      maneuver: "turn-right",
      accessibilityNote: "Traffic light with audio signals"
    },
    {
      instruction: "Continue straight for 500 meters",
      distance: 500,
      duration: 300,
      maneuver: "straight",
      warning: "Construction ahead - use alternative route"
    },
    {
      instruction: "Turn left onto Tom Mboya Street",
      distance: 150,
      duration: 90,
      maneuver: "turn-left",
      accessibilityNote: "Accessible crossing available"
    },
    {
      instruction: "Arrive at destination on your right",
      distance: 0,
      duration: 0,
      maneuver: "arrive",
      accessibilityNote: "Accessible entrance on the right side"
    }
  ];

  useEffect(() => {
    if (isNavigating) {
      startLocationTracking();
      calculateEstimatedArrival();
    } else {
      stopLocationTracking();
    }

    return () => {
      stopLocationTracking();
    };
  }, [isNavigating]);

  useEffect(() => {
    if (currentLocation && isNavigating && !isPaused) {
      updateNavigationProgress();
    }
  }, [currentLocation, isNavigating, isPaused]);

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      speak('GPS not available on this device');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation: LiveLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading || undefined,
          speed: position.coords.speed || undefined
        };
        setCurrentLocation(newLocation);
      },
      (error) => {
        console.error('GPS error:', error);
        speak('GPS signal lost. Trying to reconnect...');
      },
      options
    );
  };

  const stopLocationTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  const calculateEstimatedArrival = () => {
    const now = new Date();
    const totalDuration = navigationSteps.reduce((sum, step) => sum + step.duration, 0);
    const arrivalTime = new Date(now.getTime() + (totalDuration + trafficDelay) * 1000);
    setEstimatedArrival(arrivalTime);
  };

  const updateNavigationProgress = () => {
    if (!currentLocation || currentStepIndex >= navigationSteps.length) return;

    // Simulate distance calculation to next turn
    const mockDistance = Math.max(0, navigationSteps[currentStepIndex].distance - Math.random() * 50);
    setDistanceToNextTurn(mockDistance);

    // Check if we should advance to next step
    if (mockDistance < 10 && currentStepIndex < navigationSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      announceNextInstruction();
    }

    // Announce distance updates
    const now = Date.now();
    if (voiceEnabled && now - lastAnnouncementRef.current > 10000) { // Every 10 seconds
      if (mockDistance > 100) {
        speak(`In ${Math.round(mockDistance)} meters, ${navigationSteps[currentStepIndex].instruction}`);
      } else if (mockDistance > 20) {
        speak(`In ${Math.round(mockDistance)} meters, ${navigationSteps[currentStepIndex].instruction}`);
      }
      lastAnnouncementRef.current = now;
    }
  };

  const announceNextInstruction = () => {
    if (!voiceEnabled || currentStepIndex >= navigationSteps.length) return;

    const step = navigationSteps[currentStepIndex];
    let announcement = step.instruction;

    if (step.accessibilityNote) {
      announcement += `. ${step.accessibilityNote}`;
    }

    if (step.warning) {
      announcement += `. Warning: ${step.warning}`;
    }

    speak(announcement);
  };

  const startNavigation = () => {
    setIsNavigating(true);
    setIsPaused(false);
    speak('Navigation started. GPS tracking enabled.');
    announceNextInstruction();
  };

  const pauseNavigation = () => {
    setIsPaused(!isPaused);
    speak(isPaused ? 'Navigation resumed' : 'Navigation paused');
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setIsPaused(false);
    setCurrentStepIndex(0);
    speak('Navigation stopped');
    onNavigationEnd();
  };

  const recalculateRoute = () => {
    speak('Recalculating route with current traffic conditions');
    // Simulate traffic delay
    setTrafficDelay(Math.random() * 300); // 0-5 minutes delay
    calculateEstimatedArrival();
  };

  const toggleVoiceGuidance = () => {
    setVoiceEnabled(!voiceEnabled);
    speak(voiceEnabled ? 'Voice guidance disabled' : 'Voice guidance enabled');
  };

  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getManeuverIcon = (maneuver: string) => {
    switch (maneuver) {
      case 'turn-left':
        return '↰';
      case 'turn-right':
        return '↱';
      case 'straight':
        return '↑';
      case 'arrive':
        return '🏁';
      default:
        return '→';
    }
  };

  const currentStep = navigationSteps[currentStepIndex];
  const mapMarkers = [
    {
      position: route.start,
      title: 'Start',
      accessible: true,
      info: 'Starting point'
    },
    {
      position: route.end,
      title: 'Destination',
      accessible: true,
      info: 'Your destination'
    }
  ];

  if (currentLocation) {
    mapMarkers.push({
      position: { lat: currentLocation.lat, lng: currentLocation.lng },
      title: 'Your Location',
      accessible: true,
      info: 'Current position'
    });
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Real-time Navigation</h2>
        <div className="flex gap-2">
          <AccessibleButton
            onClick={toggleVoiceGuidance}
            variant={voiceEnabled ? 'primary' : 'secondary'}
            size="md"
            ariaLabel={voiceEnabled ? 'Disable voice guidance' : 'Enable voice guidance'}
            icon={voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          >
            Voice
          </AccessibleButton>
          <AccessibleButton
            onClick={stopNavigation}
            variant="danger"
            size="md"
            ariaLabel="Stop navigation"
          >
            Stop
          </AccessibleButton>
        </div>
      </div>

      {/* Route Overview */}
      <AccessibleCard title="Route Overview">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatDistance(route.distance)}</div>
            <div className="text-sm text-gray-600">Total Distance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {estimatedArrival ? estimatedArrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
            </div>
            <div className="text-sm text-gray-600">Estimated Arrival</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{formatTime(route.estimatedTime + trafficDelay)}</div>
            <div className="text-sm text-gray-600">
              Travel Time {trafficDelay > 0 && <span className="text-red-600">(+{formatTime(trafficDelay)} traffic)</span>}
            </div>
          </div>
        </div>
      </AccessibleCard>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Navigation Instructions */}
        <div className="space-y-4">
          {/* Current Instruction */}
          <AccessibleCard 
            title="Current Instruction" 
            priority={currentStep?.warning ? 'high' : 'medium'}
            className="bg-blue-50 border-blue-200"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{getManeuverIcon(currentStep?.maneuver || 'straight')}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {currentStep?.instruction || 'Calculating route...'}
                  </h3>
                  {distanceToNextTurn > 0 && (
                    <p className="text-xl font-bold text-blue-600">
                      In {formatDistance(distanceToNextTurn)}
                    </p>
                  )}
                  {currentStep?.accessibilityNote && (
                    <p className="text-sm text-green-700 mt-2">
                      ♿ {currentStep.accessibilityNote}
                    </p>
                  )}
                  {currentStep?.warning && (
                    <p className="text-sm text-red-700 mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {currentStep.warning}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex gap-3">
                {!isNavigating ? (
                  <AccessibleButton
                    onClick={startNavigation}
                    variant="primary"
                    size="lg"
                    fullWidth
                    ariaLabel="Start navigation"
                    icon={<Navigation className="w-5 h-5" />}
                  >
                    Start Navigation
                  </AccessibleButton>
                ) : (
                  <>
                    <AccessibleButton
                      onClick={pauseNavigation}
                      variant="secondary"
                      size="md"
                      ariaLabel={isPaused ? 'Resume navigation' : 'Pause navigation'}
                      icon={isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    >
                      {isPaused ? 'Resume' : 'Pause'}
                    </AccessibleButton>
                    <AccessibleButton
                      onClick={recalculateRoute}
                      variant="secondary"
                      size="md"
                      ariaLabel="Recalculate route"
                      icon={<RotateCcw className="w-4 h-4" />}
                    >
                      Recalculate
                    </AccessibleButton>
                  </>
                )}
              </div>
            </div>
          </AccessibleCard>

          {/* GPS Status */}
          <AccessibleCard title="GPS Status">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>GPS Signal:</span>
                <span className={`font-semibold ${currentLocation ? 'text-green-600' : 'text-red-600'}`}>
                  {currentLocation ? 'Connected' : 'Searching...'}
                </span>
              </div>
              {currentLocation && (
                <>
                  <div className="flex justify-between items-center">
                    <span>Accuracy:</span>
                    <span className="font-semibold">±{Math.round(currentLocation.accuracy)}m</span>
                  </div>
                  {currentLocation.speed && (
                    <div className="flex justify-between items-center">
                      <span>Speed:</span>
                      <span className="font-semibold">{Math.round(currentLocation.speed * 3.6)} km/h</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </AccessibleCard>

          {/* Upcoming Steps */}
          <AccessibleCard title="Upcoming Steps">
            <div className="space-y-3">
              {navigationSteps.slice(currentStepIndex + 1, currentStepIndex + 4).map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl">{getManeuverIcon(step.maneuver)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.instruction}</p>
                    <p className="text-xs text-gray-600">{formatDistance(step.distance)}</p>
                    {step.accessibilityNote && (
                      <p className="text-xs text-green-600 mt-1">♿ {step.accessibilityNote}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccessibleCard>
        </div>

        {/* Live Map */}
        <div className="space-y-4">
          <AccessibleCard title="Live Map">
            <GoogleMap
              center={currentLocation || route.start}
              zoom={16}
              markers={mapMarkers}
              height="500px"
              className="w-full"
            />
          </AccessibleCard>

          {/* Traffic & Alerts */}
          <AccessibleCard title="Traffic & Alerts">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm">
                  {trafficDelay > 0 
                    ? `${formatTime(trafficDelay)} delay due to traffic`
                    : 'No significant traffic delays'
                  }
                </span>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Accessibility Alerts:</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Construction on Tom Mboya Street - alternative route suggested</li>
                  <li>• Accessible crossing available at Kenyatta/Moi intersection</li>
                  <li>• Audio traffic signals active at major intersections</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Real-time Updates:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Matatu route 46 running normally</li>
                  <li>• Accessible parking available at destination</li>
                  <li>• Weather: Clear, good visibility</li>
                </ul>
              </div>
            </div>
          </AccessibleCard>
        </div>
      </div>

      {/* Emergency Actions */}
      <AccessibleCard title="Emergency Actions" priority="high">
        <div className="grid md:grid-cols-3 gap-4">
          <AccessibleButton
            onClick={() => speak('Calling emergency services')}
            variant="danger"
            size="md"
            fullWidth
            ariaLabel="Call emergency services"
            icon={<AlertTriangle className="w-4 h-4" />}
          >
            Emergency: 999
          </AccessibleButton>
          <AccessibleButton
            onClick={() => {
              if (currentLocation) {
                const locationText = `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`;
                navigator.clipboard?.writeText(locationText);
                speak('Location copied to clipboard');
              }
            }}
            variant="secondary"
            size="md"
            fullWidth
            ariaLabel="Share current location"
            icon={<MapPin className="w-4 h-4" />}
          >
            Share Location
          </AccessibleButton>
          <AccessibleButton
            onClick={() => speak('Finding nearest accessible shelter')}
            variant="secondary"
            size="md"
            fullWidth
            ariaLabel="Find nearest accessible shelter"
          >
            Find Shelter
          </AccessibleButton>
        </div>
      </AccessibleCard>
    </div>
  );
};