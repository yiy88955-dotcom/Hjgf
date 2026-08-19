import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { HeroLeadSection } from './components/HeroLeadSection';
import { NewsGridSection } from './components/NewsGridSection';
import { VideoPodcastSection } from './components/VideoPodcastSection';
import { FactCheckSection } from './components/FactCheckSection';
import { InteractivePoll } from './components/InteractivePoll';
import { LiveCoverageTimeline } from './components/LiveCoverageTimeline';
import { ArticleModal } from './components/ArticleModal';
import { AINewsAssistantModal } from './components/AINewsAssistantModal';
import { LiveTVModal } from './components/LiveTVModal';
import { LiveAudioPlayer } from './components/LiveAudioPlayer';
import { VideoModal } from './components/VideoModal';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { Footer } from './components/Footer';
import { ARTICLES_DATA, PODCAST_DATA, VIDEO_STORIES } from './data/newsData';
import { NewsArticle, PodcastEpisode, VideoStory } from './types';
import { Radio, Sparkles, Tv, Flame } from 'lucide-react';

export default function App() {
  // Navigation & Category
  const [currentCategory, setCurrentCategory] = useState<string>('الرئيسية');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers State
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLiveCoverageOpen, setIsLiveCoverageOpen] = useState(false);
  const [isLiveTVOpen, setIsLiveTVOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiAssistantContextStory, setAiAssistantContextStory] = useState<NewsArticle | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoStory | null>(null);

  // Audio Player State
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<PodcastEpisode | null>(null);
  const [currentArticleAudio, setCurrentArticleAudio] = useState<NewsArticle | null>(null);

  // User Preferences - Sophisticated Dark by default
  const [theme, setTheme] = useState<'dark' | 'light' | 'sepia'>('dark');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bbc_saved_bookmarks');
      return saved ? JSON.parse(saved) : ['art-1', 'art-4'];
    } catch {
      return ['art-1', 'art-4'];
    }
  });

  // Save Bookmarks to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('bbc_saved_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  // Handle Theme switching
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('sepia');
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#ffffff';
    } else if (theme === 'sepia') {
      root.classList.remove('dark');
      root.classList.add('sepia');
      document.body.style.backgroundColor = '#fbf0d9';
      document.body.style.color = '#5f4b32';
    } else {
      root.classList.remove('dark');
      root.classList.remove('sepia');
      document.body.style.backgroundColor = '#f6f6f6';
      document.body.style.color = '#141414';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : prev === 'light' ? 'sepia' : 'dark'));
  };

  const toggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const isBookmarked = (articleId: string) => bookmarkedIds.includes(articleId);

  const clearAllBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Audio Playback Triggers
  const handleOpenLiveRadio = () => {
    setCurrentPodcast(null);
    setCurrentArticleAudio(null);
    setIsAudioPlayerVisible(true);
    setIsRadioPlaying(true);
  };

  const handlePlayPodcast = (podcast: PodcastEpisode) => {
    setCurrentPodcast(podcast);
    setCurrentArticleAudio(null);
    setIsAudioPlayerVisible(true);
    setIsRadioPlaying(true);
  };

  const handlePlayArticleAudio = (article: NewsArticle) => {
    setCurrentPodcast(null);
    setCurrentArticleAudio(article);
    setIsAudioPlayerVisible(true);
    setIsRadioPlaying(true);
  };

  const handleTogglePlayAudio = () => {
    setIsRadioPlaying(!isRadioPlaying);
  };

  // AI Assistant Triggers
  const handleOpenAIAssistant = (story?: NewsArticle) => {
    setAiAssistantContextStory(story || null);
    setIsAIAssistantOpen(true);
  };

  const handleSelectArticleById = (id: string) => {
    const found = ARTICLES_DATA.find((a) => a.id === id);
    if (found) {
      if (found.isLive) {
        setIsLiveCoverageOpen(true);
      } else {
        setSelectedArticle(found);
      }
    }
  };

  // Filtered Articles based on Category or Search
  const filteredArticles = useMemo(() => {
    let list = ARTICLES_DATA;
    if (currentCategory === 'عاجل وتغطية حية') {
      list = list.filter((a) => a.isLive || a.isBreaking || a.category === 'عاجل');
    } else if (currentCategory !== 'الرئيسية') {
      list = list.filter((a) => a.category === currentCategory || a.subcategory?.includes(currentCategory));
    }
    return list;
  }, [currentCategory]);

  const heroArticle = ARTICLES_DATA.find((a) => a.isHero) || ARTICLES_DATA[0];
  const leadArticles = ARTICLES_DATA.filter((a) => a.id !== heroArticle.id).slice(0, 3);
  const middleEastArticles = ARTICLES_DATA.filter((a) => a.category === 'الشرق الأوسط' && a.id !== heroArticle.id);
  const worldArticles = ARTICLES_DATA.filter((a) => a.category === 'العالم' && a.id !== heroArticle.id);
  const techArticles = ARTICLES_DATA.filter((a) => a.category === 'علوم وتكنولوجيا');
  const economyArticles = ARTICLES_DATA.filter((a) => a.category === 'اقتصاد وأعمال');
  const sportsArticles = ARTICLES_DATA.filter((a) => a.category === 'رياضة');
  const healthArticles = ARTICLES_DATA.filter((a) => a.category === 'صحة');
  const cultureArticles = ARTICLES_DATA.filter((a) => a.category === 'ثقافة وفنون');

  const savedArticlesList = ARTICLES_DATA.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen flex flex-col font-['Cairo',sans-serif]">
      {/* 1. BBC Navigation Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          if (cat === 'عاجل وتغطية حية') {
            setIsLiveCoverageOpen(true);
          } else {
            setIsLiveCoverageOpen(false);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLiveRadio={handleOpenLiveRadio}
        onOpenLiveTV={() => setIsLiveTVOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAIAssistant={() => handleOpenAIAssistant()}
        bookmarksCount={bookmarkedIds.length}
        isRadioPlaying={isRadioPlaying}
        theme={theme}
        onToggleTheme={toggleTheme}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectArticleById={handleSelectArticleById}
        allArticles={ARTICLES_DATA}
      />

      {/* 2. Red Alert Breaking News Ticker */}
      <BreakingNewsTicker
        onSelectArticleById={handleSelectArticleById}
        onOpenLiveCoverage={() => setIsLiveCoverageOpen(true)}
      />

      {/* 3. Main Content Views */}
      <main className="flex-1 w-full pb-16">
        {isLiveCoverageOpen ? (
          /* Live Coverage Full Timeline Page */
          <LiveCoverageTimeline
            article={heroArticle}
            onBackToHome={() => setIsLiveCoverageOpen(false)}
            onSelectArticle={setSelectedArticle}
            onOpenAIAssistant={handleOpenAIAssistant}
          />
        ) : currentCategory === 'الرئيسية' ? (
          /* Home Feed Layout */
          <>
            {/* Hero Main Feature Section */}
            <HeroLeadSection
              heroArticle={heroArticle}
              leadArticles={leadArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onPlayArticleAudio={handlePlayArticleAudio}
              onOpenLiveCoverage={() => setIsLiveCoverageOpen(true)}
              onOpenAIAssistant={handleOpenAIAssistant}
            />

            {/* Middle East Categorized News */}
            <NewsGridSection
              title="أخبار الشرق الأوسط والعالم العربي"
              category="الشرق الأوسط"
              articles={middleEastArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onSelectCategory={setCurrentCategory}
            />

            {/* Multimedia Video & Podcast Section */}
            <VideoPodcastSection
              onPlayPodcast={handlePlayPodcast}
              onOpenVideoModal={setSelectedVideo}
            />

            {/* BBC Verify / Fact Checking Module */}
            <FactCheckSection onOpenAIAssistant={handleOpenAIAssistant} />

            {/* World News & Science & Tech */}
            <NewsGridSection
              title="العلوم والتكنولوجيا والذكاء الاصطناعي"
              category="علوم وتكنولوجيا"
              articles={techArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onSelectCategory={setCurrentCategory}
            />

            <NewsGridSection
              title="الاقتصاد والأسواق العالمية"
              category="اقتصاد وأعمال"
              articles={economyArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onSelectCategory={setCurrentCategory}
            />

            {/* Daily Interactive Poll */}
            <InteractivePoll />

            {/* Sports & Health & Culture */}
            <NewsGridSection
              title="الصحة والطب الوقائي"
              category="صحة"
              articles={healthArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onSelectCategory={setCurrentCategory}
            />

            <NewsGridSection
              title="الرياضة وكرة القدم العالمية"
              category="رياضة"
              articles={sportsArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onSelectCategory={setCurrentCategory}
            />

            <NewsGridSection
              title="الثقافة والفنون والتراث"
              category="ثقافة وفنون"
              articles={cultureArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onSelectCategory={setCurrentCategory}
            />
          </>
        ) : (
          /* Categorical Page View */
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 border-b-2 border-gray-900 dark:border-gray-700 pb-3 mb-8">
              <span className="w-3 h-8 bg-[#bb1919] inline-block"></span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                  أخبار {currentCategory}
                </h1>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  تغطيات شاملة، تقارير وتحليلات معمقة من مراسلي بي بي سي
                </span>
              </div>
            </div>

            <NewsGridSection
              title={`أحدث تقارير ${currentCategory}`}
              category={currentCategory}
              articles={filteredArticles}
              onSelectArticle={setSelectedArticle}
              onToggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              onSelectCategory={setCurrentCategory}
            />
          </div>
        )}
      </main>

      {/* 4. Sticky Live Radio / Podcast Audio Player */}
      {isAudioPlayerVisible && (
        <LiveAudioPlayer
          currentPodcast={currentPodcast}
          currentArticleAudio={currentArticleAudio}
          isPlaying={isRadioPlaying}
          onTogglePlay={handleTogglePlayAudio}
          onClose={() => {
            setIsAudioPlayerVisible(false);
            setIsRadioPlaying(false);
          }}
        />
      )}

      {/* 5. Modals */}
      {/* Full Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleBookmark={toggleBookmark}
        isBookmarked={isBookmarked}
        onOpenAIAssistant={handleOpenAIAssistant}
        onSelectArticle={setSelectedArticle}
        allArticles={ARTICLES_DATA}
      />

      {/* AI Smart Journalist Assistant Modal */}
      <AINewsAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => {
          setIsAIAssistantOpen(false);
          setAiAssistantContextStory(null);
        }}
        currentStory={aiAssistantContextStory}
      />

      {/* Live TV Broadcast Stream Modal */}
      <LiveTVModal isOpen={isLiveTVOpen} onClose={() => setIsLiveTVOpen(false)} />

      {/* Video Story Modal */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />

      {/* Saved Bookmarks Drawer */}
      <SavedArticlesDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={setSelectedArticle}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearAllBookmarks}
      />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}

