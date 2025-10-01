import { z } from "zod";

export const youtubeUrlSchema = z.string()
  .trim()
  .url({ message: "Please enter a valid URL" })
  .refine(
    (url) => {
      try {
        const urlObj = new URL(url);
        return (
          urlObj.hostname === "www.youtube.com" ||
          urlObj.hostname === "youtube.com" ||
          urlObj.hostname === "youtu.be" ||
          urlObj.hostname === "m.youtube.com"
        );
      } catch {
        return false;
      }
    },
    { message: "Please enter a valid YouTube URL" }
  )
  .transform((url) => url.trim());

export const pdfFileSchema = z
  .instanceof(File)
  .refine((file) => file.type === "application/pdf", {
    message: "File must be a PDF",
  })
  .refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "File size must be less than 10MB",
  });

export const courseContentSchema = z.object({
  sourceType: z.enum(["youtube", "pdf", "text"]),
  content: z.string().trim().min(1, { message: "Content cannot be empty" }).max(10000, { message: "Content is too long" }),
});
