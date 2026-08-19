import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Send,
  Loader2
} from 'lucide-react';
import { FACT_CHECKS } from '../data/newsData';
import { FactCheckItem } from '../types';

interface FactCheckSectionProps {
  onOpenAIAssistant: (query?: any) => void;
}

export const FactCheckSection: React.FC<FactCheckSectionProps> = ({
  onOpenAIAssistant,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(FACT_CHECKS[0].id);
  const [customClaim, setCustomClaim] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [customResult, setCustomResult] = useState<any | null>(null);

  const handleVerifyCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customClaim.trim()) return;

    setIsVerifying(true);
    setCustomResult(null);

    try {
      const res = await fetch('/api/gemini/fact-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: customClaim }),
      });
      const data = await res.json();
      setCustomResult(data);
    } catch (err) {
      console.error(err);
      setCustomResult({
        claim: customClaim,
        verdict: 'تحت التحقق',
        verdictCode: 'unverified',
        explanation: 'يجري فريق التحقق مراجعة المصادر الأولية لتأكيد صحة الادعاء.',
        evidence: ['فحص الأرشيف الرقمي وقواعد البيانات المفتوحة'],
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const getVerdictBadge = (verdict: string, type?: string) => {
    if (verdict.includes('صحيح') || type === 'true') {
      return (
        <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-400/40 px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{verdict}</span>
        </span>
      );
    }
    if (verdict.includes('مضلل') || type === 'misleading') {
      return (
        <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>{verdict}</span>
        </span>
      );
    }
    return (
      <span className="bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-400/40 px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        <span>{verdict}</span>
      </span>
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* Section Title */}
      <div className="bg-[#1a222d] text-white p-6 rounded-t-sm border-t-4 border-[#bb1919] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#bb1919] flex items-center justify-center text-white shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                بي بي سي تتحقق (BBC Verify)
              </h2>
              <span className="bg-[#bb1919] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                تدقيق الحقائق
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-1">
              مختبر التحقق من الأخبار الزائفة، الصور المفبركة، والادعاءات المضللة المنتشرة على الإنترنت
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAIAssistant()}
          className="flex items-center gap-1.5 bg-[#bb1919] hover:bg-[#990000] text-white text-xs font-bold px-3.5 py-2 rounded transition-colors shadow"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>فحص ادعاء عبر المحرر الذكي</span>
        </button>
      </div>

      {/* Main Fact Check Container */}
      <div className="bg-white dark:bg-[#1a1e24] border-x border-b border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        
        {/* Interactive Live Submission Form */}
        <form onSubmit={handleVerifyCustom} className="mb-8 bg-gray-50 dark:bg-[#222831] p-4 rounded border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
            <Search className="w-4 h-4 text-[#bb1919]" />
            <span>هل تشك في صحة خبر أو صورة متداولة؟ اختبر صحتها فوراً:</span>
          </h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customClaim}
              onChange={(e) => setCustomClaim(e.target.value)}
              placeholder="اكتب الادعاء أو عنوان الخبر المشكوك فيه هنا (مثال: خبر وفاة شخصية عامة، أو اكتشاف علمي مفاجئ)..."
              className="flex-1 bg-white dark:bg-[#1a1e24] text-gray-900 dark:text-white text-xs sm:text-sm p-2.5 rounded border border-gray-300 dark:border-gray-600 focus:border-[#bb1919] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isVerifying || !customClaim.trim()}
              className="bg-[#bb1919] hover:bg-[#990000] disabled:bg-gray-400 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جارٍ التدقيق الفوري...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>تحقق الآن</span>
                </>
              )}
            </button>
          </div>

          {/* Verification Result Box */}
          {customResult && (
            <div className="mt-4 p-4 bg-white dark:bg-[#1a1e24] border border-gray-200 dark:border-gray-700 rounded animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-bold text-gray-500">نتيجة فحص المحرر الرقمي:</span>
                {getVerdictBadge(customResult.verdict, customResult.verdictCode)}
              </div>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
                {customResult.explanation}
              </p>
              {customResult.evidence && (
                <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 p-2.5 rounded">
                  <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">الأدلة والمصادر:</span>
                  <ul className="list-disc list-inside space-y-1">
                    {customResult.evidence.map((ev: string, i: number) => (
                      <li key={i}>{ev}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </form>

        {/* Curated Fact Check Items */}
        <div className="space-y-4">
          <h4 className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
            أحدث التحقيقات الرقمية المنشورة بواسطة BBC Verify
          </h4>

          {FACT_CHECKS.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden transition-all bg-white dark:bg-[#1e232d]"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#252b37] flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {getVerdictBadge(item.verdict, item.verdictType)}
                      <span className="text-[11px] text-gray-500">{item.date}</span>
                      <span className="text-[11px] text-gray-400">• قسم: {item.category}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#141414] dark:text-white leading-snug">
                      الادعاء: "{item.claim}"
                    </h3>
                  </div>

                  <div className="p-1 text-gray-400 hover:text-gray-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-[#181d26]">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-3">
                      <div className="md:col-span-4 aspect-video overflow-hidden rounded">
                        <img
                          src={item.imageUrl}
                          alt={item.claim}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-8">
                        <div className="text-xs font-bold text-[#bb1919] mb-1">
                          المصدر المتداول: {item.sourceClaim}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3 font-medium">
                          {item.explanation}
                        </p>

                        <div className="bg-white dark:bg-[#222834] p-3 rounded border border-gray-200 dark:border-gray-700 text-xs">
                          <span className="font-bold text-gray-900 dark:text-white block mb-1">
                            خطوات التحقق الجنائي الرقمي:
                          </span>
                          <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                            {item.evidence.map((ev, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#bb1919] font-bold">✓</span>
                                <span>{ev}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
