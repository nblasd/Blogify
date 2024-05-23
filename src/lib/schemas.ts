import { z } from "zod";

export const newPostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const commentFormSchema = z.object({
  comment: z.string(),
});
