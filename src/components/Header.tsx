import React, { useState } from 'react';
import { 
  Radio, 
  Tv, 
  Bookmark, 
  Search, 
  Sparkles, 
  Moon, 
  Sun, 
  Type, 
  Volume2, 
  X, 
  Globe, 
  TrendingUp, 
  CloudSun,
  Menu,
  Bell,
  Clock
} from 'lucide-react';
import { WEATHER_DATA, MARKET_DATA } from '../data/newsData';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenLiveRadio: () => void;
  onOpenLiveTV: () => void;
  onOpenBookmarks: () => void;
  onOpenAIAssistant: () => void;
  bookmarksCount: number;
  isRadioPlaying: boolean;
  theme: 'light' | 'dark' | 'sepia';
  onToggleTheme: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectArticleById: (id: string) => void;
  allArticles: any[];
}

const CATEGORIES = [
  'الرئيسية',
  'عاجل وتغطية حية',
  'الشرق الأوسط',
  'العالم',
  'اقتصاد وأعمال',
  'علوم وتكنولوجيا',
  'صحة',
  'رياضة',
  'ثقافة وفنون',
  'بودكاست وفيديو',
  'تحقيقات'
];

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenLiveRadio,
  onOpenLiveTV,
  onOpenBookmarks,
  onOpenAIAssistant,
  bookmarksCount,
  isRadioPlaying,
  theme,
  onToggleTheme,
  fontSize,
  onChangeFontSize,
  searchQuery,
  onSearchChange,
  onSelectArticleById,
  allArticles
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedWeatherIdx, setSelectedWeatherIdx] = useState(0);

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? allArticles.filter(art => 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const nextWeather = () => {
    setSelectedWeatherIdx((prev) => (prev + 1) % WEATHER_DATA.length);
  };

  const weather = WEATHER_DATA[selectedWeatherIdx];

  return (
    <header className="w-full bg-[#121212] text-white select-none border-b border-[#2a2a2a] shadow-md z-40 sticky top-0">
      {/* 1. Top Utility & Markets/Weather Bar */}
      <div className="bg-[#1e1e1e] border-b border-[#2c2c2c] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left / Date & Live Weather */}
          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#bb1919]" />
              <span>الأربعاء 19 أغسطس 2026</span>
            </div>

            {/* Weather Widget Button */}
            <button 
              onClick={nextWeather}
              title="انقر لتغيير العاصمة"
              className="flex items-center gap-1.5 bg-[#2a2a2a] hover:bg-[#333] px-2 py-0.5 rounded text-gray-200 transition-colors cursor-pointer border border-[#3a3a3a]"
            >
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">{weather.city}:</span>
              <span>{weather.temp}°م</span>
              <span className="text-gray-400 text-[10px]">({weather.condition})</span>
            </button>

            {/* Market Ticker Item */}
            <div className="hidden lg:flex items-center gap-2 border-r border-gray-700 pr-3 mr-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-gray-300 font-medium">برنت:</span>
              <span className="text-white font-bold">$81.75</span>
              <span className="text-emerald-400 font-mono text-[11px]">+0.65%</span>
            </div>
          </div>

          {/* Right / Live Broadcasting & Settings Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Radio Button */}
            <button
              onClick={onOpenLiveRadio}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-all ${
                isRadioPlaying
                  ? 'bg-[#bb1919] text-white shadow-sm ring-2 ring-red-400/40 animate-pulse'
                  : 'bg-[#2b2b2b] text-gray-200 hover:bg-[#3b3b3b] hover:text-white border border-[#3f3f3f]'
              }`}
              title="استمع إلى راديو بي بي سي عربي المباشر"
            >
              <Radio className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">راديو بي بي سي</span>
              <span className="sm:hidden">الراديو</span>
              {isRadioPlaying && (
                <span className="flex items-center gap-0.5 h-2">
                  <span className="w-0.5 h-2 bg-white animate-equalizer-1 rounded"></span>
                  <span className="w-0.5 h-2.5 bg-white animate-equalizer-2 rounded"></span>
                  <span className="w-0.5 h-1.5 bg-white animate-equalizer-3 rounded"></span>
                </span>
              )}
            </button>

            {/* Live TV Button */}
            <button
              onClick={onOpenLiveTV}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2b2b2b] text-gray-200 hover:bg-[#bb1919] hover:text-white transition-colors border border-[#3f3f3f] font-medium"
              title="شاهد البث الحي لتلفزيون بي بي سي عربي"
            >
              <Tv className="w-3.5 h-3.5 text-red-400 group-hover:text-white" />
              <span className="hidden sm:inline">البث التلفزيوني</span>
              <span className="sm:hidden">مباشر</span>
            </button>

            {/* AI News Assistant button */}
            <button
              onClick={onOpenAIAssistant}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gradient-to-r from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 text-red-200 hover:text-white border border-red-700/60 font-semibold transition-all shadow-sm"
              title="المحرر الذكي لبي بي سي - اسأل الذكاء الاصطناعي عن الأخبار"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>المحرر الذكي</span>
            </button>

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-1.5 text-gray-300 hover:text-white hover:bg-[#333] rounded transition-colors"
              title="الأخبار المحفوظة للقراءة لاحقاً"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#bb1919] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {bookmarksCount}
                </span>
              )}
            </button>

            {/* Text size selector */}
            <div className="hidden md:flex items-center bg-[#2b2b2b] rounded border border-[#3f3f3f] overflow-hidden">
              <button
                onClick={() => onChangeFontSize('normal')}
                className={`px-2 py-0.5 text-[11px] font-bold ${fontSize === 'normal' ? 'bg-[#bb1919] text-white' : 'text-gray-300 hover:text-white'}`}
                title="حجم خط عادي"
              >
                A
              </button>
              <button
                onClick={() => onChangeFontSize('large')}
                className={`px-2 py-0.5 text-[12px] font-bold border-r border-l border-[#3a3a3a] ${fontSize === 'large' ? 'bg-[#bb1919] text-white' : 'text-gray-300 hover:text-white'}`}
                title="حجم خط كبير"
              >
                A+
              </button>
              <button
                onClick={() => onChangeFontSize('xlarge')}
                className={`px-2 py-0.5 text-[13px] font-bold ${fontSize === 'xlarge' ? 'bg-[#bb1919] text-white' : 'text-gray-300 hover:text-white'}`}
                title="حجم خط كبير جداً"
              >
                A++
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 text-gray-300 hover:text-white hover:bg-[#333] rounded transition-colors"
              title={theme === 'dark' ? 'التحويل للوضع النهاري' : 'التحويل للوضع الليلي'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Iconic BBC Header in Sophisticated Dark Red */}
      <div className="bg-[#bb1919] text-white px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-lg z-40">
        
        <div className="flex items-center gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-white/90 hover:text-white hover:bg-black/20 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* BBC Logo & Title with white block badges */}
          <div 
            onClick={() => onSelectCategory('الرئيسية')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Iconic 3 BBC White blocks with Red Text */}
            <div className="flex items-center gap-1 font-black text-xl sm:text-2xl tracking-tighter">
              <span className="w-8 h-8 sm:w-8.5 sm:h-8.5 bg-white text-[#bb1919] flex items-center justify-center font-serif font-black shadow-sm group-hover:scale-105 transition-transform">
                B
              </span>
              <span className="w-8 h-8 sm:w-8.5 sm:h-8.5 bg-white text-[#bb1919] flex items-center justify-center font-serif font-black shadow-sm group-hover:scale-105 transition-transform">
                B
              </span>
              <span className="w-8 h-8 sm:w-8.5 sm:h-8.5 bg-white text-[#bb1919] flex items-center justify-center font-serif font-black shadow-sm group-hover:scale-105 transition-transform">
                C
              </span>
            </div>

            <div className="w-px h-6 bg-white/40 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-white font-['Cairo']">
                عربي
              </span>
              <span className="hidden md:inline-block bg-black/30 text-white/90 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded">
                الأخبار الموثوقة
              </span>
            </div>
          </div>
        </div>

        {/* Center Search Bar in Header */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث في تغطيات وتقارير بي بي سي عربي..."
              className="w-full bg-black/20 text-white placeholder-white/70 text-xs sm:text-sm rounded-sm border border-white/20 focus:border-white focus:bg-black/35 focus:outline-none py-2 pr-10 pl-8 transition-colors"
            />
            <Search className="w-4 h-4 text-white/70 absolute right-3 pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute left-2 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Search Dropdown Preview */}
          {searchQuery.trim().length > 0 && (
            <div className="absolute top-full right-0 left-0 mt-1 bg-[#1a1a1a] border border-[#3a3a3a] shadow-2xl z-50 rounded-b-md overflow-hidden text-gray-200">
              <div className="p-2 bg-[#252525] text-xs text-gray-400 flex items-center justify-between border-b border-[#333]">
                <span>نتائج البحث عن: "{searchQuery}"</span>
                <span>{searchResults.length} نتيجة</span>
              </div>
              {searchResults.length > 0 ? (
                <div className="divide-y divide-[#2a2a2a]">
                  {searchResults.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => {
                        onSelectArticleById(article.id);
                        onSearchChange('');
                      }}
                      className="p-3 hover:bg-[#2c2c2c] cursor-pointer transition-colors flex items-start gap-3"
                    >
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-12 h-12 object-cover rounded shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#bb1919] font-bold block mb-0.5">{article.category}</span>
                        <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug">{article.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-gray-400">
                  لم يتم العثور على نتائج مطابقة لـ "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action: Live Badge & Search Toggle for Mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-white/90 hover:text-white hover:bg-black/20 rounded"
          >
            <Search className="w-5 h-5" />
          </button>

          <div 
            onClick={() => onSelectCategory('عاجل وتغطية حية')}
            className="flex items-center gap-2 bg-black/30 hover:bg-black/50 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all border border-white/20 rounded-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-bbc-pulse"></span>
            <span>تغطية حية</span>
          </div>
        </div>
      </div>

      {/* Mobile Search input overlay */}
      {isSearchOpen && (
        <div className="p-3 bg-[#1e1e1e] border-t border-[#333] md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث في الأخبار والتقارير..."
              className="w-full bg-[#2a2a2a] text-white placeholder-gray-400 text-sm rounded border border-[#444] py-2 pr-9 pl-4"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3" />
          </div>
        </div>
      )}

      {/* 3. Category Navigation Bar (Sophisticated Dark Sub-Navigation) */}
      <nav className="bg-[#1a1a1a] border-b border-white/10 px-4 sm:px-8 h-12 flex gap-6 sm:gap-8 items-center text-[14px] sm:text-[15px] shrink-0 font-medium overflow-x-auto no-scrollbar shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center gap-6 sm:gap-8 whitespace-nowrap">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setIsMobileMenuOpen(false);
                }}
                className={`py-1 shrink-0 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  isActive 
                    ? 'text-white border-b-2 border-white font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat === 'عاجل وتغطية حية' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                )}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-black/80 backdrop-blur-sm z-50 flex flex-col">
          <div className="bg-[#1a1a1a] p-4 max-h-[80vh] overflow-y-auto divide-y divide-[#333] border-b border-[#444]">
            <div className="py-2 text-xs font-bold text-gray-400 uppercase">الأقسام الإخبارية</div>
            <div className="grid grid-cols-2 gap-2 py-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-right p-2.5 rounded font-medium text-sm ${
                    currentCategory === cat ? 'bg-[#bb1919] text-white' : 'text-gray-200 hover:bg-[#282828]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="py-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenLiveRadio();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 bg-[#252525] rounded text-white text-sm font-medium"
              >
                <Radio className="w-4 h-4 text-red-500" />
                <span>راديو بي بي سي عربي المباشر</span>
              </button>
              <button
                onClick={() => {
                  onOpenLiveTV();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 bg-[#252525] rounded text-white text-sm font-medium"
              >
                <Tv className="w-4 h-4 text-red-500" />
                <span>البث التلفزيوني الحي</span>
              </button>
              <button
                onClick={() => {
                  onOpenAIAssistant();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2.5 bg-red-950/80 border border-red-800 rounded text-red-200 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>المحرر الذكي لبي بي سي عربي</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
