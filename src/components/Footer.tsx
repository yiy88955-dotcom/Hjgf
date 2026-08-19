import React, { useState } from 'react';
import { 
  Radio, 
  Tv, 
  Globe, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Mail, 
  Smartphone,
  Award,
  ArrowUp
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#12161f] text-white border-t-4 border-[#bb1919] mt-12 select-none">
      
      {/* Top Newsletter & Alert Subscription Bar */}
      <div className="bg-[#1a212c] py-8 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-[#bb1919]" />
              <h3 className="text-base font-black text-white">
                النشرة البريدية اليومية لبي بي سي عربي
              </h3>
            </div>
            <p className="text-xs text-gray-400">
              احصل على ملخص شامل لأهم عناوين الأخبار والتحليلات الحصرية مباشرة في بريدك الإلكتروني كل صباح.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex-1 max-w-md flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني..."
              required
              className="flex-1 bg-[#12161f] text-white text-xs sm:text-sm p-3 rounded-none border border-gray-700 focus:border-[#bb1919] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#bb1919] hover:bg-[#990000] text-white text-xs sm:text-sm font-bold px-6 py-3 transition-colors cursor-pointer shrink-0 shadow"
            >
              {isSubscribed ? 'تم الاشتراك!' : 'اشتراك مجاني'}
            </button>
          </form>

        </div>
      </div>

      {/* Main Footer Links & Editorial Standards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: BBC Arabic Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 font-black text-xl">
                <span className="w-7 h-7 bg-[#bb1919] text-white flex items-center justify-center font-serif">B</span>
                <span className="w-7 h-7 bg-[#bb1919] text-white flex items-center justify-center font-serif">B</span>
                <span className="w-7 h-7 bg-[#bb1919] text-white flex items-center justify-center font-serif">C</span>
              </div>
              <span className="text-xl font-black text-white font-['Cairo']">عربي</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              هيئة الإذاعة البريطانية (بي بي سي) هيئة إعلامية عامة ومستقلة، تلتزم بأعلى معايير الدقة والنزاهة والحيادية في تقديم الأخبار والتحليلات للجمهور في الشرق الأوسط وشتى أنحاء العالم.
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-300">
              <span className="flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-[#bb1919]" />
                <span>إذاعة بي بي سي</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Tv className="w-3.5 h-3.5 text-[#bb1919]" />
                <span>تلفزيون بي بي سي عربي</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#bb1919]" />
                <span>بي بي سي إكسترا</span>
              </span>
            </div>
          </div>

          {/* Col 2: News Sections */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-r-2 border-[#bb1919] pr-2">
              الأقسام والتغطيات
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">أخبار الشرق الأوسط</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الأخبار العالمية والدولية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الاقتصاد وأسواق المال</a></li>
              <li><a href="#" className="hover:text-white transition-colors">العلوم والتكنولوجيا والذكاء الاصطناعي</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الرياضة ودوري أبطال أوروبا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الصحة والطب والبيئة</a></li>
            </ul>
          </div>

          {/* Col 3: Media & Programs */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-r-2 border-[#bb1919] pr-2">
              البرامج والبودكاست
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">بودكاست بي بي سي إكسترا</a></li>
              <li><a href="#" className="hover:text-white transition-colors">برنامج نقطة حوار</a></li>
              <li><a href="#" className="hover:text-white transition-colors">برنامج عالم الصباح الإخباري</a></li>
              <li><a href="#" className="hover:text-white transition-colors">برنامج 4 تك التقني</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تحقيقات BBC Verify الرقمية</a></li>
              <li><a href="#" className="hover:text-white transition-colors">الوثائقيات والتقارير المصورة</a></li>
            </ul>
          </div>

          {/* Col 4: Editorial & Help */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-r-2 border-[#bb1919] pr-2">
              المعايير والشفافية
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">الميثاق التحريري لبي بي سي</a></li>
              <li><a href="#" className="hover:text-white transition-colors">سياسة الخصوصية وملفات الارتباط</a></li>
              <li><a href="#" className="hover:text-white transition-colors">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-white transition-colors">أكاديمية بي بي سي للإعلام</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ترددات البث الإذاعي والفضائي</a></li>
              <li><a href="#" className="hover:text-white transition-colors">تواصل مع غرفة الأخبار</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Back to top */}
        <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>© 2026 هيئة الإذاعة البريطانية (BBC). جميع الحقوق محفوظة.</span>
            <span className="hidden md:inline">• بي بي سي ليست مسؤولة عن محتويات المواقع الخارجية.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors bg-[#1a212c] px-3 py-1.5 rounded border border-gray-700"
          >
            <span>الرجوع لأعلى الصفحة</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </footer>
  );
};
