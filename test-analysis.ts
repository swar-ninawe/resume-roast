import { analyzeResume } from "./lib/ai";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function run() {
  try {
    const text = "This is a dummy resume. I have 10 years of experience as a software engineer.";
    const result = await analyzeResume(text, "Brutal Recruiter");
    console.log("SUCCESS:", result);
  } catch (err) {
    console.error("FAILED:", err);
  }
}
run();
