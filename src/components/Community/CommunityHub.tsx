import React, { useState } from 'react';
import { Users, MessageSquare, MapPin, Star, TrendingUp, Calendar, Award, Filter, Plus, Search } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { PostFeed } from './PostFeed';
import { CreatePost } from './CreatePost';
import { PostDetail } from './PostDetail';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useAuth } from '../../contexts/AuthContext';
import { CommunityPost } from '../../types';

interface CommunityHubProps {
  onClose: () => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ onClose }) => {
  const { speak } = useAccessibility();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'feed' | 'forums' | 'events' | 'achievements'>('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabChange = (tab: 'feed' | 'forums' | 'events' | 'achievements') => {
    setActiveTab(tab);
    speak(`Switched to ${tab} section`);
  };

  const handleCreatePost = () => {
    setShowCreatePost(true);
    speak('Opening post creation');
  };

  const handlePostCreated = (post: CommunityPost) => {
    setShowCreatePost(false);
    speak('Post created successfully');
    // In a real app, this would update the feed
  };

  const handlePostClick = (post: CommunityPost) => {
    setSelectedPost(post);
    speak(`Opening post by ${post.authorName}`);
  };

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Community Feed</h3>
          <p className="text-gray-600 text-sm">Share experiences, ask questions, and connect with the community</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              aria-label="Search community posts"
            />
          </div>
          <AccessibleButton
            onClick={() => speak('Opening post filters')}
            variant="secondary"
            size="md"
            ariaLabel="Filter posts"
            icon={<Filter className="w-4 h-4" />}
          >
            Filter
          </AccessibleButton>
          <AccessibleButton
            onClick={handleCreatePost}
            variant="primary"
            size="md"
            ariaLabel="Create new post"
            icon={<Plus className="w-4 h-4" />}
          >
            New Post
          </AccessibleButton>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">2,847</div>
          <div className="text-sm text-blue-800">Total Posts</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">1,234</div>
          <div className="text-sm text-green-800">Active Users</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">156</div>
          <div className="text-sm text-purple-800">Today's Posts</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">89</div>
          <div className="text-sm text-orange-800">Accessibility Updates</div>
        </div>
      </div>

      {/* Post Feed */}
      <PostFeed 
        searchTerm={searchTerm}
        onPostClick={handlePostClick}
      />
    </div>
  );

  const renderForums = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Discussion Forums</h3>
        <AccessibleButton
          onClick={() => speak('Opening forum filters')}
          variant="secondary"
          size="md"
          ariaLabel="Filter forums"
          icon={<Filter className="w-4 h-4" />}
        >
          Filter
        </AccessibleButton>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            title: 'Accessibility in Nairobi',
            description: 'Share and discuss accessibility in Kenya\'s capital',
            members: 1247,
            posts: 89,
            lastActivity: '2 hours ago',
            trending: true
          },
          {
            title: 'Employment Opportunities',
            description: 'Job opportunities and career advice for PWDs',
            members: 892,
            posts: 156,
            lastActivity: '1 hour ago',
            trending: true
          },
          {
            title: 'Health & Wellness',
            description: 'Healthcare resources and wellness tips',
            members: 634,
            posts: 78,
            lastActivity: '3 hours ago',
            trending: false
          },
          {
            title: 'Assistive Technology',
            description: 'Reviews and recommendations for assistive devices',
            members: 445,
            posts: 92,
            lastActivity: '5 hours ago',
            trending: false
          },
          {
            title: 'Rights & Advocacy',
            description: 'Know your rights and advocacy strategies',
            members: 567,
            posts: 134,
            lastActivity: '1 day ago',
            trending: false
          },
          {
            title: 'County-Specific Groups',
            description: 'Connect with PWDs in your county',
            members: 2103,
            posts: 267,
            lastActivity: '30 minutes ago',
            trending: true
          }
        ].map((forum, index) => (
          <AccessibleCard key={index} clickable className="hover:shadow-xl transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-bold text-gray-900">{forum.title}</h4>
                {forum.trending && (
                  <div className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm">{forum.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>{forum.members.toLocaleString()} members</span>
                  <span>{forum.posts} posts</span>
                </div>
                <span>Active {forum.lastActivity}</span>
              </div>

              <AccessibleButton
                onClick={() => speak(`Joining ${forum.title} forum`)}
                variant="primary"
                size="sm"
                fullWidth
                ariaLabel={`Join ${forum.title} forum`}
              >
                Join Discussion
              </AccessibleButton>
            </div>
          </AccessibleCard>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Community Events</h3>
        <AccessibleButton
          onClick={() => speak('Creating new event')}
          variant="primary"
          size="md"
          ariaLabel="Create new event"
          icon={<Plus className="w-4 h-4" />}
        >
          Create Event
        </AccessibleButton>
      </div>

      <div className="space-y-4">
        {[
          {
            title: 'Accessibility Mapping Workshop - Nairobi',
            date: 'March 15, 2024',
            time: '2:00 PM - 5:00 PM',
            location: 'NCPWD Offices, Nairobi',
            attendees: 45,
            description: 'Learn how to contribute to AccessNav\'s community mapping efforts',
            type: 'workshop'
          },
          {
            title: 'Employment Fair for PWDs',
            date: 'March 22, 2024',
            time: '9:00 AM - 4:00 PM',
            location: 'KICC, Nairobi',
            attendees: 156,
            description: 'Meet with inclusive employers and learn about job opportunities',
            type: 'fair'
          },
          {
            title: 'Digital Skills Training - Mombasa',
            date: 'March 28, 2024',
            time: '10:00 AM - 3:00 PM',
            location: 'Mombasa Technical Institute',
            attendees: 32,
            description: 'Free digital literacy training for persons with disabilities',
            type: 'training'
          },
          {
            title: 'Accessibility Advocacy Meetup - Kisumu',
            date: 'April 5, 2024',
            time: '3:00 PM - 6:00 PM',
            location: 'Kisumu Community Center',
            attendees: 28,
            description: 'Monthly meetup for disability rights advocates in Kisumu',
            type: 'meetup'
          }
        ].map((event, index) => (
          <AccessibleCard key={index} className="hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'fair' ? 'bg-green-100 text-green-800' :
                      event.type === 'training' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {event.type}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <AccessibleButton
                    onClick={() => speak(`Joining event: ${event.title}`)}
                    variant="primary"
                    size="sm"
                    ariaLabel={`Join event: ${event.title}`}
                  >
                    Join Event
                  </AccessibleButton>
                  <AccessibleButton
                    onClick={() => speak(`Sharing event: ${event.title}`)}
                    variant="secondary"
                    size="sm"
                    ariaLabel={`Share event: ${event.title}`}
                  >
                    Share
                  </AccessibleButton>
                </div>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Community Achievements</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <AccessibleCard title="Your Contributions">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Accessibility Reports</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600">12</span>
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Community Helps</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-green-600">8</span>
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Forum Posts</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-purple-600">23</span>
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Posts Liked</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-600">156</span>
                <Award className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-1">Next Badge</h4>
              <p className="text-sm text-yellow-800">Submit 3 more reports to earn "Community Mapper" badge</p>
              <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </AccessibleCard>

        <AccessibleCard title="Community Impact">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">2,847</div>
              <div className="text-sm text-gray-600">Total Community Posts</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-blue-600">156</div>
                <div className="text-xs text-gray-600">This Month</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">89%</div>
                <div className="text-xs text-gray-600">Engagement Rate</div>
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-1">Community Goal</h4>
              <p className="text-sm text-green-800">Reach 10,000 community interactions this month</p>
              <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '73%' }}></div>
              </div>
              <p className="text-xs text-green-700 mt-1">73% complete</p>
            </div>
          </div>
        </AccessibleCard>
      </div>

      <AccessibleCard title="Top Contributors This Month">
        <div className="space-y-3">
          {[
            { name: 'Grace Wanjiku', contributions: 34, badge: 'Super Mapper', avatar: 'GW' },
            { name: 'James Ochieng', contributions: 28, badge: 'Community Helper', avatar: 'JO' },
            { name: 'Fatuma Hassan', contributions: 22, badge: 'Accessibility Advocate', avatar: 'FH' },
            { name: 'Peter Kamau', contributions: 19, badge: 'Forum Leader', avatar: 'PK' },
            { name: 'Mary Akinyi', contributions: 16, badge: 'Rising Star', avatar: 'MA' }
          ].map((contributor, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {index < 3 ? (index + 1) : contributor.avatar}
                </div>
                <div>
                  <div className="font-medium">{contributor.name}</div>
                  <div className="text-sm text-gray-600">{contributor.badge}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600">{contributor.contributions}</div>
                <div className="text-xs text-gray-500">contributions</div>
              </div>
            </div>
          ))}
        </div>
      </AccessibleCard>
    </div>
  );

  // Show post detail modal
  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onBack={() => setSelectedPost(null)}
      />
    );
  }

  // Show create post modal
  if (showCreatePost) {
    return (
      <CreatePost
        onClose={() => setShowCreatePost(false)}
        onPostCreated={handlePostCreated}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Community Hub</h2>
          <p className="text-gray-600">Connect, share, and grow with Kenya's accessibility community</p>
        </div>
        <AccessibleButton
          onClick={onClose}
          variant="secondary"
          size="md"
          ariaLabel="Close community hub"
        >
          Close
        </AccessibleButton>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-gray-200">
          {[
            { key: 'feed', label: 'Feed', icon: <TrendingUp className="w-5 h-5" />, count: '2.8k' },
            { key: 'forums', label: 'Forums', icon: <MessageSquare className="w-5 h-5" />, count: '6' },
            { key: 'events', label: 'Events', icon: <Calendar className="w-5 h-5" />, count: '12' },
            { key: 'achievements', label: 'Achievements', icon: <Award className="w-5 h-5" />, count: '5' },
          ].map((tab) => (
            <AccessibleButton
              key={tab.key}
              onClick={() => handleTabChange(tab.key as any)}
              variant={activeTab === tab.key ? 'primary' : 'secondary'}
              size="md"
              ariaLabel={`Switch to ${tab.label} tab with ${tab.count} items`}
              className={`rounded-none border-b-2 ${
                activeTab === tab.key ? 'border-blue-500' : 'border-transparent'
              }`}
              icon={tab.icon}
            >
              {tab.label}
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </AccessibleButton>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'forums' && renderForums()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'achievements' && renderAchievements()}
      </div>
    </div>
  );
};