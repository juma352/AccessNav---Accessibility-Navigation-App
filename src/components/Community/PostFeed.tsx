import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, MapPin, Clock, Verified, Accessibility } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useAuth } from '../../contexts/AuthContext';
import { CommunityPost } from '../../types';

interface PostFeedProps {
  searchTerm: string;
  onPostClick: (post: CommunityPost) => void;
}

export const PostFeed: React.FC<PostFeedProps> = ({ searchTerm, onPostClick }) => {
  const { speak } = useAccessibility();
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [repostedPosts, setRepostedPosts] = useState<string[]>([]);

  // Mock posts data
  useEffect(() => {
    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        authorId: 'user1',
        authorName: 'Grace Wanjiku',
        authorLocation: 'Nairobi',
        content: 'Just discovered that the new Westgate Mall has excellent wheelchair accessibility! All floors accessible via elevator, wide corridors, and accessible restrooms on every floor. The staff is also very helpful and understanding. 🎉 #AccessibilityWin #NairobiAccessible',
        type: 'accessibility-update',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 24,
        reposts: 8,
        comments: 12,
        views: 156,
        likedBy: [],
        repostedBy: [],
        hashtags: ['AccessibilityWin', 'NairobiAccessible'],
        mentions: [],
        location: {
          name: 'Westgate Mall, Nairobi',
          coordinates: { lat: -1.2634, lng: 36.8047 }
        },
        accessibility: {
          rating: 5,
          features: ['Wheelchair accessible', 'Accessible restrooms', 'Wide corridors', 'Elevators']
        }
      },
      {
        id: '2',
        authorId: 'user2',
        authorName: 'James Ochieng',
        authorLocation: 'Kisumu',
        content: 'Looking for recommendations for accessible restaurants in Kisumu CBD. Planning a family dinner and need wheelchair-friendly options with good food. Any suggestions from the community? 🍽️ #KisumuEats #AccessibleDining',
        type: 'question',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        likes: 12,
        reposts: 3,
        comments: 18,
        views: 89,
        likedBy: [],
        repostedBy: [],
        hashtags: ['KisumuEats', 'AccessibleDining'],
        mentions: []
      },
      {
        id: '3',
        authorId: 'user3',
        authorName: 'Fatuma Hassan',
        authorLocation: 'Mombasa',
        content: 'Attended the NCPWD workshop on employment rights today. Learned so much about reasonable accommodations in the workplace and how to advocate for ourselves. The session on interview preparation was particularly helpful. Highly recommend for anyone job hunting! 💪 #EmploymentRights #NCPWD',
        type: 'experience',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        likes: 31,
        reposts: 12,
        comments: 8,
        views: 234,
        likedBy: [],
        repostedBy: [],
        hashtags: ['EmploymentRights', 'NCPWD'],
        mentions: []
      },
      {
        id: '4',
        authorId: 'user4',
        authorName: 'Peter Kamau',
        authorLocation: 'Nakuru',
        content: 'Repost: This is such valuable information! Thanks for sharing Grace. We need more places like Westgate Mall that prioritize accessibility. 👏',
        type: 'text',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        likes: 8,
        reposts: 2,
        comments: 4,
        views: 67,
        likedBy: [],
        repostedBy: [],
        hashtags: [],
        mentions: ['Grace'],
        isRepost: true,
        originalPostId: '1',
        originalAuthor: 'Grace Wanjiku'
      },
      {
        id: '5',
        authorId: 'user5',
        authorName: 'Mary Akinyi',
        authorLocation: 'Eldoret',
        content: 'Celebrating a personal milestone today! 🎉 Just completed my first month using AccessNav Kenya and I\'ve successfully navigated to 15 new places independently. The confidence this app has given me is incredible. Thank you to the entire community for the support and accurate accessibility reports! #Independence #AccessNavKenya #Milestone',
        type: 'achievement',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        likes: 45,
        reposts: 15,
        comments: 22,
        views: 312,
        likedBy: [],
        repostedBy: [],
        hashtags: ['Independence', 'AccessNavKenya', 'Milestone'],
        mentions: []
      },
      {
        id: '6',
        authorId: 'user6',
        authorName: 'David Mwangi',
        authorLocation: 'Thika',
        content: 'PSA: The matatu stage at Thika Super Highway has been renovated and now includes a wheelchair-accessible waiting area! 🚐♿ The new design has proper lighting, seating, and even tactile paving for visually impaired passengers. Progress! #PublicTransport #Accessibility #Thika',
        type: 'accessibility-update',
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        likes: 28,
        reposts: 11,
        comments: 9,
        views: 178,
        likedBy: [],
        repostedBy: [],
        hashtags: ['PublicTransport', 'Accessibility', 'Thika'],
        mentions: [],
        location: {
          name: 'Thika Super Highway Matatu Stage',
          coordinates: { lat: -1.0332, lng: 37.0692 }
        },
        accessibility: {
          rating: 4,
          features: ['Wheelchair accessible', 'Proper lighting', 'Tactile paving', 'Accessible seating']
        }
      }
    ];

    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    if (!searchTerm) return true;
    return (
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleLike = (postId: string) => {
    const isLiked = likedPosts.includes(postId);
    
    if (isLiked) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes - 1, likedBy: post.likedBy.filter(id => id !== user?.id) }
          : post
      ));
      speak('Post unliked');
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1, likedBy: [...post.likedBy, user?.id || ''] }
          : post
      ));
      speak('Post liked');
    }
  };

  const handleRepost = (postId: string, authorName: string) => {
    const isReposted = repostedPosts.includes(postId);
    
    if (isReposted) {
      setRepostedPosts(repostedPosts.filter(id => id !== postId));
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, reposts: post.reposts - 1, repostedBy: post.repostedBy.filter(id => id !== user?.id) }
          : post
      ));
      speak('Repost removed');
    } else {
      setRepostedPosts([...repostedPosts, postId]);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, reposts: post.reposts + 1, repostedBy: [...post.repostedBy, user?.id || ''] }
          : post
      ));
      speak(`Reposted ${authorName}'s post`);
    }
  };

  const handleShare = (postId: string, authorName: string) => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${authorName}`,
        text: 'Check out this post from AccessNav Kenya community',
        url: `${window.location.origin}/post/${postId}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
      speak('Post link copied to clipboard');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return date.toLocaleDateString();
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'accessibility-update':
        return <Accessibility className="w-4 h-4 text-green-600" />;
      case 'question':
        return <MessageCircle className="w-4 h-4 text-blue-600" />;
      case 'experience':
        return <Heart className="w-4 h-4 text-purple-600" />;
      case 'achievement':
        return <Verified className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'accessibility-update':
        return 'bg-green-100 text-green-800';
      case 'question':
        return 'bg-blue-100 text-blue-800';
      case 'experience':
        return 'bg-purple-100 text-purple-800';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderHashtags = (hashtags: string[]) => {
    return hashtags.map((tag, index) => (
      <span key={index} className="text-blue-600 hover:text-blue-800 cursor-pointer">
        #{tag}
      </span>
    ));
  };

  const renderMentions = (mentions: string[]) => {
    return mentions.map((mention, index) => (
      <span key={index} className="text-blue-600 hover:text-blue-800 cursor-pointer">
        @{mention}
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms' : 'Be the first to share something with the community!'}
          </p>
        </div>
      ) : (
        filteredPosts.map((post) => (
          <AccessibleCard key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="space-y-4">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {post.authorName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                        {post.authorName}
                      </h4>
                      <Verified className="w-4 h-4 text-blue-600" />
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPostTypeColor(post.type)}`}>
                        <div className="flex items-center gap-1">
                          {getPostTypeIcon(post.type)}
                          {post.type.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{post.authorLocation}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(post.createdAt)}</span>
                      {post.views && (
                        <>
                          <span>•</span>
                          <span>{post.views} views</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <AccessibleButton
                  onClick={() => speak('Opening post options')}
                  variant="secondary"
                  size="sm"
                  ariaLabel="Post options"
                  icon={<MoreHorizontal className="w-4 h-4" />}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="sr-only">Options</span>
                </AccessibleButton>
              </div>

              {/* Repost indicator */}
              {post.isRepost && (
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <Repeat2 className="w-4 h-4" />
                  <span>Reposted from @{post.originalAuthor}</span>
                </div>
              )}

              {/* Post Content */}
              <div 
                className="text-gray-800 leading-relaxed cursor-pointer"
                onClick={() => onPostClick(post)}
              >
                <p className="mb-3">{post.content}</p>
                
                {/* Hashtags and Mentions */}
                {(post.hashtags.length > 0 || post.mentions.length > 0) && (
                  <div className="flex flex-wrap gap-2 text-sm">
                    {renderHashtags(post.hashtags)}
                    {renderMentions(post.mentions)}
                  </div>
                )}
              </div>

              {/* Location and Accessibility Info */}
              {post.location && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">{post.location.name}</span>
                  </div>
                  {post.accessibility && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-800">Accessibility Rating:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Accessibility
                              key={star}
                              className={`w-4 h-4 ${star <= post.accessibility!.rating ? 'text-green-600 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {post.accessibility.features.map((feature, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <AccessibleButton
                    onClick={() => handleLike(post.id)}
                    variant="secondary"
                    size="sm"
                    ariaLabel={`${likedPosts.includes(post.id) ? 'Unlike' : 'Like'} post by ${post.authorName}`}
                    className={`flex items-center gap-2 ${likedPosts.includes(post.id) ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes}</span>
                  </AccessibleButton>

                  <AccessibleButton
                    onClick={() => onPostClick(post)}
                    variant="secondary"
                    size="sm"
                    ariaLabel={`View ${post.comments} comments on post by ${post.authorName}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </AccessibleButton>

                  <AccessibleButton
                    onClick={() => handleRepost(post.id, post.authorName)}
                    variant="secondary"
                    size="sm"
                    ariaLabel={`${repostedPosts.includes(post.id) ? 'Remove repost' : 'Repost'} by ${post.authorName}`}
                    className={`flex items-center gap-2 ${repostedPosts.includes(post.id) ? 'text-green-600' : 'text-gray-600'} hover:text-green-600`}
                  >
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-sm">{post.reposts}</span>
                  </AccessibleButton>

                  <AccessibleButton
                    onClick={() => handleShare(post.id, post.authorName)}
                    variant="secondary"
                    size="sm"
                    ariaLabel={`Share post by ${post.authorName}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Share className="w-4 h-4" />
                  </AccessibleButton>
                </div>

                <AccessibleButton
                  onClick={() => onPostClick(post)}
                  variant="secondary"
                  size="sm"
                  ariaLabel={`View full post by ${post.authorName}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Post
                </AccessibleButton>
              </div>
            </div>
          </AccessibleCard>
        ))
      )}

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <div className="text-center">
          <AccessibleButton
            onClick={() => speak('Loading more posts')}
            variant="secondary"
            size="lg"
            ariaLabel="Load more posts"
          >
            Load More Posts
          </AccessibleButton>
        </div>
      )}
    </div>
  );
};