import Link from "next/link";
import { ArrowRight, FileText, CheckCircle, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-brand-dark relative overflow-hidden">
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-neon/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-4000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center mt-20">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-purple/10 text-brand-neon font-semibold mb-8 border border-brand-purple/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] animate-float">
          <Zap className="w-4 h-4" />
          <span>AI-Powered Resume Analysis</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-lg">
          Upload your resume.<br/>Let AI roast it.
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
          The brutally honest, no-mercy resume reviewer that helps you land jobs by destroying your buzzwords.
        </p>
        
        <Link 
          href="/upload" 
          className="group relative inline-flex items-center gap-3 bg-brand-purple hover:bg-brand-neon text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 shadow-[0_0_40px_rgba(147,51,234,0.5)] hover:shadow-[0_0_60px_rgba(192,132,252,0.6)] hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          <span className="relative">Roast My Resume</span> 
          <ArrowRight className="w-6 h-6 relative group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        <div className="bg-brand-card p-10 rounded-[2rem] border border-brand-border backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-white/10 group">
          <div className="bg-red-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-red-500 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <span className="text-3xl">🔥</span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">"Synergy" Detector</h3>
          <p className="text-slate-400 leading-relaxed text-lg">We find overused buzzwords and publicly shame your choice of vocabulary.</p>
        </div>
        <div className="bg-brand-card p-10 rounded-[2rem] border border-brand-border backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-white/10 group">
          <div className="bg-brand-purple/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-brand-neon shadow-inner group-hover:scale-110 transition-transform duration-500">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">ATS Score</h3>
          <p className="text-slate-400 leading-relaxed text-lg">See exactly why the robot recruiters are auto-rejecting your masterpiece.</p>
        </div>
        <div className="bg-brand-card p-10 rounded-[2rem] border border-brand-border backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-white/10 group">
          <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-emerald-400 shadow-inner group-hover:scale-110 transition-transform duration-500">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Brutal But Helpful</h3>
          <p className="text-slate-400 leading-relaxed text-lg">We'll rewrite your weak bullet points so you actually sound like you accomplished something.</p>
        </div>
      </div>
    </main>
  );
}
