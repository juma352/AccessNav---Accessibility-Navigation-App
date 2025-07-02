import React, { useState } from 'react';
import { Heart, Pill, Calendar, Phone, Activity, Brain, Plus, Clock, Star, MapPin, AlertTriangle } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { HealthProvider, Medication, WellnessCheckIn } from '../../types';

interface HealthWellnessProps {
  onClose: () => void;
}

export const HealthWellness: React.FC<HealthWellnessProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'providers' | 'medications' | 'wellness' | 'telehealth'>('providers');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [checkIns, setCheckIns] = useState<WellnessCheckIn[]>([]);
  const [appointments, setAppointments] = useState<string[]>([]);

  // Kenya-specific health providers
  const healthProviders: HealthProvider[] = [
    {
      id: '1',
      name: 'Kenyatta National Hospital',
      specialty: 'General Hospital',
      accessibilityFeatures: ['Wheelchair accessible', 'Sign language interpreters', 'Accessible parking', 'Audio announcements'],
      telehealth: true,
      location: { 
        latitude: -1.3013, 
        longitude: 36.8067, 
        address: 'Hospital Rd, Nairobi',
        type: 'hospital',
        county: 'Nairobi'
      },
      rating: 4.2,
      acceptedInsurance: ['NHIF', 'AAR', 'Jubilee', 'Madison'],
      languages: ['English', 'Swahili', 'Kikuyu'],
      disabilityExperience: ['All disability types', 'Rehabilitation services', 'Assistive devices'],
      nhifAccredited: true,
      governmentFacility: true,
      cost: 'subsidized'
    },
    {
      id: '2',
      name: 'Aga Khan University Hospital',
      specialty: 'Private Hospital',
      accessibilityFeatures: ['Full accessibility', 'Braille signage', 'Accessible rooms', 'Specialized equipment'],
      telehealth: true,
      location: { 
        latitude: -1.2667, 
        longitude: 36.8167, 
        address: 'Third Parklands Ave, Nairobi',
        type: 'hospital',
        county: 'Nairobi'
      },
      rating: 4.8,
      acceptedInsurance: ['NHIF', 'Private insurance', 'International insurance'],
      languages: ['English', 'Swahili', 'Arabic', 'French'],
      disabilityExperience: ['Complex medical needs', 'Rehabilitation', 'Mental health'],
      nhifAccredited: true,
      governmentFacility: false,
      cost: 'private'
    },
    {
      id: '3',
      name: 'Coast Provincial General Hospital',
      specialty: 'Regional Hospital',
      accessibilityFeatures: ['Wheelchair accessible', 'Accessible restrooms', 'Audio assistance'],
      telehealth: false,
      location: { 
        latitude: -4.0435, 
        longitude: 39.6682, 
        address: 'Mombasa',
        type: 'hospital',
        county: 'Mombasa'
      },
      rating: 3.9,
      acceptedInsurance: ['NHIF', 'Local insurance'],
      languages: ['English', 'Swahili', 'Arabic'],
      disabilityExperience: ['Basic disability services', 'Emergency care'],
      nhifAccredited: true,
      governmentFacility: true,
      cost: 'subsidized'
    }
  ];

  const sampleMedications: Medication[] = [
    {
      id: '1',
      name: 'Paracetamol',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Wanjiku',
      startDate: new Date('2025-01-01'),
      sideEffects: [],
      instructions: 'Take with food',
      refillReminder: true,
      nhifCovered: true,
      localAvailability: 'readily_available',
      cost: 50
    }
  ];

  const handleTabChange = (tab: 'providers' | 'medications' | 'wellness' | 'telehealth') => {
    setActiveTab(tab);
    speak(`Switched to ${tab} section`);
  };

  const handleBookAppointment = (providerId: string, providerName: string) => {
    if (!appointments.includes(providerId)) {
      setAppointments([...appointments, providerId]);
      speak(`Appointment request sent to ${providerName}. You will receive a confirmation call within 24 hours.`);
    } else {
      speak(`You already have a pending appointment with ${providerName}`);
    }
  };

  const handleAddMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: 'New Medication',
      dosage: '100mg',
      frequency: 'Daily',
      prescribedBy: 'Your Doctor',
      startDate: new Date(),
      sideEffects: [],
      instructions: 'As prescribed',
      refillReminder: true,
      nhifCovered: false,
      localAvailability: 'readily_available',
      cost: 100
    };
    setMedications([...medications, newMedication]);
    speak('New medication added to your list. Please update the details.');
  };

  const handleWellnessCheckIn = () => {
    const newCheckIn: WellnessCheckIn = {
      id: Date.now().toString(),
      date: new Date(),
      mood: 'good',
      painLevel: 3,
      energyLevel: 7,
      sleepQuality: 6,
      notes: 'Feeling better today',
      accessToCare: true,
      financialStress: 4
    };
    setCheckIns([newCheckIn, ...checkIns]);
    speak('Wellness check-in completed. Your data has been saved.');
  };

  const renderProviders = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {healthProviders.map((provider) => (
          <AccessibleCard key={provider.id} className="hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                  <p className="text-gray-600">{provider.specialty}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {provider.location.address}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{provider.rating}</span>
                  </div>
                  {provider.nhifAccredited && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      NHIF Accredited
                    </div>
                  )}
                  {provider.governmentFacility && (
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Government
                    </div>
                  )}
                  {provider.telehealth && (
                    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      Telehealth
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Accessibility Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.accessibilityFeatures.map((feature, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Disability Experience:</h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.disabilityExperience.map((exp, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Languages: {provider.languages.join(', ')}</span>
                  <span>Cost: {provider.cost}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Insurance: {provider.acceptedInsurance.join(', ')}
                </div>
              </div>

              <div className="flex gap-3">
                <AccessibleButton
                  onClick={() => handleBookAppointment(provider.id, provider.name)}
                  variant={appointments.includes(provider.id) ? "success" : "primary"}
                  size="md"
                  disabled={appointments.includes(provider.id)}
                  ariaLabel={appointments.includes(provider.id) ? `Appointment pending with ${provider.name}` : `Book appointment with ${provider.name}`}
                  icon={<Calendar className="w-4 h-4" />}
                >
                  {appointments.includes(provider.id) ? 'Appointment Pending' : 'Book Appointment'}
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => speak(`Calling ${provider.name}`)}
                  variant="secondary"
                  size="md"
                  ariaLabel={`Call ${provider.name}`}
                  icon={<Phone className="w-4 h-4" />}
                >
                  Call
                </AccessibleButton>
                {provider.telehealth && (
                  <AccessibleButton
                    onClick={() => speak(`Starting telehealth session with ${provider.name}`)}
                    variant="secondary"
                    size="md"
                    ariaLabel={`Start telehealth with ${provider.name}`}
                  >
                    Telehealth
                  </AccessibleButton>
                )}
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>

      {appointments.length > 0 && (
        <AccessibleCard title="Your Appointments" className="bg-blue-50 border-blue-200">
          <p className="text-blue-800 mb-3">
            You have {appointments.length} pending appointment{appointments.length > 1 ? 's' : ''}. 
            Healthcare providers will contact you within 24 hours to confirm.
          </p>
          <AccessibleButton
            onClick={() => speak('Opening appointment management dashboard')}
            variant="primary"
            size="md"
            ariaLabel="Manage your appointments"
          >
            Manage Appointments
          </AccessibleButton>
        </AccessibleCard>
      )}
    </div>
  );

  const renderMedications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Your Medications</h3>
        <AccessibleButton
          onClick={handleAddMedication}
          variant="primary"
          size="md"
          ariaLabel="Add new medication"
          icon={<Plus className="w-4 h-4" />}
        >
          Add Medication
        </AccessibleButton>
      </div>

      <div className="grid gap-4">
        {[...sampleMedications, ...medications].map((med) => (
          <AccessibleCard key={med.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900">{med.name}</h4>
                <p className="text-gray-600">{med.dosage} - {med.frequency}</p>
                <p className="text-sm text-gray-500">Prescribed by {med.prescribedBy}</p>
                
                {med.instructions && (
                  <div className="mt-2">
                    <span className="font-semibold text-sm">Instructions: </span>
                    <span className="text-sm">{med.instructions}</span>
                  </div>
                )}

                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className={`font-semibold ${med.nhifCovered ? 'text-green-600' : 'text-red-600'}`}>
                    {med.nhifCovered ? 'NHIF Covered' : 'Not NHIF Covered'}
                  </span>
                  <span>KES {med.cost}</span>
                  <span className="capitalize">{med.localAvailability.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {med.refillReminder && (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                    Refill Soon
                  </span>
                )}
                <AccessibleButton
                  onClick={() => speak(`Managing ${med.name} medication details`)}
                  variant="secondary"
                  size="sm"
                  ariaLabel={`Manage ${med.name} medication`}
                >
                  Manage
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>

      {medications.length > 0 && (
        <AccessibleCard title="Medication Reminders" className="bg-green-50 border-green-200">
          <p className="text-green-800 mb-3">
            You have {medications.length} medication{medications.length > 1 ? 's' : ''} in your list. 
            Set up reminders to never miss a dose.
          </p>
          <AccessibleButton
            onClick={() => speak('Setting up medication reminders')}
            variant="primary"
            size="md"
            ariaLabel="Set up medication reminders"
            icon={<Clock className="w-4 h-4" />}
          >
            Set Reminders
          </AccessibleButton>
        </AccessibleCard>
      )}
    </div>
  );

  const renderWellness = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Wellness Check-ins</h3>
        <AccessibleButton
          onClick={handleWellnessCheckIn}
          variant="primary"
          size="md"
          ariaLabel="Start new wellness check-in"
          icon={<Plus className="w-4 h-4" />}
        >
          New Check-in
        </AccessibleButton>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AccessibleCard title="Quick Check-in">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How are you feeling today?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[
                  { emoji: '😢', label: 'Struggling' },
                  { emoji: '😕', label: 'Difficult' },
                  { emoji: '😐', label: 'Okay' },
                  { emoji: '🙂', label: 'Good' },
                  { emoji: '😊', label: 'Excellent' }
                ].map((mood, index) => (
                  <AccessibleButton
                    key={index}
                    onClick={() => speak(`Selected mood: ${mood.label}`)}
                    variant="secondary"
                    size="md"
                    ariaLabel={`Mood level: ${mood.label}`}
                    className="text-2xl"
                  >
                    {mood.emoji}
                  </AccessibleButton>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pain Level (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full"
                aria-label="Pain level from 1 to 10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                className="w-full"
                aria-label="Energy level from 1 to 10"
              />
            </div>

            <AccessibleButton
              onClick={handleWellnessCheckIn}
              variant="primary"
              size="md"
              fullWidth
              ariaLabel="Save wellness check-in"
            >
              Save Check-in
            </AccessibleButton>
          </div>
        </AccessibleCard>

        <AccessibleCard title="Recent Check-ins">
          <div className="space-y-4">
            {checkIns.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No check-ins yet. Start tracking your wellness today!
              </p>
            ) : (
              checkIns.slice(0, 5).map((checkIn) => (
                <div key={checkIn.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{checkIn.date.toLocaleDateString()}</span>
                    <span className="capitalize text-sm bg-gray-100 px-2 py-1 rounded">
                      {checkIn.mood}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Pain: {checkIn.painLevel}/10 | Energy: {checkIn.energyLevel}/10</p>
                    <p>Sleep: {checkIn.sleepQuality}/10</p>
                    {checkIn.notes && <p className="italic">"{checkIn.notes}"</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </AccessibleCard>
      </div>

      {checkIns.length > 0 && (
        <AccessibleCard title="Wellness Insights" className="bg-purple-50 border-purple-200">
          <div className="space-y-3">
            <p className="text-purple-800">
              You've completed {checkIns.length} wellness check-in{checkIns.length > 1 ? 's' : ''}. 
              Keep tracking to identify patterns and improve your wellbeing.
            </p>
            <div className="flex gap-3">
              <AccessibleButton
                onClick={() => speak('Viewing wellness trends and insights')}
                variant="primary"
                size="md"
                ariaLabel="View wellness trends"
                icon={<Activity className="w-4 h-4" />}
              >
                View Trends
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Sharing wellness data with healthcare provider')}
                variant="secondary"
                size="md"
                ariaLabel="Share with doctor"
              >
                Share with Doctor
              </AccessibleButton>
            </div>
          </div>
        </AccessibleCard>
      )}
    </div>
  );

  const renderTelehealth = () => (
    <div className="space-y-6">
      <AccessibleCard title="Telehealth Services">
        <div className="space-y-4">
          <p className="text-gray-600">
            Access healthcare from anywhere in Kenya with our telehealth partners.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <AccessibleButton
              onClick={() => speak('Starting video consultation - connecting to available doctor')}
              variant="primary"
              size="lg"
              fullWidth
              ariaLabel="Start video consultation"
              icon={<Phone className="w-5 h-5" />}
            >
              Video Consultation
            </AccessibleButton>

            <AccessibleButton
              onClick={() => speak('Starting phone consultation - you will receive a call shortly')}
              variant="secondary"
              size="lg"
              fullWidth
              ariaLabel="Start phone consultation"
              icon={<Phone className="w-5 h-5" />}
            >
              Phone Consultation
            </AccessibleButton>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Accessibility Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Screen reader compatible video platform</li>
              <li>• Real-time captioning available</li>
              <li>• Sign language interpreter can be arranged</li>
              <li>• Large text and high contrast options</li>
              <li>• Voice-only consultations available</li>
              <li>• Multi-language support (English, Swahili, local languages)</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Available Services:</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• General consultation - KES 1,500</li>
              <li>• Mental health counseling - KES 2,000</li>
              <li>• Prescription refills - KES 500</li>
              <li>• Disability-specific consultation - KES 2,500</li>
              <li>• Follow-up appointments - KES 1,000</li>
            </ul>
          </div>
        </div>
      </AccessibleCard>

      <AccessibleCard title="Emergency Telehealth">
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-900">24/7 Emergency Support</h4>
            </div>
            <p className="text-red-800 text-sm mb-3">
              For medical emergencies, get immediate telehealth support while emergency services are on the way.
            </p>
            <AccessibleButton
              onClick={() => speak('Connecting to emergency telehealth - a doctor will join immediately')}
              variant="danger"
              size="lg"
              fullWidth
              ariaLabel="Connect to emergency telehealth"
              icon={<Heart className="w-5 h-5" />}
            >
              Emergency Telehealth
            </AccessibleButton>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Health & Wellness</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close health and wellness"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'providers', label: 'Providers', icon: <Heart className="w-5 h-5" />, count: healthProviders.length },
            { key: 'medications', label: 'Medications', icon: <Pill className="w-5 h-5" />, count: sampleMedications.length + medications.length },
            { key: 'wellness', label: 'Wellness', icon: <Activity className="w-5 h-5" />, count: checkIns.length },
            { key: 'telehealth', label: 'Telehealth', icon: <Phone className="w-5 h-5" />, count: 0 },
          ].map((tab) => (
            <AccessibleButton
              key={tab.key}
              onClick={() => handleTabChange(tab.key as any)}
              variant={activeTab === tab.key ? 'primary' : 'secondary'}
              size="md"
              ariaLabel={`Switch to ${tab.label} tab`}
              className={`rounded-none border-b-2 ${
                activeTab === tab.key ? 'border-blue-500' : 'border-transparent'
              }`}
              icon={tab.icon}
            >
              {tab.label} {tab.count > 0 && `(${tab.count})`}
            </AccessibleButton>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'providers' && renderProviders()}
        {activeTab === 'medications' && renderMedications()}
        {activeTab === 'wellness' && renderWellness()}
        {activeTab === 'telehealth' && renderTelehealth()}
      </div>
    </div>
  );
};