import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ResumeRoast - AI Resume Reviewer",
  description: "The brutally honest resume reviewer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-brand-darker text-slate-50 min-h-screen antialiased selection:bg-brand-neon selection:text-brand-darker`}>
        {children}
      </body>
    </html>
  );
}
