import React, { useState } from 'react';
import { User, Edit, Save, X, Shield, Phone, Mail, MapPin, Calendar, Award } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAuth } from '../../contexts/AuthContext';
import { useAccessibility } from '../../contexts/AccessibilityContext';

interface ProfileManagementProps {
  onClose: () => void;
}

export const ProfileManagement: React.FC<ProfileManagementProps> = ({ onClose }) => {
  const { user, updateProfile, deleteAccount } = useAuth();
  const { profile, speak } = useAccessibility();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    county: user?.county || '',
    subcounty: user?.subcounty || '',
    ward: user?.ward || '',
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    speak('Profile editing mode enabled');
  };

  const handleSave = async () => {
    const result = await updateProfile(editData);
    if (result.success) {
      setIsEditing(false);
      speak('Profile updated successfully');
    } else {
      speak('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      phone: user?.phone || '',
      county: user?.county || '',
      subcounty: user?.subcounty || '',
      ward: user?.ward || '',
    });
    setIsEditing(false);
    speak('Profile editing cancelled');
  };

  const handleDeleteAccount = async () => {
    const result = await deleteAccount();
    if (result.success) {
      speak('Account deleted successfully');
      onClose();
    } else {
      speak('Failed to delete account');
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600">Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Profile Management</h2>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close profile management"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-2 space-y-6">
          <AccessibleCard title="Account Information">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                {!isEditing ? (
                  <AccessibleButton
                    onClick={handleEdit}
                    variant="secondary"
                    size="md"
                    ariaLabel="Edit profile information"
                    icon={<Edit className="w-4 h-4" />}
                  >
                    Edit
                  </AccessibleButton>
                ) : (
                  <div className="flex gap-2">
                    <AccessibleButton
                      onClick={handleSave}
                      variant="primary"
                      size="sm"
                      ariaLabel="Save profile changes"
                      icon={<Save className="w-4 h-4" />}
                    >
                      Save
                    </AccessibleButton>
                    <AccessibleButton
                      onClick={handleCancel}
                      variant="secondary"
                      size="sm"
                      ariaLabel="Cancel profile editing"
                      icon={<X className="w-4 h-4" />}
                    >
                      Cancel
                    </AccessibleButton>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{user.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user.email}</span>
                    {user.emailVerified && (
                      <Shield className="w-4 h-4 text-green-600" title="Verified" />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., +254 700 123 456"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{user.phone || 'Not provided'}</span>
                      {user.phoneVerified && (
                        <Shield className="w-4 h-4 text-green-600" title="Verified" />
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    County
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.county}
                      onChange={(e) => setEditData({ ...editData, county: e.target.value })}
                      className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{user.county}</span>
                    </div>
                  )}
                </div>

                {(user.subcounty || isEditing) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub-County
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.subcounty}
                        onChange={(e) => setEditData({ ...editData, subcounty: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{user.subcounty}</span>
                      </div>
                    )}
                  </div>
                )}

                {(user.ward || isEditing) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ward
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.ward}
                        onChange={(e) => setEditData({ ...editData, ward: e.target.value })}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{user.ward}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{user.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Login
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{user.lastLogin.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </AccessibleCard>

          {/* NCPWD Information */}
          <AccessibleCard title="NCPWD Registration">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${user.ncpwdRegistered ? 'bg-green-600' : 'bg-gray-400'}`}></div>
                <span className="font-medium">
                  {user.ncpwdRegistered ? 'Registered with NCPWD' : 'Not registered with NCPWD'}
                </span>
              </div>

              {user.ncpwdRegistered && user.ncpwdNumber && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NCPWD Registration Number
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Award className="w-4 h-4 text-green-600" />
                    <span className="font-mono">{user.ncpwdNumber}</span>
                  </div>
                </div>
              )}

              {user.ncpwdRegistered && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">NCPWD Benefits</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Access to government disability programs</li>
                    <li>• Priority consideration for employment opportunities</li>
                    <li>• Eligibility for disability cash transfers</li>
                    <li>• Access to assistive devices and rehabilitation services</li>
                  </ul>
                </div>
              )}
            </div>
          </AccessibleCard>

          {/* Accessibility Profile */}
          {profile && (
            <AccessibleCard title="Accessibility Profile">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Name
                  </label>
                  <p className="text-gray-900">{profile.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disabilities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.disabilities.map((disability, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {disability.category} ({disability.severity})
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistive Technology
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.assistiveTech.map((tech, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language Preference
                  </label>
                  <p className="text-gray-900 capitalize">{profile.preferences.language}</p>
                </div>
              </div>
            </AccessibleCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AccessibleCard title="Account Status">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Verified</span>
                <div className={`w-3 h-3 rounded-full ${user.emailVerified ? 'bg-green-600' : 'bg-red-600'}`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Phone Verified</span>
                <div className={`w-3 h-3 rounded-full ${user.phoneVerified ? 'bg-green-600' : 'bg-red-600'}`}></div>
              </div>
              <div className="flex items-center justify-between">
                <span>Profile Complete</span>
                <div className={`w-3 h-3 rounded-full ${user.profileComplete ? 'bg-green-600' : 'bg-yellow-600'}`}></div>
              </div>
            </div>
          </AccessibleCard>

          <AccessibleCard title="Quick Actions">
            <div className="space-y-3">
              <AccessibleButton
                onClick={() => speak('Opening accessibility setup')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Update accessibility preferences"
              >
                Update Accessibility
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Opening privacy settings')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Manage privacy settings"
              >
                Privacy Settings
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Downloading personal data')}
                variant="secondary"
                size="md"
                fullWidth
                ariaLabel="Download your data"
              >
                Download Data
              </AccessibleButton>
            </div>
          </AccessibleCard>

          <AccessibleCard title="Account Management" priority="high">
            <div className="space-y-3">
              <AccessibleButton
                onClick={() => setShowDeleteConfirm(true)}
                variant="danger"
                size="md"
                fullWidth
                ariaLabel="Delete account permanently"
              >
                Delete Account
              </AccessibleButton>
            </div>
          </AccessibleCard>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <AccessibleCard className="max-w-md w-full">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-red-900">Delete Account</h3>
              <p className="text-gray-700">
                Are you sure you want to delete your AccessNav Kenya account? This action cannot be undone.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">This will permanently delete:</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Your profile and accessibility settings</li>
                  <li>• All your community reports and contributions</li>
                  <li>• Your saved locations and preferences</li>
                  <li>• All account data and history</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <AccessibleButton
                  onClick={() => setShowDeleteConfirm(false)}
                  variant="secondary"
                  size="md"
                  ariaLabel="Cancel account deletion"
                >
                  Cancel
                </AccessibleButton>
                <AccessibleButton
                  onClick={handleDeleteAccount}
                  variant="danger"
                  size="md"
                  ariaLabel="Confirm account deletion"
                >
                  Delete Account
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        </div>
      )}
    </div>
  );
};