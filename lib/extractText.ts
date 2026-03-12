import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export async function extractTextFromFile(buffer: Buffer, mimetype: string): Promise<string> {
  if (mimetype === "application/pdf") {
    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (e) {
      console.error("PDF Parsing error:", e);
      throw new Error("Failed to parse PDF file. The file might be corrupted or password protected.");
    }
  }

  if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (e) {
      console.error("DOCX Parsing error:", e);
      throw new Error("Failed to parse DOCX file.");
    }
  }

  throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
}
