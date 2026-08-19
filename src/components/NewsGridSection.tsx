import React from 'react';
import { Clock, Bookmark, ChevronLeft } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsGridSectionProps {
  title: string;
  category: string;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onSelectCategory: (category: string) => void;
}

export const NewsGridSection: React.FC<NewsGridSectionProps> = ({
  title,
  category,
  articles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onSelectCategory,
}) => {
  if (articles.length === 0) return null;

  const leadStory = articles[0];
  const otherStories = articles.slice(1, 5);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Section Header with BBC-style thick red right border */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-6 bg-[#bb1919] inline-block"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>

        <button
          onClick={() => onSelectCategory(category)}
          className="text-xs font-bold text-gray-400 hover:text-white flex items-center gap-1 group transition-colors cursor-pointer"
        >
          <span>المزيد من {category}</span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid Layout: 1 Main Story (5 cols) + 4 Sub Stories (7 cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Large Feature Story (5 cols) */}
        {leadStory && (
          <div 
            onClick={() => onSelectArticle(leadStory)}
            className="md:col-span-6 lg:col-span-5 bg-[#141414] border border-white/5 hover:border-white/15 rounded-sm overflow-hidden group cursor-pointer hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={leadStory.imageUrl}
                  alt={leadStory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 bg-[#bb1919] text-white text-[11px] font-black px-2.5 py-0.5 shadow">
                  {leadStory.subcategory || leadStory.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#bb1919] transition-colors leading-snug mb-3">
                  {leadStory.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed mb-4">
                  {leadStory.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-300">{leadStory.author.name}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {leadStory.publishedAt}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(leadStory.id);
                }}
                className="p-1 hover:text-[#bb1919] text-gray-400"
                title="حفظ"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(leadStory.id) ? 'fill-[#bb1919] text-[#bb1919]' : ''}`} />
              </button>
            </div>
          </div>
        )}

        {/* Secondary Stories Grid (7 cols) */}
        <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherStories.map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectArticle(story)}
              className="bg-[#141414] border border-white/5 hover:border-white/15 p-4 rounded-sm group cursor-pointer hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden rounded-sm mb-3">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[11px] font-bold text-[#bb1919]">
                    {story.subcategory || story.category}
                  </span>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1 font-mono">
                    <Clock className="w-2.5 h-2.5" />
                    {story.publishedAt}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-[#bb1919] transition-colors line-clamp-2 mb-2">
                  {story.title}
                </h4>

                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-2">
                  {story.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span className="truncate text-gray-400">{story.author.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(story.id);
                  }}
                  className="p-1 hover:text-[#bb1919] text-gray-400 shrink-0"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(story.id) ? 'fill-[#bb1919] text-[#bb1919]' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
