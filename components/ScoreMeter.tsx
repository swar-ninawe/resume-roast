import { cn } from "@/lib/utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ScoreMeterProps {
  score: number;
}

export function ScoreMeter({ score }: ScoreMeterProps) {
  let color = "#ef4444"; // red-500
  let textColor = "text-red-500";
  let bg = "bg-red-500/10";
  let border = "border-red-500/30";
  let shadow = "shadow-[0_0_30px_rgba(239,68,68,0.2)]";
  
  let verdict = "💀 Recruiter Nightmare";
  
  if (score >= 60) {
    color = "#eab308"; // yellow-500
    textColor = "text-yellow-400";
    bg = "bg-yellow-400/10";
    border = "border-yellow-400/30";
    shadow = "shadow-[0_0_30px_rgba(250,204,21,0.2)]";
    verdict = "⚠️ Needs Improvement";
  }
  if (score >= 80) {
    color = "#10b981"; // emerald-500
    textColor = "text-emerald-400";
    bg = "bg-emerald-400/10";
    border = "border-emerald-400/30";
    shadow = "shadow-[0_0_30px_rgba(16,185,129,0.2)]";
    verdict = "🔥 Hireable";
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className={cn("relative w-48 h-48 md:w-64 md:h-64 p-5 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-md border", bg, border, shadow)}>
        <CircularProgressbar
          value={score}
          text={`${score}`}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: "rgba(255, 255, 255, 0.05)",
            textSize: "26px",
          })}
        />
        <span className="absolute bottom-10 md:bottom-14 text-slate-400 font-bold tracking-widest text-xs md:text-sm uppercase drop-shadow-sm pointer-events-none">
          ATS Score
        </span>
      </div>
      
      <div className="mt-8 text-center bg-brand-dark/50 px-6 py-4 rounded-2xl border border-brand-border shadow-lg">
        <p className="text-slate-400 font-bold mb-2 uppercase tracking-[0.2em] text-xs">Resume Verdict</p>
        <p className={cn("text-xl md:text-2xl font-black drop-shadow-md tracking-tight", textColor)}>
          {verdict}
        </p>
      </div>
    </div>
  );
}
