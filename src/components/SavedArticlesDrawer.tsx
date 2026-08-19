import React from 'react';
import { X, Bookmark, Trash2, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { NewsArticle } from '../types';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      <div className="bg-white dark:bg-[#161a22] text-[#141414] dark:text-white w-full max-w-md h-full shadow-2xl flex flex-col border-r border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="p-4 bg-[#1a212d] text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-current" />
            <h3 className="font-bold text-sm sm:text-base">
              الأخبار المحفوظة للقراءة ({savedArticles.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear all bar */}
        {savedArticles.length > 0 && (
          <div className="px-4 py-2 bg-gray-100 dark:bg-[#1e2430] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
            <span>محفوظة في متصفحك للقراءة بدون إنترنت</span>
            <button
              onClick={onClearAll}
              className="text-red-600 hover:underline flex items-center gap-1 font-bold"
            >
              <Trash2 className="w-3 h-3" />
              <span>مسح الكل</span>
            </button>
          </div>
        )}

        {/* List of articles */}
        <div className="flex-1 p-4 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-800">
          {savedArticles.length > 0 ? (
            savedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="py-3.5 group cursor-pointer flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-[#1d222c] px-2 rounded transition-colors"
              >
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-16 h-16 object-cover rounded-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#bb1919] uppercase">
                    {art.category}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#bb1919] mb-1">
                    {art.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span>{art.publishedAt}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveBookmark(art.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="حذف من المحفوظات"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">
                لا توجد تقارير محفوظة بعد
              </h4>
              <p className="text-xs text-gray-500 max-w-xs">
                انقر على أيقونة الإشارة المرجعية (حفظ) بجانب أي مقال أو قصة لحفظها هنا والعودة إليها في أي وقت.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
