import { z } from "zod";

export const newPostSchema = z.object({
  title: z.string().min(2),
  content: z.string().min(2),
});

export const commentFormSchema = z.object({
  comment: z.string(),
});
