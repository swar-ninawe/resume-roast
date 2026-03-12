"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function ResumeUpload() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState("Brutal Recruiter");

  const ROAST_MODES = [
    { id: "Brutal Recruiter", icon: "🔥", label: "Brutal Recruiter" },
    { id: "Meme Roast", icon: "😂", label: "Meme Roast" },
    { id: "Professional Feedback", icon: "🧑‍💼", label: "Professional" },
    { id: "ATS Robot Mode", icon: "🤖", label: "ATS Robot" },
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("mode", mode);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume. The AI might be too disgusted.");
      }

      const data = await response.json();
      
      // Store result in sessionStorage to pass to results page
      sessionStorage.setItem("roastResult", JSON.stringify(data));
      
      // Navigate to results
      router.push("/results");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      {/* Decorative background glow behind the uploader */}
      <div className="absolute inset-0 bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

      {!file ? (
        <div
          {...getRootProps()}
          className={`relative z-10 border-2 border-dashed rounded-[2rem] p-16 text-center cursor-pointer transition-all duration-500 flex flex-col items-center justify-center min-h-[400px] backdrop-blur-xl shrink-0
            ${isDragActive ? "border-brand-neon bg-brand-purple/10 shadow-[0_0_50px_rgba(192,132,252,0.2)] scale-[1.02]" : "border-brand-border bg-brand-card hover:border-brand-purple/50 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(147,51,234,0.1)] hover:-translate-y-1"}
            ${isDragReject ? "border-red-500 bg-red-500/10 shadow-[0_0_50px_rgba(239,68,68,0.2)]" : ""}
          `}
        >
          <input {...getInputProps()} />
          <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 shadow-inner ${isDragActive ? "bg-brand-neon/20 text-brand-neon scale-110" : "bg-white/5 text-slate-400 group-hover:bg-brand-purple/10 group-hover:text-brand-neon"}`}>
            <UploadCloud className="w-12 h-12" />
          </div>
          <p className="text-3xl font-extrabold mb-4 text-white tracking-tight">
            {isDragActive ? "Drop it like it's hot..." : "Drag & drop your resume here"}
          </p>
          <p className="text-slate-400 text-lg font-light">Supports .PDF and .DOCX (Max 5MB)</p>
          
          <div className="mt-10 px-8 py-4 bg-brand-dark/50 rounded-full font-semibold text-slate-300 hover:text-white transition-all duration-300 border border-brand-border hover:border-brand-purple hover:bg-brand-purple/20 shadow-lg">
            Or browse files
          </div>
        </div>
      ) : (
        <div className="relative z-10 bg-brand-card rounded-[2rem] p-10 border border-brand-border backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-6 mb-10 p-6 bg-brand-dark/50 rounded-2xl border border-brand-border shadow-inner">
            <div className="w-16 h-16 bg-brand-purple/20 rounded-xl flex items-center justify-center text-brand-neon">
              <File className="w-8 h-8" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-xl truncate text-white mb-1">{file.name}</p>
              <p className="text-sm text-slate-400 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button 
              onClick={() => setFile(null)}
              className="text-sm px-6 py-3 rounded-xl bg-brand-card text-slate-300 hover:text-white hover:bg-white/10 transition-all border border-brand-border hover:border-white/20"
              disabled={isLoading}
            >
              Change File
            </button>
          </div>

          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`group relative w-full py-6 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden
              ${isLoading 
                ? "bg-brand-dark/50 text-slate-500 cursor-not-allowed border border-brand-border" 
                : "bg-brand-purple hover:bg-brand-neon text-white shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:shadow-[0_0_60px_rgba(192,132,252,0.6)] hover:-translate-y-1"
              }
            `}
          >
            {!isLoading && (
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            )}
            
            <span className="relative flex items-center gap-3">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing... Brace yourself.
                </>
              ) : (
                "Start The Roast"
              )}
            </span>
          </button>
        </div>
      )}

      {!isLoading && (
        <div className="mt-12 relative z-10">
          <p className="text-center text-slate-400 font-bold mb-6 uppercase tracking-[0.2em] text-sm">Select Personality Mode</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ROAST_MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`py-5 px-3 rounded-[1.5rem] flex flex-col items-center gap-3 transition-all duration-300 border backdrop-blur-md ${
                  mode === m.id 
                    ? "bg-brand-purple/20 border-brand-neon shadow-[0_0_25px_rgba(192,132,252,0.3)] text-white scale-105 z-10" 
                    : "bg-brand-card border-brand-border text-slate-400 hover:bg-white/5 hover:text-slate-300 hover:border-brand-purple/30 hover:-translate-y-1"
                }`}
              >
                <span className="text-3xl drop-shadow-md mb-1">{m.icon}</span>
                <span className="font-semibold text-sm text-center">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3 text-red-400 shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
