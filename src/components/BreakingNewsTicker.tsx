import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Flame } from 'lucide-react';
import { BREAKING_NEWS_ITEMS } from '../data/newsData';

interface BreakingNewsTickerProps {
  onSelectArticleById: (id: string) => void;
  onOpenLiveCoverage: () => void;
}

export const BreakingNewsTicker: React.FC<BreakingNewsTickerProps> = ({
  onSelectArticleById,
  onOpenLiveCoverage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = BREAKING_NEWS_ITEMS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BREAKING_NEWS_ITEMS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BREAKING_NEWS_ITEMS.length) % BREAKING_NEWS_ITEMS.length);
  };

  return (
    <div className="w-full bg-[#111111] text-white border-b border-white/10 shadow-lg z-30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
        
        {/* Flash 'عاجل' Badge */}
        <div className="bg-[#bb1919] flex items-center gap-2 px-5 py-2.5 font-bold text-xs sm:text-sm tracking-wide shrink-0 shadow-[10px_0_15px_rgba(0,0,0,0.5)] z-10">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span className="font-black uppercase tracking-wider">عاجل</span>
        </div>

        {/* Time Stamp */}
        <span className="text-[11px] text-gray-400 hidden md:inline-block font-mono px-3 shrink-0">
          {currentItem.time}
        </span>

        {/* Ticker Headline Content */}
        <div 
          onClick={() => {
            if (currentItem.articleId) {
              onSelectArticleById(currentItem.articleId);
            } else {
              onOpenLiveCoverage();
            }
          }}
          className="flex-1 min-w-0 cursor-pointer group flex items-center gap-3 overflow-hidden px-3 py-2"
        >
          <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white group-hover:underline truncate transition-all">
            {currentItem.headline}
          </span>
          <span className="hidden sm:inline-block text-[10px] bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-2.5 py-0.5 font-bold rounded-sm shrink-0 transition-colors">
            اقرأ التفاصيل
          </span>
        </div>

        {/* Controls: Prev/Next & Sound Mute Toggle */}
        <div className="flex items-center gap-1.5 shrink-0 px-4 text-gray-400">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
            title={isMuted ? 'تفعيل تنبيهات الصوت للأخبار العاجلة' : 'كتم التنبيهات الصوتية'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
          </button>

          <button
            onClick={handlePrev}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
            title="الخبر السابق"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-[10px] font-mono text-gray-500 px-1">
            {currentIndex + 1}/{BREAKING_NEWS_ITEMS.length}
          </span>

          <button
            onClick={handleNext}
            className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
            title="الخبر التالي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

