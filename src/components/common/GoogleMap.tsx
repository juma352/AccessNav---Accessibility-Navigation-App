import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { AccessibleButton } from './AccessibleButton';
import { MapPin, Navigation, Accessibility } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    accessible?: boolean;
    info?: string;
  }>;
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
  height?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: -1.2921, lng: 36.8219 }, // Nairobi CBD default
  zoom = 13,
  markers = [],
  onMapClick,
  className = '',
  height = '400px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { speak } = useAccessibility();

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyCqZT-LAeqkGFHK7Vx9AX1c7r22BpsqFPc',
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            // Accessibility improvements
            gestureHandling: 'cooperative',
            keyboardShortcuts: true,
          });

          // Add click listener
          if (onMapClick) {
            mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
              if (event.latLng) {
                onMapClick(event.latLng.lat(), event.latLng.lng());
              }
            });
          }

          setMap(mapInstance);
          setIsLoading(false);
          speak('Map loaded successfully');
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map. Please check your internet connection.');
        setIsLoading(false);
        speak('Failed to load map');
      }
    };

    initMap();
  }, [center.lat, center.lng, zoom, onMapClick, speak]);

  useEffect(() => {
    if (map && markers.length > 0) {
      // Clear existing markers
      // In a real implementation, you'd track markers to clear them

      markers.forEach((marker) => {
        const mapMarker = new google.maps.Marker({
          position: marker.position,
          map,
          title: marker.title,
          icon: marker.accessible ? {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#10B981"/>
                <path d="M12 6a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V14h1a1 1 0 0 1 0 2h-1v1a1 1 0 0 1-2 0v-1H9a1 1 0 0 1 0-2h1V9.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(32, 32)
          } : undefined
        });

        if (marker.info) {
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold;">${marker.title}</h3>
                <p style="margin: 0; font-size: 14px;">${marker.info}</p>
                ${marker.accessible ? '<p style="margin: 4px 0 0 0; color: #10B981; font-size: 12px;">♿ Wheelchair Accessible</p>' : ''}
              </div>
            `
          });

          mapMarker.addListener('click', () => {
            infoWindow.open(map, mapMarker);
            speak(`Selected ${marker.title}`);
          });
        }
      });
    }
  }, [map, markers, speak]);

  const getCurrentLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          map.setZoom(15);
          
          new google.maps.Marker({
            position: pos,
            map,
            title: 'Your Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
                  <circle cx="12" cy="12" r="3" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24)
            }
          });
          
          speak('Centered map on your current location');
        },
        () => {
          speak('Unable to get your current location');
        }
      );
    }
  };

  if (error) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`} style={{ height }}>
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Unavailable</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <p className="text-sm text-gray-500">
          For the best experience, please ensure you have a stable internet connection and that location services are enabled.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="loading-spinner w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full rounded-lg"
        style={{ height }}
        role="application"
        aria-label="Interactive map showing accessible locations"
      />
      
      {map && (
        <div className="absolute top-4 right-4 space-y-2">
          <AccessibleButton
            onClick={getCurrentLocation}
            variant="secondary"
            size="md"
            ariaLabel="Center map on current location"
            icon={<Navigation className="w-4 h-4" />}
            className="bg-white shadow-lg"
          >
            My Location
          </AccessibleButton>
        </div>
      )}
      
      {markers.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Accessible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <span>Standard</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};