import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Radio, 
  Volume2, 
  VolumeX, 
  X, 
  Maximize2, 
  Sparkles,
  RotateCcw,
  FastForward,
  Minimize2
} from 'lucide-react';
import { PodcastEpisode, NewsArticle } from '../types';

interface LiveAudioPlayerProps {
  currentPodcast: PodcastEpisode | null;
  currentArticleAudio: NewsArticle | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const LiveAudioPlayer: React.FC<LiveAudioPlayerProps> = ({
  currentPodcast,
  currentArticleAudio,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(35);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Determine Title & Subtitle
  const isRadio = !currentPodcast && !currentArticleAudio;
  const title = currentPodcast
    ? currentPodcast.episodeTitle
    : currentArticleAudio
    ? `تقرير صوتي: ${currentArticleAudio.title}`
    : 'إذاعة بي بي سي العربية - البث الحي المباشر من لندن';

  const subtitle = currentPodcast
    ? `${currentPodcast.showTitle} • تقديم: ${currentPodcast.host}`
    : currentArticleAudio
    ? `بقلم: ${currentArticleAudio.author.name} • ${currentArticleAudio.audioDuration || '4 دقائق'}`
    : 'برنامج: عالم الصباح ونشرة أخبار الشرق الأوسط والعالم';

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 inset-x-0 bg-[#12151b] text-white border-t-2 border-[#bb1919] shadow-2xl z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Thumbnail & Show Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 sm:max-w-md">
          <div className="relative w-11 h-11 bg-[#1e2430] rounded-sm overflow-hidden shrink-0 border border-gray-700 flex items-center justify-center">
            {currentPodcast?.coverImage ? (
              <img src={currentPodcast.coverImage} alt="Show cover" className="w-full h-full object-cover" />
            ) : currentArticleAudio?.imageUrl ? (
              <img src={currentArticleAudio.imageUrl} alt="Article cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#bb1919] flex items-center justify-center">
                <Radio className="w-6 h-6 text-white" />
              </div>
            )}

            {/* Live Indicator on Thumbnail */}
            {isRadio && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#12151b] animate-ping"></span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="bg-[#bb1919] text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                {isRadio ? 'راديو مباشر' : currentPodcast ? 'بودكاست' : 'تقرير صوتي'}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-tight">
                {title}
              </h4>
            </div>
            <p className="text-[11px] text-gray-400 truncate mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Center: Playback Controls & Progress */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlaybackRate(rate => rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1)}
              className="text-[10px] font-mono text-gray-400 hover:text-white bg-[#222834] px-1.5 py-0.5 rounded border border-gray-700"
              title="سرعة التشغيل"
            >
              {playbackRate}x
            </button>

            <button
              onClick={onTogglePlay}
              className="w-10 h-10 rounded-full bg-[#bb1919] hover:bg-[#d81e1e] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            {/* Live Equalizer Animation */}
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-4 px-2">
                <span className="w-1 bg-[#bb1919] animate-equalizer-1 rounded"></span>
                <span className="w-1 bg-amber-400 animate-equalizer-2 rounded"></span>
                <span className="w-1 bg-red-400 animate-equalizer-3 rounded"></span>
                <span className="w-1 bg-white animate-equalizer-4 rounded"></span>
              </div>
            ) : (
              <div className="text-[10px] text-gray-500 font-mono">متوقف</div>
            )}
          </div>

          {!isRadio && (
            <div className="w-48 sm:w-64 bg-gray-700 h-1 rounded-full overflow-hidden cursor-pointer">
              <div className="bg-[#bb1919] h-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          )}
        </div>

        {/* Right: Volume & Close */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-gray-400">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-16 accent-[#bb1919] cursor-pointer"
            />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            title="إغلاق المشغل"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
