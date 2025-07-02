export interface AccessibilityProfile {
  id: string;
  name: string;
  disabilities: DisabilityType[];
  preferences: AccessibilityPreferences;
  assistiveTech: AssistiveTechnology[];
  county: string;
  subcounty?: string;
  ward?: string;
}

export interface DisabilityType {
  category: 'mobility' | 'visual' | 'hearing' | 'cognitive' | 'multiple';
  severity: 'mild' | 'moderate' | 'severe';
  specificNeeds: string[];
  registeredWithNCPWD?: boolean;
  disabilityCardNumber?: string;
}

export interface AccessibilityPreferences {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high' | 'extra-high';
  colorScheme: 'light' | 'dark' | 'auto';
  voiceGuidance: boolean;
  hapticFeedback: boolean;
  autoZoom: boolean;
  slowNavigation: boolean;
  language: 'english' | 'swahili' | 'kikuyu' | 'luo' | 'luhya' | 'kamba' | 'kalenjin' | 'kisii';
}

export interface AssistiveTechnology {
  type: 'screenReader' | 'voiceControl' | 'switch' | 'eyeTracking' | 'hearingAid' | 'wheelchair' | 'walkingStick' | 'other';
  name: string;
  settings?: Record<string, unknown>;
}

export interface AccessibilityData {
  id: string;
  location: Location;
  wheelchairAccessible: boolean;
  visualAids: boolean;
  audioSupport: boolean;
  cognitiveSupport: boolean;
  barriers: Barrier[];
  lastUpdated: Date;
  verifiedBy: string[];
  rating: number;
  matatu_accessible?: boolean;
  boda_accessible?: boolean;
  tuk_tuk_accessible?: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  name?: string;
  type: 'building' | 'matatu_stage' | 'boda_stage' | 'hospital' | 'school' | 'market' | 'government_office' | 'bank' | 'church' | 'mosque' | 'other';
  county: string;
  subcounty?: string;
  ward?: string;
  landmark?: string;
}

export interface Barrier {
  type: 'stairs' | 'narrow-path' | 'no-audio' | 'poor-lighting' | 'uneven-surface' | 'no-ramp' | 'high-counter' | 'no-signage' | 'language-barrier' | 'other';
  description: string;
  severity: 'low' | 'medium' | 'high';
  reportedBy: string;
  reportedAt: Date;
}

export interface Route {
  id: string;
  start: Location;
  end: Location;
  waypoints: Location[];
  accessibilityRating: number;
  estimatedTime: number;
  transportModes: TransportMode[];
  warnings: string[];
  alternatives: Route[];
  cost: number; // in KES
}

export interface TransportMode {
  type: 'walking' | 'wheelchair' | 'matatu' | 'boda_boda' | 'tuk_tuk' | 'taxi' | 'uber' | 'little_cab';
  accessible: boolean;
  duration: number;
  cost?: number; // in KES
  route?: string; // for matatu routes
}

export interface CommunityReport {
  id: string;
  location: Location;
  reportType: 'barrier' | 'improvement' | 'verification' | 'emergency' | 'transport_issue';
  description: string;
  images?: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'verified' | 'resolved' | 'dismissed';
  reportedBy: string;
  reportedAt: Date;
  upvotes: number;
  downvotes: number;
  county: string;
}

// Social Media Features - X-like functionality
export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorLocation: string;
  content: string;
  images?: string[];
  type: 'text' | 'accessibility-update' | 'question' | 'experience' | 'achievement' | 'event';
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  reposts: number;
  comments: number;
  views: number;
  likedBy: string[];
  repostedBy: string[];
  isRepost?: boolean;
  originalPostId?: string;
  originalAuthor?: string;
  hashtags: string[];
  mentions: string[];
  location?: {
    name: string;
    coordinates?: { lat: number; lng: number };
  };
  accessibility?: {
    rating: number;
    features: string[];
  };
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
  likedBy: string[];
  replies: PostReply[];
  parentCommentId?: string;
}

export interface PostReply {Let's implement the Life Empowerment Tools for Kenya section to make it fully functional. I'll create the necessary components for each tool: Employment Hub, Health & Wellness, Rights & Advocacy, Financial Tools, Smart Home, and Local Resources.

<boltArtifact id="implement-life-empowerment-tools" title="Implement Life Empowerment Tools for Kenya">