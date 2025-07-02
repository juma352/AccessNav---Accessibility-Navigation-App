import React, { useState } from 'react';
import { Download, MapPin, Trash2, RefreshCw, HardDrive, Wifi, WifiOff } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface OfflineMapsProps {
  onClose: () => void;
}

export const OfflineMaps: React.FC<OfflineMapsProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [downloadingAreas, setDownloadingAreas] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const downloadedAreas = [
    {
      id: '1',
      name: 'Nairobi County',
      size: '45 MB',
      lastUpdated: '2 days ago',
      accessibilityData: 1247,
      mapData: true
    },
    {
      id: '2',
      name: 'Mombasa County',
      size: '32 MB',
      lastUpdated: '1 week ago',
      accessibilityData: 892,
      mapData: true
    },
    {
      id: '3',
      name: 'Kisumu County',
      size: '28 MB',
      lastUpdated: '3 days ago',
      accessibilityData: 634,
      mapData: true
    }
  ];

  const availableAreas = [
    { id: '4', name: 'Nakuru County', estimatedSize: '35 MB', accessibilityData: 567 },
    { id: '5', name: 'Eldoret (Uasin Gishu)', estimatedSize: '29 MB', accessibilityData: 445 },
    { id: '6', name: 'Thika (Kiambu)', estimatedSize: '22 MB', accessibilityData: 334 },
    { id: '7', name: 'Machakos County', estimatedSize: '31 MB', accessibilityData: 423 },
    { id: '8', name: 'Nyeri County', estimatedSize: '26 MB', accessibilityData: 298 }
  ];

  const handleDownload = async (areaId: string, areaName: string) => {
    setDownloadingAreas([...downloadingAreas, areaId]);
    speak(`Downloading ${areaName} offline data`);
    
    // Simulate download
    setTimeout(() => {
      setDownloadingAreas(downloadingAreas.filter(id => id !== areaId));
      speak(`${areaName} downloaded successfully`);
    }, 3000);
  };

  const handleUpdate = async (areaName: string) => {
    speak(`Updating ${areaName} offline data`);
    // Simulate update
    setTimeout(() => {
      speak(`${areaName} updated successfully`);
    }, 2000);
  };

  const handleDelete = (areaName: string) => {
    speak(`Deleted ${areaName} offline data`);
  };

  const totalSize = downloadedAreas.reduce((total, area) => {
    return total + parseInt(area.size.replace(' MB', ''));
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Offline Maps</h2>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <AccessibleButton
            onClick={onClose}
            variant="secondary"
            size="md"
            ariaLabel="Close offline maps"
          >
            Close
          </AccessibleButton>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Downloaded Areas */}
        <div className="lg:col-span-2 space-y-6">
          <AccessibleCard title="Downloaded Areas">
            <div className="space-y-4">
              {downloadedAreas.length === 0 ? (
                <div className="text-center py-8">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No offline areas</h3>
                  <p className="text-gray-600">Download areas below to use AccessNav offline</p>
                </div>
              ) : (
                downloadedAreas.map((area) => (
                  <div key={area.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{area.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{area.size}</span>
                          <span>Updated {area.lastUpdated}</span>
                          <span>{area.accessibilityData} locations</span>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Downloaded
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <AccessibleButton
                        onClick={() => handleUpdate(area.name)}
                        variant="secondary"
                        size="sm"
                        ariaLabel={`Update ${area.name} offline data`}
                        icon={<RefreshCw className="w-4 h-4" />}
                        disabled={!isOnline}
                      >
                        Update
                      </AccessibleButton>
                      <AccessibleButton
                        onClick={() => handleDelete(area.name)}
                        variant="danger"
                        size="sm"
                        ariaLabel={`Delete ${area.name} offline data`}
                        icon={<Trash2 className="w-4 h-4" />}
                      >
                        Delete
                      </AccessibleButton>
                    </div>
                  </div>
                ))
              )}
            </div>
          </AccessibleCard>

          <AccessibleCard title="Available for Download">
            <div className="space-y-4">
              {availableAreas.map((area) => (
                <div key={area.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{area.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>~{area.estimatedSize}</span>
                        <span>{area.accessibilityData} locations</span>
                      </div>
                    </div>
                  </div>

                  <AccessibleButton
                    onClick={() => handleDownload(area.id, area.name)}
                    variant="primary"
                    size="sm"
                    disabled={downloadingAreas.includes(area.id) || !isOnline}
                    ariaLabel={`Download ${area.name} offline data`}
                    icon={<Download className="w-4 h-4" />}
                  >
                    {downloadingAreas.includes(area.id) ? 'Downloading...' : 'Download'}
                  </AccessibleButton>
                </div>
              ))}

              {!isOnline && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">Offline Mode</h4>
                  <p className="text-sm text-yellow-800">
                    You're currently offline. Connect to the internet to download new areas or update existing ones.
                  </p>
                </div>
              )}
            </div>
          </AccessibleCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AccessibleCard title="Storage Usage">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{totalSize} MB</div>
                <div className="text-sm text-gray-600">Used Storage</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Maps</span>
                  <span>{Math.round(totalSize * 0.7)} MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Accessibility Data</span>
                  <span>{Math.round(totalSize * 0.3)} MB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((totalSize / 500) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {totalSize} MB of 500 MB available
                </div>
              </div>

              <AccessibleButton
                onClick={() => speak('Clearing offline cache')}
                variant="secondary"
                size="sm"
                fullWidth
                ariaLabel="Clear offline cache"
                icon={<HardDrive className="w-4 h-4" />}
              >
                Clear Cache
              </AccessibleButton>
            </div>
          </AccessibleCard>

          <AccessibleCard title="Download Settings">
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-download visited areas</span>
                  <div className="w-12 h-6 bg-blue-600 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 mt-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Download only on Wi-Fi</span>
                  <div className="w-12 h-6 bg-blue-600 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-6 mt-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-update weekly</span>
                  <div className="w-12 h-6 bg-gray-300 rounded-full">
                    <div className="w-5 h-5 bg-white rounded-full shadow transform translate-x-0.5 mt-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </AccessibleCard>

          <AccessibleCard title="Offline Features">
            <div className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Navigation & routing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Accessibility information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Emergency contacts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Limited search</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span>No real-time updates</span>
                </div>
              </div>
            </div>
          </AccessibleCard>

          <AccessibleCard title="Tips for Offline Use">
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Download areas before traveling to remote locations</p>
              <p>• Update maps regularly when connected to Wi-Fi</p>
              <p>• Emergency services work offline</p>
              <p>• Sync reports when back online</p>
            </div>
          </AccessibleCard>
        </div>
      </div>
    </div>
  );
};