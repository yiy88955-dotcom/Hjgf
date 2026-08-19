export interface NewsArticle {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string[];
  category: 'عاجل' | 'الشرق الأوسط' | 'العالم' | 'اقتصاد وأعمال' | 'علوم وتكنولوجيا' | 'رياضة' | 'صحة' | 'ثقافة وفنون' | 'تحقيقات';
  subcategory?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    location?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageCaption: string;
  imageCredit: string;
  isBreaking?: boolean;
  isLive?: boolean;
  isHero?: boolean;
  isLead?: boolean;
  isMustRead?: boolean;
  liveUpdates?: LiveUpdateItem[];
  keyPoints?: string[];
  tags: string[];
  relatedIds?: string[];
  commentsCount: number;
  audioDuration?: string;
  audioUrl?: string;
  videoDuration?: string;
  videoUrl?: string;
  factCheck?: {
    claim: string;
    verdict: string;
    verdictCode: string;
    summary: string;
  };
}

export interface LiveUpdateItem {
  id: string;
  time: string;
  title: string;
  content: string;
  author?: string;
  location?: string;
  type: 'alert' | 'update' | 'quote' | 'media' | 'stat' | string;
  badge?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'audio';
  keyTakeaway?: boolean;
}

export interface PodcastEpisode {
  id: string;
  showTitle: string;
  episodeTitle: string;
  description: string;
  duration: string;
  publishedAt: string;
  host: string;
  coverImage: string;
  audioUrl: string;
  category: string;
}

export interface VideoStory {
  id: string;
  title: string;
  duration: string;
  category: string;
  publishedAt: string;
  views: string;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
  reporter: string;
}

export interface FactCheckItem {
  id: string;
  claim: string;
  sourceClaim: string;
  verdict: string;
  verdictType: string;
  explanation: string;
  date: string;
  category: string;
  imageUrl: string;
  evidence: string[];
}

export interface MarketItem {
  symbol: string;
  name: string;
  value: string;
  change: string;
  isUp: boolean;
}

export interface WeatherItem {
  city: string;
  country: string;
  temp: number;
  condition: string;
  icon: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  question: string;
  description: string;
  category: string;
  endDate: string;
  totalVotes: number;
  options: PollOption[];
  userVotedId?: string;
}

export interface UserComment {
  id: string;
  articleId: string;
  author: string;
  location: string;
  date: string;
  content: string;
  likes: number;
  liked?: boolean;
}
