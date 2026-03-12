"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScoreMeter } from "@/components/ScoreMeter";
import { ResultsCard } from "@/components/ResultsCard";
import { Flame, AlertTriangle, Lightbulb, PenTool, ArrowLeft, Share2, Sparkles, CheckCircle, BarChart3, Activity } from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";

interface Rewrite {
  before: string;
  after: string;
}

interface SectionScores {
  experience?: number;
  projects?: number;
  skills?: number;
  formatting?: number;
}

interface Heatmap {
  experience?: string;
  projects?: string;
  skills?: string;
  formatting?: string;
}

interface RoastResult {
  atsScore: number;
  roast: string;
  issues: string[];
  suggestions: string[];
  sectionScores?: SectionScores;
  recruiterReaction?: string;
  heatmap?: Heatmap;
  rewrites: Rewrite[];
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<RoastResult | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [improvingIndex, setImprovingIndex] = useState<number | null>(null);
  const [improvedBullets, setImprovedBullets] = useState<Record<number, string>>({});

  const handleShare = async () => {
    const element = document.getElementById("roast-card");
    if (!element) return;
    
    setIsSharing(true);
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#0f172a" });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "ResumeRoast.png";
      link.click();
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleImproveBullet = async (bullet: string, index: number) => {
    setImprovingIndex(index);
    try {
      const response = await fetch("/api/improve-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bullet, context: result?.issues.join(" ") }),
      });
      const data = await response.json();
      if (data.rewritten) {
        setImprovedBullets(prev => ({ ...prev, [index]: data.rewritten }));
      }
    } catch (error) {
      console.error("Failed to improve bullet:", error);
    } finally {
      setImprovingIndex(null);
    }
  };

  useEffect(() => {
    const data = sessionStorage.getItem("roastResult");
    if (data) {
      setResult(JSON.parse(data));
    } else {
      router.push("/upload");
    }
  }, [router]);

  if (!result) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark relative overflow-hidden">
      {/* Animated Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-neon/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-4000" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"></div>
      
      <div className="animate-pulse flex flex-col items-center relative z-10 bg-brand-card p-12 rounded-[3rem] border border-brand-border backdrop-blur-xl shadow-2xl">
        <div className="w-24 h-24 rounded-full border-4 border-brand-purple/30 border-t-brand-neon animate-spin mb-8 shadow-[0_0_30px_rgba(168,85,247,0.3)]"></div>
        <p className="text-3xl font-extrabold text-white tracking-tight">AI is roasting your CV...</p>
        <p className="text-slate-400 mt-2 font-light">Please brace yourself.</p>
      </div>
    </div>
  );

  const getHeatmapColor = (status?: string) => {
    if (status === "Strong") return "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
    if (status === "Average") return "bg-yellow-500/20 border-yellow-500/50 text-yellow-400";
    return "bg-red-500/20 border-red-500/50 text-red-400";
  };

  return (
    <main className="min-h-screen p-6 md:p-12 bg-brand-dark text-slate-50 relative overflow-hidden selection:bg-brand-neon selection:text-white pb-24">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-brand-purple/10 to-transparent pointer-events-none mix-blend-screen"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <Link href="/upload" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all group bg-brand-card px-6 py-3 rounded-full border border-brand-border shadow-lg hover:shadow-brand-purple/20 hover:border-brand-purple/50 backdrop-blur-md">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Try Another
          </Link>
          <div className="flex gap-4">
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="inline-flex items-center gap-3 bg-brand-purple hover:bg-brand-neon text-white font-bold px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all hover:shadow-[0_0_50px_rgba(192,132,252,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSharing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin flex-shrink-0"></div> : <Share2 className="w-5 h-5" />}
              {isSharing ? "Capturing Screenshot..." : "Share Your Roast ☠️"}
            </button>
          </div>
        </div>

        <div id="roast-card" className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-brand-card p-10 md:p-14 rounded-[3rem] border border-brand-border shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none opacity-50"></div>
          
          <ScoreMeter score={result.atsScore} />
          
          <div className="space-y-6 relative z-10">
            <div className="bg-brand-dark/80 p-8 md:p-10 rounded-[2rem] border border-red-500/20 shadow-inner relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-red-500/20 transition-colors duration-700"></div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <Flame className="w-8 h-8 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse-slow" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight">The Verdict</h2>
              </div>
              <p className="text-xl md:text-2xl text-slate-300 relative z-10 leading-relaxed font-light">
                &ldquo;<span className="font-medium text-white">{result.roast}</span>&rdquo;
              </p>
            </div>

            {result.recruiterReaction && (
              <div className="bg-brand-card p-6 rounded-[2rem] border border-brand-border flex gap-5 items-center shadow-lg transition-transform hover:-translate-y-1 duration-300">
                <div className="text-5xl drop-shadow-lg scale-110">🤡</div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">Recruiter Reaction</p>
                  <p className="text-lg text-white font-medium">&ldquo;{result.recruiterReaction}&rdquo;</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <ResultsCard title="Section Breakdown" icon={<BarChart3 className="w-7 h-7 text-blue-400" />} className="border-t-[3px] border-t-blue-500 shadow-[0_10px_40px_rgba(59,130,246,0.1)]">
            <div className="space-y-6">
              {[
                { label: "Experience", score: result.sectionScores?.experience ?? 0 },
                { label: "Projects", score: result.sectionScores?.projects ?? 0 },
                { label: "Skills", score: result.sectionScores?.skills ?? 0 },
                { label: "Formatting", score: result.sectionScores?.formatting ?? 0 },
              ].map((item) => (
                <div key={item.label} className="group cursor-default">
                  <div className="flex justify-between text-base font-bold mb-2">
                    <span className="text-slate-300 tracking-wide">{item.label}</span>
                    <span className="text-white bg-blue-500/10 px-3 py-0.5 rounded-full border border-blue-500/20">{item.score}/10</span>
                  </div>
                  <div className="w-full bg-brand-dark/80 rounded-full h-4 border border-brand-border overflow-hidden shadow-inner flex">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-4 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(56,189,248,0.5)] group-hover:brightness-125" style={{ width: `${(item.score / 10) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </ResultsCard>

          <ResultsCard title="Resume Heatmap" icon={<Activity className="w-7 h-7 text-pink-400" />} className="border-t-[3px] border-t-pink-500 shadow-[0_10px_40px_rgba(236,72,153,0.1)]">
            <div className="grid grid-cols-2 gap-5 h-full content-center">
              {[
                { label: "Experience", status: result.heatmap?.experience },
                { label: "Projects", status: result.heatmap?.projects },
                { label: "Skills", status: result.heatmap?.skills },
                { label: "Formatting", status: result.heatmap?.formatting },
              ].map((item) => (
                <div key={item.label} className={`p-6 rounded-[2rem] border text-center transition-transform hover:-translate-y-1 hover:shadow-lg ${getHeatmapColor(item.status)} backdrop-blur-sm relative overflow-hidden group`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  <p className="font-bold text-sm uppercase tracking-[0.2em] opacity-80 mb-2 relative z-10">{item.label}</p>
                  <p className="text-3xl font-black relative z-10 drop-shadow-md tracking-tight">{item.status || "Unknown"}</p>
                </div>
              ))}
            </div>
          </ResultsCard>
        </div>

        <div className="space-y-10">
          <ResultsCard title="Major Red Flags" icon={<AlertTriangle className="w-7 h-7 text-red-400" />} className="border-t-[3px] border-t-red-500 shadow-[0_10px_50px_rgba(239,68,68,0.15)]">
            <ul className="space-y-5">
              {result.issues.map((issue, i) => (
                <li key={i} className="flex flex-col gap-4 p-6 rounded-[2rem] bg-brand-dark/40 border border-brand-border hover:bg-white/[0.03] hover:border-red-500/30 transition-all shadow-inner relative overflow-hidden group">
                  <div className="absolute left-0 top-0 w-1 h-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></div>
                  <div className="flex gap-5 items-start relative z-10">
                    <span className="text-red-500 font-bold shrink-0 mt-1 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] text-2xl bg-red-500/10 p-2 rounded-xl border border-red-500/20">🚩</span>
                    <span className="font-medium text-lg flex-1 leading-relaxed text-slate-200">{issue}</span>
                  </div>
                  
                  {improvedBullets[i] ? (
                    <div className="ml-[4.5rem] p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full"></div>
                      <div className="flex items-center gap-2 mb-3 font-bold text-sm uppercase tracking-[0.2em] relative z-10"><CheckCircle className="w-5 h-5 drop-shadow-md" /> Fixed Bullet</div>
                      <p className="font-medium text-white text-lg relative z-10">{improvedBullets[i]}</p>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleImproveBullet(issue, i)}
                      disabled={improvingIndex === i}
                      className="ml-[4.5rem] self-start flex items-center gap-2 text-sm font-bold text-brand-neon bg-brand-purple/10 px-5 py-3 rounded-xl border border-brand-purple/30 hover:bg-brand-purple hover:text-white hover:border-brand-purple hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:hover:bg-brand-purple/10 disabled:hover:text-brand-neon"
                    >
                      {improvingIndex === i ? (
                        <div className="w-5 h-5 border-2 border-brand-neon border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                      {improvingIndex === i ? "Applying AI Makeover..." : "✨ Improve this bullet"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </ResultsCard>

          <ResultsCard title="How to Fix This Mess" icon={<Lightbulb className="w-7 h-7 text-yellow-400" />} className="border-t-[3px] border-t-yellow-500 shadow-[0_10px_50px_rgba(234,179,8,0.1)]">
            <ul className="space-y-5">
              {result.suggestions.map((suggestion, i) => (
                <li key={i} className="flex gap-5 p-6 rounded-[2rem] bg-brand-dark/40 border border-brand-border hover:bg-white/[0.03] hover:border-yellow-500/30 transition-all shadow-inner relative overflow-hidden group">
                  <div className="absolute left-0 top-0 w-1 h-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors"></div>
                  <span className="text-yellow-400 font-bold shrink-0 mt-1 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] text-2xl bg-yellow-500/10 p-2 rounded-xl border border-yellow-500/20">🎯</span>
                  <span className="font-medium text-lg leading-relaxed text-slate-200">{suggestion}</span>
                </li>
              ))}
            </ul>
          </ResultsCard>

          <ResultsCard title="Rewrite Examples" icon={<PenTool className="w-7 h-7 text-emerald-400" />} className="border-t-[3px] border-t-emerald-500 shadow-[0_10px_50px_rgba(16,185,129,0.1)]">
            <div className="space-y-8">
              {result.rewrites.map((rewrite, i) => (
                <div key={i} className="bg-brand-dark/80 rounded-[2rem] border border-brand-border overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/10 group">
                  <div className="p-8 border-b border-brand-border bg-red-950/20 relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"></div>
                    <span className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-[0.2em] mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Before (Weak)
                    </span>
                    <p className="text-slate-300 font-medium text-lg leading-relaxed">&ldquo;{rewrite.before}&rdquo;</p>
                  </div>
                  <div className="p-8 bg-emerald-950/20 relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                    <span className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] mb-4">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div> After (Hired)
                    </span>
                    <p className="text-white font-bold text-xl leading-relaxed">&ldquo;{rewrite.after}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </ResultsCard>
        </div>
      </div>
    </main>
  );
}
