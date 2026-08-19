import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Flame, 
  MessageSquare, 
  CheckCircle2, 
  ThumbsUp, 
  Send, 
  Type, 
  ShieldCheck, 
  FileText,
  HelpCircle,
  Play,
  Pause
} from 'lucide-react';
import { NewsArticle, UserComment } from '../types';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  onOpenAIAssistant: (story?: NewsArticle) => void;
  onSelectArticle: (article: NewsArticle) => void;
  allArticles: NewsArticle[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  isBookmarked,
  onOpenAIAssistant,
  onSelectArticle,
  allArticles,
}) => {
  if (!article) return null;

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState<string[] | null>(null);
  const [aiContext, setAiContext] = useState<string | null>(null);
  
  // Comments state
  const [comments, setComments] = useState<UserComment[]>([
    {
      id: 'c-1',
      articleId: article.id,
      author: 'أحمد القحطاني',
      location: 'الرياض',
      date: 'منذ ساعتين',
      content: 'تغطية متوازنة ورصينة كعادتكم في بي بي سي عربي. نأمل أن تترجم هذه المباحثات الدبلوماسية إلى استقرار فعلي على الأرض.',
      likes: 18,
    },
    {
      id: 'c-2',
      articleId: article.id,
      author: 'د. مريم النجار',
      location: 'القاهرة',
      date: 'منذ 45 دقيقة',
      content: 'التركيز على الجانب الإنساني وتأمين الإمدادات الطبية هو الأولوية القصوى في هذه المرحلة الحساسة.',
      likes: 12,
    },
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  // Web Speech API for Arabic text-to-speech audio reading
  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setIsSpeechSupported(false);
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${article.title}. ${article.summary}. ${article.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.95;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleGenerateSummary = async () => {
    setIsSummarizing(true);
    try {
      const res = await fetch('/api/gemini/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          content: article.content.join('\n'),
          category: article.category,
        }),
      });
      const data = await res.json();
      setAiSummary(data.summary || []);
      setAiContext(data.context || '');
    } catch (err) {
      console.error(err);
      setAiSummary([
        `أبرز ما ورد في تقرير: ${article.title}`,
        'استعراض التطورات الميدانية والقرارات المرتقبة.',
        'تحليل ردود الفعل الدبلوماسية والشعبية.',
      ]);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: UserComment = {
      id: `c-${Date.now()}`,
      articleId: article.id,
      author: newCommentAuthor.trim() || 'قارئ بي بي سي',
      location: 'الوطن العربي',
      date: 'الآن',
      content: newCommentText.trim(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setNewCommentAuthor('');
  };

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && (a.category === article.category || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-lg sm:text-xl leading-[1.8]';
    if (fontSize === 'xlarge') return 'text-xl sm:text-2xl leading-[2]';
    return 'text-base sm:text-lg leading-[1.75]';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto flex items-start justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="bg-white dark:bg-[#161a22] text-[#141414] dark:text-white w-full max-w-4xl rounded-sm border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden my-4 relative">
        
        {/* Sticky Article Header Bar */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#161a22]/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-[#bb1919] text-white text-xs font-black px-2.5 py-0.5 uppercase">
              {article.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
              {article.subcategory}
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            
            {/* Audio Reader with Web Speech API */}
            {isSpeechSupported && (
              <button
                onClick={handleToggleSpeech}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded transition-colors ${
                  isSpeaking
                    ? 'bg-[#bb1919] text-white animate-pulse'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-[#bb1919] hover:text-white'
                }`}
                title="استمع إلى التقرير بالصوت العربي الطبيعي"
              >
                {isSpeaking ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isSpeaking ? 'إيقاف الاستماع' : 'استمع للمقال'}</span>
              </button>
            )}

            {/* AI Summarizer Button */}
            <button
              onClick={handleGenerateSummary}
              disabled={isSummarizing}
              className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950/50 text-[#bb1919] dark:text-red-300 hover:bg-red-100 text-xs font-bold rounded border border-red-200 dark:border-red-900/60 transition-colors"
              title="ملخص الذكاء الاصطناعي الفوري"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">{isSummarizing ? 'جارٍ التلخيص...' : 'تلخيص الذكاء الاصطناعي'}</span>
            </button>

            {/* Font size adjustments */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 overflow-hidden text-xs">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 font-bold ${fontSize === 'normal' ? 'bg-[#bb1919] text-white' : 'text-gray-600 dark:text-gray-300'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 font-bold border-r border-l border-gray-300 dark:border-gray-700 ${fontSize === 'large' ? 'bg-[#bb1919] text-white' : 'text-gray-600 dark:text-gray-300'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 font-bold ${fontSize === 'xlarge' ? 'bg-[#bb1919] text-white' : 'text-gray-600 dark:text-gray-300'}`}
              >
                A++
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-1.5 rounded transition-colors ${
                isBookmarked(article.id)
                  ? 'bg-[#bb1919] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#bb1919]'
              }`}
              title="حفظ"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-white hover:bg-[#bb1919] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="p-5 sm:p-8 md:p-10">
          
          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#141414] dark:text-white leading-[1.3] mb-4">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-6">
              {article.subtitle}
            </p>
          )}

          {/* Author & Timestamp Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#bb1919] text-white font-bold flex items-center justify-center text-sm shadow">
                {article.author.name[0]}
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  {article.author.name}
                </div>
                <div className="text-[11px] text-gray-500">
                  {article.author.role} {article.author.location ? `• ${article.author.location}` : ''}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span>وقت القراءة: {article.readTimeMinutes} دقائق</span>
            </div>
          </div>

          {/* Main Editorial Image */}
          <div className="mb-8 rounded-sm overflow-hidden border border-gray-200 dark:border-gray-800">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="bg-gray-100 dark:bg-[#1f242d] p-3 text-xs text-gray-600 dark:text-gray-400 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-800">
              <span>{article.imageCaption}</span>
              <span className="text-[11px] text-gray-500">تصوير: {article.imageCredit}</span>
            </div>
          </div>

          {/* AI Instant Summary Card if triggered */}
          {aiSummary && (
            <div className="bg-gradient-to-r from-red-50 to-amber-50 dark:from-red-950/40 dark:to-amber-950/30 border-r-4 border-[#bb1919] p-5 rounded-sm mb-8 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-black text-[#bb1919] dark:text-red-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>ملخص الذكاء الاصطناعي لأهم نقاط التقرير:</span>
                </h4>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  أعد بواسطة المحرر الذكي لبي بي سي
                </span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium mb-3">
                {aiSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#bb1919] font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {aiContext && (
                <div className="pt-2 border-t border-red-200 dark:border-red-900/40 text-xs text-gray-600 dark:text-gray-300">
                  <strong>خلفية وسياق الخبر:</strong> {aiContext}
                </div>
              )}
            </div>
          )}

          {/* Fact Check Badge if attached */}
          {article.factCheck && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border-r-4 border-amber-500 p-4 rounded-sm mb-6 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-1">
                  تدقيق BBC Verify: {article.factCheck.verdict}
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  {article.factCheck.summary}
                </p>
              </div>
            </div>
          )}

          {/* Paragraphs */}
          <div className={`space-y-6 text-gray-800 dark:text-gray-200 font-normal ${getFontSizeClass()}`}>
            {article.content.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {idx === 0 && (
                  <span className="float-right text-4xl font-black text-[#bb1919] ml-3 leading-none font-serif">
                    {para[0]}
                  </span>
                )}
                {idx === 0 ? para.slice(1) : para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
              مواضيع ذات صلة:
            </h4>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-[#bb1919] hover:text-white px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Ask Assistant Callout inside article */}
          <div className="mt-8 bg-[#1a222d] text-white p-5 rounded flex flex-wrap items-center justify-between gap-4 border-r-4 border-amber-400">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">هل لديك سؤال حول أبعاد هذا الخبر وسياقه؟</h4>
                <p className="text-xs text-gray-300">اسأل المحرر الذكي لبي بي سي عربي للحصول على إجابة موثقة ومحايدة فوراً.</p>
              </div>
            </div>
            <button
              onClick={() => onOpenAIAssistant(article)}
              className="bg-[#bb1919] hover:bg-[#990000] text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow"
            >
              طرح سؤال على الذكاء الاصطناعي
            </button>
          </div>

          {/* Reader Comments Section */}
          <div className="mt-10 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#bb1919]" />
                <span>مشاركات وآراء القراء ({comments.length})</span>
              </h3>
              <span className="text-xs text-gray-400">تخضع التعليقات للمعايير التحريرية لبي بي سي</span>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mb-6 bg-gray-50 dark:bg-[#1e232d] p-4 rounded border border-gray-200 dark:border-gray-700">
              <div className="mb-3">
                <input
                  type="text"
                  value={newCommentAuthor}
                  onChange={(e) => setNewCommentAuthor(e.target.value)}
                  placeholder="اسمك الكريم والمدينة (مثال: سامي من بغداد)..."
                  className="w-full bg-white dark:bg-[#161a22] text-xs sm:text-sm p-2.5 rounded border border-gray-300 dark:border-gray-600 focus:border-[#bb1919] focus:outline-none mb-2"
                />
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="أضف تعليقك الموضوعي حول مجريات هذا التقرير..."
                  rows={3}
                  className="w-full bg-white dark:bg-[#161a22] text-xs sm:text-sm p-2.5 rounded border border-gray-300 dark:border-gray-600 focus:border-[#bb1919] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="bg-[#bb1919] hover:bg-[#990000] disabled:bg-gray-400 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال التعليق للنشر</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-gray-50 dark:bg-[#1b202a] rounded border border-gray-200 dark:border-gray-800 text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 dark:text-white">{comment.author}</span>
                      <span className="text-[11px] text-gray-500">({comment.location})</span>
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2 font-normal">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <button className="flex items-center gap-1 hover:text-[#bb1919]">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comment.likes} إعجاب</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-base font-black text-gray-900 dark:text-white mb-4">
                تقارير ومتابعات ذات صلة
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectArticle(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-gray-50 dark:bg-[#1c212c] p-3 rounded border border-gray-200 dark:border-gray-800 cursor-pointer hover:border-[#bb1919] transition-all group"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full aspect-[16/10] object-cover rounded-sm mb-2"
                    />
                    <span className="text-[10px] font-bold text-[#bb1919]">{rel.category}</span>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-[#bb1919] line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
