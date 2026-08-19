import React, { useState } from 'react';
import { 
  X, 
  Tv, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Clock, 
  Radio,
  Flame,
  Globe,
  Sparkles
} from 'lucide-react';

interface LiveTVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTVModal: React.FC<LiveTVModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<'arabic' | 'world'>('arabic');

  if (!isOpen) return null;

  const SCHEDULE = [
    { time: '14:00 GMT', title: 'نشرة أخبار الشرق الأوسط والعالم الرئيسية', anchor: 'منى الشاذلي' },
    { time: '15:00 GMT', title: 'برنامج بلا قيود: حوار مع وزير الشؤون الخارجية', anchor: 'سمير فرح' },
    { time: '16:00 GMT', title: 'بي بي سي إكسترا: ملف الطاقة المتجددة والمناخ', anchor: 'طارق العبدلي' },
    { time: '17:00 GMT', title: 'الحصاد الاقتصادي وأسواق المال العالمية', anchor: 'سارة المهدي' },
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#12161f] text-white w-full max-w-5xl rounded-sm border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-[#1a202c] p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-black text-base bg-[#bb1919] px-2 py-0.5 text-white">
              <span>B</span>
              <span>B</span>
              <span>C</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">
                  البث الحي لتلفزيون بي بي سي عربي (BBC Arabic TV)
                </h3>
                <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  LIVE ON AIR
                </span>
              </div>
              <span className="text-xs text-gray-400">
                استوديو الأخبار الرئيسي - البث الفضائي والرقمي المباشر من لندن
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Simulation */}
        <div className="relative aspect-[16/9] bg-black overflow-hidden flex items-center justify-center">
          
          {/* Simulated Broadcast Feed */}
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
          />

          {/* On-Screen TV Graphics Overlay */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
            
            {/* Top Graphics */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  BBC ARABIC • مباشر
                </span>
              </div>

              <div className="text-xs font-mono bg-black/60 px-2 py-1 rounded text-gray-300">
                HD 1080p • 50 FPS
              </div>
            </div>

            {/* Bottom Breaking Lower Third */}
            <div className="bg-[#bb1919] text-white p-2.5 rounded-sm shadow-xl flex items-center justify-between border-t-2 border-amber-400">
              <div className="flex items-center gap-2">
                <span className="bg-black text-amber-300 text-[10px] font-black px-2 py-0.5 uppercase">
                  عاجل
                </span>
                <span className="text-xs sm:text-sm font-bold truncate">
                  مجلس الأمن يناقش آليات تثبيت الهدنة الإنسانية واستئناف قوافل الإغاثة الدولية
                </span>
              </div>
              <span className="text-[11px] font-mono text-white/80 shrink-0 hidden sm:inline">
                14:28 GMT
              </span>
            </div>

          </div>

          {/* Control Bar Overlay on Hover */}
          <div className="absolute bottom-16 right-4 left-4 bg-black/70 backdrop-blur-md p-2 rounded flex items-center justify-between text-xs text-white opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsPlaying(!isPlaying)} className="p-1 hover:text-red-400">
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button onClick={() => setIsMuted(!isMuted)} className="p-1 hover:text-red-400">
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="font-mono text-[11px]">البث المباشر</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">● جودة البث ممتازة</span>
            </div>
          </div>

        </div>

        {/* Program Guide / Schedule */}
        <div className="p-4 bg-[#161b24] border-t border-gray-800 overflow-y-auto">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>جدول برامج اليوم على تلفزيون بي بي سي عربي</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SCHEDULE.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded border text-xs ${
                  idx === 0
                    ? 'bg-[#222a38] border-[#bb1919] text-white'
                    : 'bg-[#1a202c] border-gray-800 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                  <span className={idx === 0 ? 'text-[#bb1919] font-bold' : 'text-gray-400'}>{item.time}</span>
                  {idx === 0 && <span className="text-amber-400 font-bold">يُعرض الآن</span>}
                </div>
                <div className="font-bold text-white leading-snug mb-1">{item.title}</div>
                <div className="text-[11px] text-gray-400">تقديم: {item.anchor}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
