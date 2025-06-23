import z from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publishDate: z.string().min(1, "Publish date is required"),
});
