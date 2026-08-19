import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  RotateCcw,
  BookOpen,
  Volume2
} from 'lucide-react';
import { NewsArticle } from '../types';

interface AINewsAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStory?: NewsArticle | null;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  suggestedQuestions?: string[];
  time: string;
}

export const AINewsAssistantModal: React.FC<AINewsAssistantModalProps> = ({
  isOpen,
  onClose,
  currentStory,
}) => {
  if (!isOpen) return null;

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: currentStory
        ? `أهلاً بك. أنا المحرر الذكي لبي بي سي عربي. يسعدني مساعدتك في فهم وتحليل أبعاد هذا التقرير: "${currentStory.title}". يمكنك سؤالي عن السياق التاريخي، الأطراف المعنية، أو طلب تبسيط النقاط المعقدة.`
        : 'مرحباً بك في خدمة المحرر الذكي لبي بي سي عربي. أنا هنا للإجابة على تساؤلاتك حول الأحداث الجارية في الشرق الأوسط والعالم، وتوضيح السياقات التاريخية والجيوسياسية بحيادية ودقة مهنية.',
      suggestedQuestions: currentStory
        ? [
            'اشرح لي هذا الخبر باختصار وبأسلوب مبسط',
            'ما هي التداعيات الإقليمية والدولية المتوقعة؟',
            'ما هي الخلفية التاريخية لهذا النزاع أو التطور؟',
          ]
        : [
            'ما هي أبرز الملفات التي يناقشها قادة العالم هذا الأسبوع؟',
            'كيف تؤثر أسعار الطاقة العالمية على التضخم في العالم العربي؟',
            'ما هي أهم التطورات في سباق تنظيم الذكاء الاصطناعي عالمياً؟',
          ],
      time: 'الآن',
    },
  ]);

  const handleSend = async (questionToSend?: string) => {
    const query = questionToSend || inputQuestion;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionToSend) setInputQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/ask-journalist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          currentStory: currentStory ? { title: currentStory.title, summary: currentStory.summary } : null,
        }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answer || 'شكراً لسؤالك. تستمر متابعة هذا الملف في غرفة الأخبار المركزية لبي بي سي.',
        suggestedQuestions: data.suggestedQuestions || [],
        time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: 'عذراً، حدث خطأ أثناء الاتصال بالخادم. تواصل بي بي سي التغطية الإخبارية الشاملة على مدار الساعة.',
          time: 'الآن',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-[#12161f] text-white w-full max-w-3xl h-[85vh] rounded-sm border border-gray-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-[#1a212d] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#bb1919] to-amber-600 flex items-center justify-center text-white shadow">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black text-white">
                  المحرر الذكي لبي بي سي عربي (BBC Smart Journalist)
                </h3>
                <span className="bg-[#bb1919] text-white text-[10px] font-black px-2 py-0.5 rounded">
                  مدعوم بـ Gemini AI
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                تحليل محايد، تفكيك السياقات المعقدة، والتحقق الفوري من الأخبار والمعلومات
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Story Context Pill if attached */}
        {currentStory && (
          <div className="bg-red-950/40 border-b border-red-900/60 p-2.5 px-4 text-xs text-red-200 flex items-center justify-between">
            <span className="truncate">
              <strong>السياق الحالي:</strong> {currentStory.title}
            </span>
            <span className="text-[10px] bg-[#bb1919] px-2 py-0.5 rounded font-bold shrink-0">
              {currentStory.category}
            </span>
          </div>
        )}

        {/* Chat Stream Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#bb1919] text-white flex items-center justify-center shrink-0 mt-1 shadow">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-sm p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#bb1919] text-white'
                  : 'bg-[#1b222d] text-gray-100 border border-gray-800'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <span className="text-[10px] text-gray-400 block mt-2 text-left font-mono">
                  {msg.time}
                </span>

                {/* Suggested Questions Pills */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-700/60 space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-300 block mb-1">
                      أسئلة مقترحة للاستكشاف:
                    </span>
                    {msg.suggestedQuestions.map((sq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sq)}
                        className="block w-full text-right bg-[#252e3e] hover:bg-[#323d50] text-gray-200 text-xs p-2 rounded transition-colors border border-gray-700"
                      >
                        ← {sq}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-gray-400 bg-[#1b222d] p-3 rounded w-fit border border-gray-800">
              <Loader2 className="w-4 h-4 animate-spin text-[#bb1919]" />
              <span>المحرر الذكي يبحث في أرشيف التقارير والبيانات المعتمدة...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-[#181e29] border-t border-gray-800 flex gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="اسأل عن أي خبر أو حدث دولي، أو اطلب تحليلاً للسياق..."
            className="flex-1 bg-[#12161f] text-white text-xs sm:text-sm p-3 rounded border border-gray-700 focus:border-[#bb1919] focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuestion.trim()}
            className="bg-[#bb1919] hover:bg-[#990000] disabled:bg-gray-800 text-white px-5 py-3 rounded font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">إرسال</span>
          </button>
        </form>

      </div>
    </div>
  );
};
