import { NextRequest, NextResponse } from "next/server";
import { improveResumeBullet } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bullet, context } = body;

    if (!bullet) {
      return NextResponse.json(
        { error: "No bullet point provided." },
        { status: 400 }
      );
    }

    const rewritten = await improveResumeBullet(bullet, context);

    return NextResponse.json({ rewritten });
  } catch (error: any) {
    console.error("Improve Bullet Error:", error);
    return NextResponse.json(
      { error: "Failed to improve bullet", details: error.message },
      { status: 500 }
    );
  }
}
