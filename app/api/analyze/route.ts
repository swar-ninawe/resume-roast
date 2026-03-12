import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/extractText";
import { analyzeResume } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Accept both possible field names
    const file = (formData.get("resume") || formData.get("file")) as File | null;
    const mode = (formData.get("mode") as string) || "Professional Feedback";

    if (!file) {
      return NextResponse.json(
        { error: "No resume file uploaded." },
        { status: 400 }
      );
    }

    console.log("Uploaded file:", file.name);

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text
    const text = await extractTextFromFile(buffer, file.type);

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract readable text from the file." },
        { status: 400 }
      );
    }

    // Safety truncation
    const truncatedText = text.slice(0, 12000);

    console.log("Extracted text length:", truncatedText.length, "| Mode:", mode);

    // Call OpenAI analysis
    const analysis = await analyzeResume(truncatedText, mode);

    if (!analysis) {
      return NextResponse.json(
        { error: "AI failed to analyze resume." },
        { status: 500 }
      );
    }

    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error("Resume Analysis Error:", error);

    return NextResponse.json(
      {
        error: "Failed to analyze resume",
        details: error.message,
      },
      { status: 500 }
    );
  }
}