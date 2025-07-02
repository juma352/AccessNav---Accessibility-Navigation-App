import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Repeat2, Share, MoreHorizontal, MapPin, Clock, Verified, Accessibility, Send } from 'lucide-react';
import { AccessibleButton } from '../common/AccessibleButton';
import { AccessibleCard } from '../common/AccessibleCard';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import { useAuth } from '../../contexts/AuthContext';
import { CommunityPost, PostComment } from '../../types';

interface PostDetailProps {
  post: CommunityPost;
  onClose: () => void;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onClose, onBack }) => {
  const { speak } = useAccessibility();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Mock comments data
  React.useEffect(() => {
    const mockComments: PostComment[] = [
      {
        id: '1',
        postId: post.id,
        authorId: 'user2',
        authorName: 'James Ochieng',
        content: 'This is fantastic news! I\'ve been looking for accessible places in Nairobi. Thanks for sharing this detailed review.',
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        likes: 5,
        likedBy: [],
        replies: [
          {
            id: '1-1',
            commentId: '1',
            authorId: 'user1',
            authorName: 'Grace Wanjiku',
            content: 'You\'re welcome! I\'m glad this helps. The mall also has great customer service for PWDs.',
            createdAt: new Date(Date.now() - 25 * 60 * 1000),
            likes: 2,
            likedBy: []
          }
        ]
      },
      {
        id: '2',
        postId: post.id,
        authorId: 'user3',
        authorName: 'Fatuma Hassan',
        content: 'I visited last week and can confirm everything Grace mentioned. The accessible parking is also very convenient and well-marked.',
        createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        likes: 8,
        likedBy: [],
        replies: []
      },
      {
        id: '3',
        postId: post.id,
        authorId: 'user4',
        authorName: 'Peter Kamau',
        content: 'Are the elevators voice-enabled? That would be really helpful for visually impaired visitors.',
        createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
        likes: 3,
        likedBy: [],
        replies: []
      }
    ];
    setComments(mockComments);
  }, [post.id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    speak(isLiked ? 'Post unliked' : 'Post liked');
  };

  const handleRepost = () => {
    setIsReposted(!isReposted);
    speak(isReposted ? 'Repost removed' : 'Post reposted');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.authorName}`,
        text: post.content,
        url: `${window.location.origin}/post/${post.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
      speak('Post link copied to clipboard');
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      speak('Please enter a comment');
      return;
    }

    setIsSubmittingComment(true);
    speak('Posting your comment');

    const comment: PostComment = {
      id: Date.now().toString(),
      postId: post.id,
      authorId: user?.id || 'current-user',
      authorName: user?.name || 'Current User',
      content: newComment.trim(),
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
      replies: []
    };

    // Simulate API call
    setTimeout(() => {
      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmittingComment(false);
      speak('Comment posted successfully');
    }, 1000);
  };

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            likes: comment.likedBy.includes(user?.id || '') 
              ? comment.likes - 1 
              : comment.likes + 1,
            likedBy: comment.likedBy.includes(user?.id || '')
              ? comment.likedBy.filter(id => id !== user?.id)
              : [...comment.likedBy, user?.id || '']
          }
        : comment
    ));
    speak('Comment liked');
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <AccessibleButton
          onClick={onBack}
          variant="secondary"
          size="md"
          ariaLabel="Go back to community feed"
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </AccessibleButton>
        <h2 className="text-2xl font-bold text-gray-900">Post Details</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Post */}
        <div className="lg:col-span-2 space-y-6">
          <AccessibleCard>
            <div className="space-y-6">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {post.authorName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{post.authorName}</h3>
                      <Verified className="w-5 h-5 text-blue-600" />
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPostTypeColor(post.type)}`}>
                        {post.type.replace('-', ' ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{post.authorLocation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimeAgo(post.createdAt)}</span>
                      </div>
                      <span>{post.views} views</span>
                    </div>
                  </div>
                </div>
                <AccessibleButton
                  onClick={() => speak('Opening post options')}
                  variant="secondary"
                  size="sm"
                  ariaLabel="Post options"
                  icon={<MoreHorizontal className="w-4 h-4" />}
                >
                  <span className="sr-only">Options</span>
                </AccessibleButton>
              </div>

              {/* Post Content */}
              <div className="text-gray-800 text-lg leading-relaxed">
                <p className="mb-4">{post.content}</p>
                
                {/* Hashtags */}
                {post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.hashtags.map((tag, index) => (
                      <span key={index} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Location and Accessibility Info */}
              {post.location && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900 text-lg">{post.location.name}</span>
                  </div>
                  {post.accessibility && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-800 font-medium">Accessibility Rating:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Accessibility
                              key={star}
                              className={`w-5 h-5 ${star <= post.accessibility!.rating ? 'text-green-600 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-blue-800 font-semibold">{post.accessibility.rating}/5</span>
                      </div>
                      <div>
                        <span className="text-blue-800 font-medium mb-2 block">Accessibility Features:</span>
                        <div className="flex flex-wrap gap-2">
                          {post.accessibility.features.map((feature, index) => (
                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-8">
                  <AccessibleButton
                    onClick={handleLike}
                    variant="secondary"
                    size="md"
                    ariaLabel={`${isLiked ? 'Unlike' : 'Like'} post`}
                    className={`flex items-center gap-2 ${isLiked ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </AccessibleButton>

                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments + comments.length}</span>
                  </div>

                  <AccessibleButton
                    onClick={handleRepost}
                    variant="secondary"
                    size="md"
                    ariaLabel={`${isReposted ? 'Remove repost' : 'Repost'}`}
                    className={`flex items-center gap-2 ${isReposted ? 'text-green-600' : 'text-gray-600'} hover:text-green-600`}
                  >
                    <Repeat2 className="w-5 h-5" />
                    <span>{post.reposts + (isReposted ? 1 : 0)}</span>
                  </AccessibleButton>

                  <AccessibleButton
                    onClick={handleShare}
                    variant="secondary"
                    size="md"
                    ariaLabel="Share post"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Share className="w-5 h-5" />
                  </AccessibleButton>
                </div>
              </div>
            </div>
          </AccessibleCard>

          {/* Add Comment */}
          <AccessibleCard title="Add a Comment">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on this post..."
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-vertical"
                    rows={3}
                    maxLength={300}
                    aria-label="Write a comment"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{newComment.length}/300</span>
                    <AccessibleButton
                      onClick={handleSubmitComment}
                      variant="primary"
                      size="sm"
                      disabled={isSubmittingComment || !newComment.trim()}
                      ariaLabel={isSubmittingComment ? 'Posting comment...' : 'Post comment'}
                      icon={<Send className="w-4 h-4" />}
                    >
                      {isSubmittingComment ? 'Posting...' : 'Comment'}
                    </AccessibleButton>
                  </div>
                </div>
              </div>
            </div>
          </AccessibleCard>

          {/* Comments */}
          <AccessibleCard title={`Comments (${comments.length})`}>
            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No comments yet. Be the first to comment!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {comment.authorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{comment.authorName}</span>
                            <span className="text-sm text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-800">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <AccessibleButton
                            onClick={() => handleCommentLike(comment.id)}
                            variant="secondary"
                            size="sm"
                            ariaLabel={`Like comment by ${comment.authorName}`}
                            className={`flex items-center gap-1 text-sm ${
                              comment.likedBy.includes(user?.id || '') ? 'text-red-600' : 'text-gray-600'
                            } hover:text-red-600`}
                          >
                            <Heart className={`w-3 h-3 ${comment.likedBy.includes(user?.id || '') ? 'fill-current' : ''}`} />
                            <span>{comment.likes}</span>
                          </AccessibleButton>
                          <AccessibleButton
                            onClick={() => speak('Reply feature coming soon')}
                            variant="secondary"
                            size="sm"
                            ariaLabel={`Reply to ${comment.authorName}`}
                            className="text-sm text-gray-600 hover:text-blue-600"
                          >
                            Reply
                          </AccessibleButton>
                        </div>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-12 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {reply.authorName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-gray-900 text-sm">{reply.authorName}</span>
                                  <span className="text-xs text-gray-500">{formatTimeAgo(reply.createdAt)}</span>
                                </div>
                                <p className="text-gray-800 text-sm">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-4 mt-2">
                                <AccessibleButton
                                  onClick={() => speak('Reply like feature coming soon')}
                                  variant="secondary"
                                  size="sm"
                                  ariaLabel={`Like reply by ${reply.authorName}`}
                                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600"
                                >
                                  <Heart className="w-3 h-3" />
                                  <span>{reply.likes}</span>
                                </AccessibleButton>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </AccessibleCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AccessibleCard title="Post Stats">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Views</span>
                <span className="font-semibold">{post.views}</span>
              </div>
              <div className="flex justify-between">
                <span>Likes</span>
                <span className="font-semibold">{post.likes + (isLiked ? 1 : 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Comments</span>
                <span className="font-semibold">{post.comments + comments.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Reposts</span>
                <span className="font-semibold">{post.reposts + (isReposted ? 1 : 0)}</span>
              </div>
            </div>
          </AccessibleCard>

          <AccessibleCard title="Related Posts">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                More posts about accessibility in {post.authorLocation}
              </p>
              <AccessibleButton
                onClick={() => speak('Viewing related posts')}
                variant="secondary"
                size="sm"
                fullWidth
                ariaLabel="View related posts"
              >
                View Related Posts
              </AccessibleButton>
            </div>
          </AccessibleCard>

          <AccessibleCard title="Share This Post">
            <div className="space-y-3">
              <AccessibleButton
                onClick={handleShare}
                variant="primary"
                size="sm"
                fullWidth
                ariaLabel="Share this post"
                icon={<Share className="w-4 h-4" />}
              >
                Share Post
              </AccessibleButton>
              <AccessibleButton
                onClick={() => speak('Report feature coming soon')}
                variant="secondary"
                size="sm"
                fullWidth
                ariaLabel="Report this post"
              >
                Report Post
              </AccessibleButton>
            </div>
          </AccessibleCard>
        </div>
      </div>
    </div>
  );
};