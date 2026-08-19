import React from 'react';
import { 
  Clock, 
  Bookmark, 
  Share2, 
  Volume2, 
  Sparkles, 
  Flame, 
  ChevronLeft, 
  Play, 
  TrendingUp,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { NewsArticle } from '../types';

interface HeroLeadSectionProps {
  heroArticle: NewsArticle;
  leadArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onPlayArticleAudio: (article: NewsArticle) => void;
  onOpenLiveCoverage: () => void;
  onOpenAIAssistant: (story?: NewsArticle) => void;
}

export const HeroLeadSection: React.FC<HeroLeadSectionProps> = ({
  heroArticle,
  leadArticles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onPlayArticleAudio,
  onOpenLiveCoverage,
  onOpenAIAssistant
}) => {
  if (!heroArticle) return null;

  const secondaryStories = leadArticles.slice(0, 2);
  const mostReadStories = leadArticles.slice(0, 4);

  const arabicNumbers = ['١', '٢', '٣', '٤'];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Main Grid: 8 cols for Hero & Secondary / 4 cols for Aside (Most Read) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Column: Hero Feature + 2 Sub-Features (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Hero Main Feature Card */}
          <div 
            onClick={() => onSelectArticle(heroArticle)}
            className="relative min-h-[440px] sm:min-h-[480px] group cursor-pointer bg-neutral-950 rounded-sm overflow-hidden border border-white/10 shadow-2xl flex flex-col justify-end"
          >
            {/* Background Editorial Image with subtle zoom */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={heroArticle.imageUrl}
                alt={heroArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-85"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
            </div>

            {/* Badges Top Right */}
            <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
              <span className="bg-[#bb1919] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                مباشر
              </span>
              <span className="bg-black/60 backdrop-blur-md text-white/90 text-xs font-bold px-2.5 py-1 border border-white/10">
                {heroArticle.category}
              </span>
            </div>

            {/* AI Assistant Button Top Left */}
            <div className="absolute top-6 left-6 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAIAssistant(heroArticle);
                }}
                className="bg-black/70 hover:bg-[#bb1919] backdrop-blur-md text-amber-300 hover:text-white px-3 py-1 text-xs font-bold flex items-center gap-1.5 border border-white/10 transition-colors shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">تحليل الذكاء الاصطناعي</span>
              </button>
            </div>

            {/* Hero Content Overlay at bottom */}
            <div className="relative p-6 sm:p-10 z-20 w-full">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4 group-hover:underline">
                {heroArticle.title}
              </h1>

              <p className="text-gray-300 text-sm sm:text-lg leading-relaxed line-clamp-2 max-w-3xl mb-4 font-normal">
                {heroArticle.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 pt-3 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-gray-200 font-semibold">{heroArticle.author.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {heroArticle.publishedAt}
                  </span>
                  <span>•</span>
                  <span>{heroArticle.readTimeMinutes} دقائق قراءة</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayArticleAudio(heroArticle);
                    }}
                    className="flex items-center gap-1 bg-white/10 hover:bg-[#bb1919] text-white px-2.5 py-1 rounded text-xs transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استمع</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(heroArticle.id);
                    }}
                    className="p-1 text-gray-300 hover:text-white"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked(heroArticle.id) ? 'fill-[#bb1919] text-[#bb1919]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Secondary 2-Column Stories Grid under Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {secondaryStories.map((article) => (
              <div 
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="flex flex-col gap-2 group cursor-pointer bg-[#141414] p-4 rounded-sm border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="h-44 bg-neutral-800 rounded-sm mb-2 overflow-hidden relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 right-2 bg-[#bb1919] text-white text-[10px] font-bold px-2 py-0.5">
                    {article.category}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg group-hover:text-[#bb1919] transition-colors leading-snug text-white line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-white/5">
                  <span className="font-mono">{article.publishedAt}</span>
                  <span className="text-gray-400">{article.author.name}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Aside Column: "الأكثر قراءة" (Most Read in Sophisticated Dark BBC Style) */}
        <aside className="lg:col-span-4 flex flex-col gap-6 bg-[#141414] p-6 rounded-sm border border-white/5 shadow-xl">
          
          <div className="border-r-4 border-[#bb1919] pr-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              الأكثر قراءة
            </h2>
            <span className="text-xs text-gray-500">متابعات الساعة على مدار اليوم</span>
          </div>

          <div className="space-y-6">
            {mostReadStories.map((story, idx) => (
              <div 
                key={story.id}
                onClick={() => onSelectArticle(story)}
                className={`flex gap-5 group cursor-pointer ${
                  idx > 0 ? 'border-t border-white/5 pt-6' : ''
                }`}
              >
                <span className="text-4xl font-serif text-[#bb1919] font-black italic opacity-60 w-10 shrink-0 select-none">
                  {arabicNumbers[idx] || (idx + 1)}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-bold text-base sm:text-lg leading-snug group-hover:underline text-gray-100 group-hover:text-white line-clamp-2 transition-colors">
                    {story.title}
                  </h4>
                  <span className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="text-gray-400 font-semibold">{story.category}</span>
                    <span>•</span>
                    <span className="font-mono">{story.publishedAt}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Newsletter Box in Aside */}
          <div className="mt-4 pt-6 border-t border-white/10 bg-[#1a1a1a] p-4 rounded-sm">
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#bb1919]" />
              <span>نشرة بي بي سي العاجلة عبر واتساب وتليغرام</span>
            </h4>
            <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
              اشترك في القناة الرسمية لتلقي التنبيهات المباشرة فور وقوع الحدث.
            </p>
            <button 
              onClick={onOpenLiveCoverage}
              className="w-full bg-[#bb1919] hover:bg-[#990000] text-white text-xs font-bold py-2 rounded-sm transition-colors text-center shadow"
            >
              الانضمام للموجز الإخباري المباشر
            </button>
          </div>

        </aside>

      </div>

    </section>
  );
};
