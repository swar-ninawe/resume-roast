import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResultsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ResultsCard({ title, icon, children, className }: ResultsCardProps) {
  return (
    <div className={cn("bg-brand-card border border-brand-border rounded-[2rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden group", className)}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none group-hover:bg-brand-neon/10 transition-colors duration-500"></div>
      
      <div className="relative z-10 flex items-center gap-4 mb-8 border-b border-brand-border/50 pb-6">
        <div className="w-12 h-12 rounded-[1rem] bg-brand-dark/80 flex items-center justify-center text-brand-neon shadow-inner border border-brand-border group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{title}</h2>
      </div>
      <div className="relative z-10 text-slate-300 leading-relaxed text-lg font-light">
        {children}
      </div>
    </div>
  );
}
