import { ResumeUpload } from "@/components/ResumeUpload";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UploadPage() {
  return (
    <main className="min-h-screen p-8 bg-brand-dark text-slate-50 flex flex-col items-center relative overflow-hidden">
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-neon/10 rounded-full blur-[150px] mix-blend-screen animate-blob animation-delay-4000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-3xl relative z-10 pt-12">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-12 group bg-brand-card px-5 py-2.5 rounded-full border border-brand-border backdrop-blur-md shadow-lg hover:shadow-brand-purple/20 hover:border-brand-purple/50">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500 drop-shadow-lg">Prepare for Destruction</h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light">Upload your PDF or DOCX file. We will judge you.</p>
        </div>

        <ResumeUpload />
      </div>
    </main>
  );
}
