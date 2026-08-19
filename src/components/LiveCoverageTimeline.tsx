import React, { useState } from 'react';
import { 
  Radio, 
  Clock, 
  RefreshCw, 
  Share2, 
  Volume2, 
  AlertCircle, 
  MessageSquare, 
  Filter, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Flame
} from 'lucide-react';
import { NewsArticle, LiveUpdateItem } from '../types';

interface LiveCoverageTimelineProps {
  article: NewsArticle;
  onBackToHome: () => void;
  onSelectArticle: (article: NewsArticle) => void;
  onOpenAIAssistant: (story?: NewsArticle) => void;
}

export const LiveCoverageTimeline: React.FC<LiveCoverageTimelineProps> = ({
  article,
  onBackToHome,
  onSelectArticle,
  onOpenAIAssistant,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timelineItems, setTimelineItems] = useState<LiveUpdateItem[]>(
    article.liveUpdates || [
      {
        id: 'lu-1',
        time: '13:10 بتوقيت مكة',
        title: 'البيان الختامي المشترك يؤكد التزام الأطراف بخارطة الطريق الإنسانية',
        content: 'أكدت الوفود المشاركة في جنيف التوافق على إرسال مراقبين دوليين لتأمين سلاسل إمداد المساعدات والإشراف على النقاط اللوجستية.',
        type: 'alert',
        author: 'فريق بي بي سي - جنيف',
        badge: 'تطور عاجل',
        keyTakeaway: true,
      },
      {
        id: 'lu-2',
        time: '12:45 بتوقيت مكة',
        title: 'المبعوث الأممي: "حققنا اختراقاً ملموساً في ملف التنسيق الميداني"',
        content: '"الرغبة في إنهاء المعاناة الإنسانية كانت الدافع الأساسي لتقريب وجهات النظر والوصول إلى هذه الصيغة التوافقية."',
        type: 'quote',
        author: 'تصريح رسمي',
        badge: 'اقتباس مباشر',
      },
      {
        id: 'lu-3',
        time: '11:20 بتوقيت مكة',
        title: 'تأهب قوافل الإغاثة التابعة للهلال الأحمر على المعابر الحدودية',
        content: 'تستعد أكثر من 120 شاحنة محملة بالدقيق والأدوية والمولدات الكهربائية للتحرك فور استكمال الإجراءات التنسيقية.',
        type: 'update',
        badge: 'تحديث ميداني',
      },
    ]
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const filteredItems = timelineItems.filter(item => {
    if (filterType === 'all') return true;
    if (filterType === 'key') return item.keyTakeaway || item.type === 'alert';
    if (filterType === 'quotes') return item.type === 'quote';
    return item.type === filterType;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      
      {/* Back Button */}
      <button
        onClick={onBackToHome}
        className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-[#bb1919] mb-4 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة إلى الصفحة الرئيسية</span>
      </button>

      {/* Live Header Banner */}
      <div className="bg-[#990000] text-white p-6 rounded-t-sm shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
            <span className="bg-white text-[#990000] text-xs font-black px-2.5 py-0.5 uppercase tracking-wider rounded">
              تغطية مباشرة وحية
            </span>
            <span className="text-xs text-white/80 font-mono">
              تحديث مستمر لحظة بلحظة
            </span>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 bg-black/30 hover:bg-black/50 text-white text-xs px-3 py-1.5 rounded transition-all border border-white/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>تحديث التغطية</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        {/* AI summary assist */}
        <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-white/90">
            <Clock className="w-3.5 h-3.5" />
            <span>بدأت التغطية: منذ 4 ساعات</span>
            <span>•</span>
            <span>بإشراف فريق التحرير الإخباري</span>
          </div>

          <button
            onClick={() => onOpenAIAssistant(article)}
            className="flex items-center gap-1.5 bg-white text-[#990000] hover:bg-amber-300 font-bold px-3 py-1 text-xs rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#990000]" />
            <span>طلب ملخص ذكي للتغطية</span>
          </button>
        </div>
      </div>

      {/* Filter and Key Points Bar */}
      <div className="bg-white dark:bg-[#1a1e24] p-4 border-x border-b border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs mb-6 shadow-sm">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-gray-500 font-bold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>تصفية:</span>
          </span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full font-bold transition-colors ${
              filterType === 'all'
                ? 'bg-[#bb1919] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            جميع التحديثات ({timelineItems.length})
          </button>
          <button
            onClick={() => setFilterType('key')}
            className={`px-3 py-1 rounded-full font-bold transition-colors ${
              filterType === 'key'
                ? 'bg-[#bb1919] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            أبرز التطورات فقط
          </button>
          <button
            onClick={() => setFilterType('quotes')}
            className={`px-3 py-1 rounded-full font-bold transition-colors ${
              filterType === 'quotes'
                ? 'bg-[#bb1919] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            التصريحات والاقتباسات
          </button>
        </div>

        <div className="text-gray-400 font-mono text-[11px]">
          توقيت الأحداث بحسب مكة المكرمة (+3 GMT)
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-r-2 border-[#bb1919] pr-6 mr-3 space-y-6">
        {filteredItems.map((item, idx) => (
          <div key={item.id} className="relative group">
            
            {/* Timeline Node Icon */}
            <div className={`absolute -right-[31px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#121212] ${
              item.type === 'alert' ? 'bg-[#bb1919] animate-pulse' : 'bg-gray-800 dark:bg-gray-300'
            }`}></div>

            {/* Timeline Card */}
            <div className="bg-white dark:bg-[#1a1e24] border border-gray-200 dark:border-gray-800 rounded-sm p-5 shadow-sm hover:border-[#bb1919] transition-all">
              
              {/* Card Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#bb1919] dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded">
                    {item.time}
                  </span>
                  {item.badge && (
                    <span className="text-[11px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                  {item.keyTakeaway && (
                    <span className="text-[11px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" />
                      نقطة محورية
                    </span>
                  )}
                </div>

                {item.author && (
                  <span className="text-xs text-gray-500 font-medium">
                    {item.author}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#141414] dark:text-white leading-snug mb-2">
                {item.title}
              </h3>

              {/* Body Content */}
              <div className={`text-sm text-gray-700 dark:text-gray-300 leading-relaxed ${
                item.type === 'quote' 
                  ? 'border-r-4 border-amber-500 pr-3 italic font-serif bg-amber-50/50 dark:bg-amber-950/20 p-2.5 rounded-sm' 
                  : ''
              }`}>
                {item.content}
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
