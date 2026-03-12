import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in .env.local");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeResume(
  resumeText: string,
  mode: string = "Brutal Recruiter"
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `
You are a brutally honest but helpful career coach reviewing resumes.

Current Roast Personality Mode: ${mode}

Adapt tone based on the mode:
- Brutal Recruiter: Sarcastic and ruthless
- Meme Roast: Funny internet humor
- Professional Feedback: Constructive HR tone
- ATS Robot Mode: Cold, keyword-focused analysis

Return ONLY valid JSON.

Schema:

{
  "atsScore": number,
  "roast": string,
  "issues": string[],
  "suggestions": string[],
  "sectionScores": {
    "experience": number,
    "projects": number,
    "skills": number,
    "formatting": number
  },
  "recruiterReaction": string,
  "heatmap": {
    "experience": "Strong" | "Average" | "Weak",
    "projects": "Strong" | "Average" | "Weak",
    "skills": "Strong" | "Average" | "Weak",
    "formatting": "Strong" | "Average" | "Weak"
  },
  "rewrites": [
    {
      "before": string,
      "after": string
    }
  ]
}

Resume:
"""
${resumeText}
"""
`;

  try {
    const result = await model.generateContent(prompt);

    let text = result.response.text();

    // Clean Gemini formatting
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini raw response:", text);

    try {
      return JSON.parse(text);
    } catch {
      // fallback extraction if Gemini adds explanation text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in Gemini response");
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error("AI analysis failed.");
  }
}

export async function improveResumeBullet(
  bullet: string,
  context?: string
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
  });

  const prompt = `
You are an expert resume writer.

Improve this resume bullet point:

"${bullet}"

${context ? `Resume context:\n${context}` : ""}

Rewrite it to:
- start with a strong action verb
- be concise
- include measurable impact if possible

Return ONLY the rewritten bullet text.
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Gemini rewrite error:", error);
    throw new Error("Failed to rewrite bullet.");
  }
}