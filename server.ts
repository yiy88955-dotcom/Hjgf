import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with lazy client check
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// API: AI News Story Summarizer
app.post("/api/gemini/summarize", async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Story title is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        summary: [
          `أبرز ما ورد في التقرير حول: ${title}`,
          "التطورات الميدانية والدبلوماسية المتسارعة وتأثيرها على المنطقة.",
          "ردود الفعل الدولية والقرارات المرتقبة من الجهات المعنية.",
          "التداعيات الاقتصادية والاجتماعية المتوقعة على المدى القريب."
        ],
        context: "تم إعداد هذا التلخيص وفق المعايير التحريرية المهنية لبي بي سي عربي.",
        source: "fallback"
      });
    }

    const prompt = `أنت محرر صحفي مخضرم في بي بي سي عربي (BBC Arabic).
قم بتلخيص هذا الخبر الصحفي بأسلوب بي بي سي التحريري الرصين والمحايد والدقيق.

عنوان الخبر: ${title}
القسم: ${category || "عام"}
تفاصيل الخبر: ${content || title}

المطلوب:
1. 3 إلى 4 نقاط محورية شديدة التركيز ومباشرة (أبرز النقاط).
2. فقرة موجزة واحدة توضح سياق الخبر وخلفيته.

أجب بصيغة JSON حصراً بالشكل التالي:
{
  "summary": ["نقطة 1", "نقطة 2", "نقطة 3"],
  "context": "سياق الخبر وخلفيته..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      summary: parsed.summary || [],
      context: parsed.context || "",
      source: "gemini"
    });
  } catch (error: any) {
    console.error("Summarize error:", error);
    res.status(500).json({ error: error.message || "Failed to generate summary" });
  }
});

// API: AI Historical and Geopolitical Context Explainer
app.post("/api/gemini/explain-context", async (req, res) => {
  try {
    const { topic, query } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        historicalBackground: `يقدم هذا التقرير تحليلاً شاملاً لأبعاد قضية "${topic || query}"، حيث تتشابك العوامل الجيوسياسية والتاريخية المؤثرة في مسار الأحداث الراهنة.`,
        keyActors: ["الأطراف الإقليمية والدولية الفاعلة", "المنظمات الأممية والهيئات الدبلوماسية"],
        futureScenarios: ["استمرار المبادرات الدبلوماسية", "ترقب قرارات مجلس الأمن والقمم الدولية المرتقبة"],
        source: "fallback"
      });
    }

    const prompt = `أنت كبير محللي الشؤون الاستراتيجية والشرق الأوسط في بي بي سي (BBC News).
قدم تحليلاً معمقاً ومحايداً وموضوعياً عن الموضوع التالي: "${topic || query}".

أجب بصيغة JSON وفق النمط التالي:
{
  "historicalBackground": "شرح تاريخي موثق وموجز للأسباب الجذرية (فقرتان)",
  "keyActors": ["اسم الطرف ودوره وموقفه", "اسم الطرف الثاني ودوره وموقفه", "اسم الطرف الثالث ودوره وموقفه"],
  "futureScenarios": ["سيناريو 1 محتمل", "سيناريو 2 محتمل", "سيناريو 3 محتمل"],
  "journalisticNotes": "ملاحظات تحريرية حول مدى موثوقية الروايات المختلفة"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, source: "gemini" });
  } catch (error: any) {
    console.error("Context explain error:", error);
    res.status(500).json({ error: error.message || "Failed to explain context" });
  }
});

// API: AI Journalistic Fact Checker
app.post("/api/gemini/fact-check", async (req, res) => {
  try {
    const { claim } = req.body;
    if (!claim) {
      return res.status(400).json({ error: "Claim is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        claim,
        verdict: "تحت التحقق",
        verdictCode: "investigating",
        explanation: "يجري فريق بي بي سي للتحقق الرقمي (BBC Verify) مراجعة المصادر الأولية والبيانات المفتوحة لتأكيد صحة هذا الادعاء.",
        evidence: ["مقارنة التصريحات الرسمية الصادرة", "فحص المقاطع المصورة والأدلة الجغرافية المفتوحة المصدر"],
        rating: 70
      });
    }

    const prompt = `أنت خبير وحدة "بي بي سي تتحقق" (BBC Verify).
قم بفحص الادعاء أو الخبر المتداول التالي بدقة صحفية بالغة: "${claim}".

حدد الحكم بدقة (صحيح، مضلل، زائف، غير مؤكد، مقتطع من سياقه).
أجب بصيغة JSON:
{
  "verdict": "الحكم بالعربية (مثال: مضلل، صحيح، زائف جزئياً)",
  "verdictCode": "true" | "misleading" | "fake" | "unverified",
  "explanation": "شرح مفصل للحقائق والمصادر المعتمدة",
  "evidence": ["دليل 1", "دليل 2", "دليل 3"],
  "rating": 85
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, claim, source: "gemini" });
  } catch (error: any) {
    console.error("Fact check error:", error);
    res.status(500).json({ error: error.message || "Failed to fact-check" });
  }
});

// API: Interactive Smart Journalist Q&A
app.post("/api/gemini/ask-journalist", async (req, res) => {
  try {
    const { question, currentStory } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        answer: `شكراً لسؤالك حول: "${question}". وفق التغطيات الإخبارية المعتمدة في بي بي سي عربي، تتواصل متابعة التطورات الميدانية والسياسية المتعلقة بهذا الملف مع التدقيق في كافة المصادر الرسمية والمستقلة.`,
        suggestedQuestions: [
          "ما هي التداعيات الاقتصادية المتوقعة؟",
          "كيف تفاعلت العواصم الكبرى مع التطورات الأخيرة؟",
          "ما هو الموقف القانوني الدولي من هذه الأزمة؟"
        ]
      });
    }

    const prompt = `أنت "المحرر الذكي لبي بي سي عربي"، مساعد صحفي ذكي يقدم إجابات رصينة، محايدة، دقيقة، وموثقة عن الأحداث الجارية وسياقاتها باللغة العربية الفصحى.

سياق الخبر الحالي إن وجد: ${currentStory ? JSON.stringify(currentStory) : "أحداث الشرق الأوسط والعالم الجارية"}
سؤال القارئ: ${question}

المطلوب:
1. إجابة صحفية متوازنة توضح الحقائق بموضوعية دون تحيز لأي طرف.
2. 3 أسئلة مقترحة ذات صلة يمكن للقارئ استكشافها.

أجب بصيغة JSON:
{
  "answer": "الإجابة الصحفية الواضحة والمركزة...",
  "suggestedQuestions": ["سؤال 1", "سؤال 2", "سؤال 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      answer: parsed.answer || "",
      suggestedQuestions: parsed.suggestedQuestions || [],
      source: "gemini"
    });
  } catch (error: any) {
    console.error("Ask journalist error:", error);
    res.status(500).json({ error: error.message || "Failed to answer question" });
  }
});

// Setup Vite middleware for development / static serving in production
async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProduction = process.env.NODE_ENV === "production" && fs.existsSync(distPath);

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BBC Arabic News Server running on http://localhost:${PORT}`);
  });
}

startServer();

