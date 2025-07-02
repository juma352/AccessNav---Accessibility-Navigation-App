import React, { useState } from 'react';
import { X, Image, MapPin, Accessibility, Hash, AtSign, Smile } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useAuth } from '../../contexts/AuthContext';
import { CommunityPost } from '../../types';

interface CreatePostProps {
  onClose: () => void;
  onPostCreated: (post: CommunityPost) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onClose, onPostCreated }) => {
  const { speak } = useAccessibility();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<CommunityPost['type']>('text');
  const [location, setLocation] = useState('');
  const [accessibilityRating, setAccessibilityRating] = useState(0);
  const [accessibilityFeatures, setAccessibilityFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postTypes = [
    { value: 'text', label: 'General Post', description: 'Share thoughts, experiences, or general updates' },
    { value: 'accessibility-update', label: 'Accessibility Update', description: 'Report on accessibility of a location' },
    { value: 'question', label: 'Question', description: 'Ask the community for help or advice' },
    { value: 'experience', label: 'Experience', description: 'Share a personal experience or story' },
    { value: 'achievement', label: 'Achievement', description: 'Celebrate a personal milestone or success' },
    { value: 'event', label: 'Event', description: 'Share information about an upcoming event' }
  ];

  const accessibilityFeatureOptions = [
    'Wheelchair accessible',
    'Accessible parking',
    'Accessible restrooms',
    'Elevators',
    'Ramps',
    'Wide corridors',
    'Audio announcements',
    'Visual alerts',
    'Sign language support',
    'Braille signage',
    'Large print materials',
    'Accessible seating',
    'Hearing loop',
    'Tactile paving',
    'Good lighting',
    'Clear pathways'
  ];

  const handleSubmit = async () => {
    if (!content.trim()) {
      speak('Please enter some content for your post');
      return;
    }

    if (postType === 'accessibility-update' && !location.trim()) {
      speak('Please specify a location for accessibility updates');
      return;
    }

    setIsSubmitting(true);
    speak('Creating your post');

    // Extract hashtags and mentions from content
    const hashtags = (content.match(/#\w+/g) || []).map(tag => tag.slice(1));
    const mentions = (content.match(/@\w+/g) || []).map(mention => mention.slice(1));

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      authorId: user?.id || 'current-user',
      authorName: user?.name || 'Current User',
      authorLocation: user?.county || 'Kenya',
      content: content.trim(),
      type: postType,
      createdAt: new Date(),
      likes: 0,
      reposts: 0,
      comments: 0,
      views: 0,
      likedBy: [],
      repostedBy: [],
      hashtags,
      mentions,
      ...(location && {
        location: {
          name: location,
          coordinates: { lat: 0, lng: 0 } // In real app, get from geocoding
        }
      }),
      ...(postType === 'accessibility-update' && accessibilityRating > 0 && {
        accessibility: {
          rating: accessibilityRating,
          features: accessibilityFeatures
        }
      })
    };

    // Simulate API call
    setTimeout(() => {
      onPostCreated(newPost);
      setIsSubmitting(false);
      speak('Post created successfully');
    }, 1500);
  };

  const handleFeatureToggle = (feature: string) => {
    if (accessibilityFeatures.includes(feature)) {
      setAccessibilityFeatures(accessibilityFeatures.filter(f => f !== feature));
    } else {
      setAccessibilityFeatures([...accessibilityFeatures, feature]);
    }
  };

  const insertText = (text: string) => {
    setContent(content + text);
    speak(`Added ${text} to post`);
  };

  const characterCount = content.length;
  const maxCharacters = 500;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h3 className="text-xl font-bold text-gray-900">Create Post</h3>
          <AccessibleButton
            onClick={onClose}
            variant="secondary"
            size="sm"
            ariaLabel="Close create post"
            icon={<X className="w-4 h-4" />}
          >
            <span className="sr-only">Close</span>
          </AccessibleButton>
        </div>

        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{user?.name || 'User'}</h4>
              <p className="text-sm text-gray-600">{user?.county || 'Kenya'}</p>
            </div>
          </div>

          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Post Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {postTypes.map((type) => {
                const isSelected = postType === type.value;
                const cardClassName = isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : '';
                
                return (
                  <AccessibleCard
                    key={type.value}
                    clickable
                    onClick={() => {
                      setPostType(type.value as CommunityPost['type']);
                      speak(`Selected ${type.label}`);
                    }}
                    ariaLabel={`Select ${type.label} post type`}
                    className={cardClassName}
                  >
                    <div>
                      <h4 className="font-medium text-sm mb-1">{type.label}</h4>
                      <p className="text-gray-600 text-xs">{type.description}</p>
                    </div>
                  </AccessibleCard>
                );
              })}
            </div>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What's on your mind?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                postType === 'accessibility-update' ? 'Share details about the accessibility of this location...' :
                postType === 'question' ? 'Ask your question here...' :
                postType === 'experience' ? 'Share your experience...' :
                postType === 'achievement' ? 'Tell us about your achievement...' :
                postType === 'event' ? 'Share event details...' :
                'Share your thoughts with the community...'
              }
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical"
              rows={6}
              maxLength={maxCharacters}
              aria-label="Post content"
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <AccessibleButton
                  onClick={() => insertText(' #AccessibilityWin')}
                  variant="secondary"
                  size="sm"
                  ariaLabel="Add accessibility win hashtag"
                  icon={<Hash className="w-3 h-3" />}
                >
                  #AccessibilityWin
                </AccessibleButton>
                <AccessibleButton
                  onClick={() => insertText(' #AccessNavKenya')}
                  variant="secondary"
                  size="sm"
                  ariaLabel="Add AccessNav Kenya hashtag"
                  icon={<Hash className="w-3 h-3" />}
                >
                  #AccessNavKenya
                </AccessibleButton>
              </div>
              <span className={`text-sm ${characterCount > maxCharacters * 0.9 ? 'text-red-600' : 'text-gray-500'}`}>
                {characterCount}/{maxCharacters}
              </span>
            </div>
          </div>

          {/* Location Input (for accessibility updates) */}
          {postType === 'accessibility-update' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter the location name or address"
                  className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  aria-label="Location"
                  required
                />
              </div>
            </div>
          )}

          {/* Accessibility Rating (for accessibility updates) */}
          {postType === 'accessibility-update' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Accessibility Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <AccessibleButton
                    key={rating}
                    onClick={() => {
                      setAccessibilityRating(rating);
                      speak(`Set accessibility rating to ${rating} out of 5`);
                    }}
                    variant="secondary"
                    size="md"
                    ariaLabel={`Rate accessibility ${rating} out of 5`}
                    className={`p-2 ${accessibilityRating >= rating ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    <Accessibility className="w-6 h-6" />
                  </AccessibleButton>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {accessibilityRating > 0 ? `${accessibilityRating}/5` : 'Not rated'}
                </span>
              </div>
            </div>
          )}

          {/* Accessibility Features (for accessibility updates) */}
          {postType === 'accessibility-update' && accessibilityRating > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Accessibility Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {accessibilityFeatureOptions.map((feature) => {
                  const isSelected = accessibilityFeatures.includes(feature);
                  const featureCardClassName = `text-center text-sm ${isSelected ? 'ring-2 ring-green-500 bg-green-50' : ''}`;
                  
                  return (
                    <AccessibleCard
                      key={feature}
                      clickable
                      onClick={() => handleFeatureToggle(feature)}
                      ariaLabel={`${isSelected ? 'Remove' : 'Add'} ${feature}`}
                      className={featureCardClassName}
                    >
                      {feature}
                    </AccessibleCard>
                  );
                })}
              </div>
              {accessibilityFeatures.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Selected {accessibilityFeatures.length} feature{accessibilityFeatures.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <AccessibleButton
                onClick={() => speak('Photo upload feature coming soon')}
                variant="secondary"
                size="sm"
                ariaLabel="Add photo to post"
                icon={<Image className="w-4 h-4" />}
                disabled
              >
                Photo
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Emoji picker coming soon')}
                variant="secondary"
                size="sm"
                ariaLabel="Add emoji to post"
                icon={<Smile className="w-4 h-4" />}
                disabled
              >
                Emoji
              </AccessibleButton>
            </div>

            <div className="flex gap-3">
              <AccessibleButton
                onClick={onClose}
                variant="secondary"
                size="md"
                ariaLabel="Cancel post creation"
                disabled={isSubmitting}
              >
                Cancel
              </AccessibleButton>
              <AccessibleButton
                onClick={handleSubmit}
                variant="primary"
                size="md"
                disabled={isSubmitting || !content.trim() || (postType === 'accessibility-update' && !location.trim())}
                ariaLabel={isSubmitting ? 'Creating post...' : 'Create post'}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </AccessibleButton>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Tips for Great Posts</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use hashtags like #AccessibilityWin to help others find your posts</li>
              <li>• Be specific about locations when sharing accessibility information</li>
              <li>• Include details that would help other community members</li>
              <li>• Be respectful and constructive in your posts</li>
              <li>• Share both positive experiences and areas for improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};