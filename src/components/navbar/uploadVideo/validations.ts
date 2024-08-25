import { z } from "zod";

const requiredString = z.string().min(1);

export const video_schema = z.object({
  title: requiredString,
  description: requiredString,
  thumbnail: z.string().min(1, { message: "you must upload thumbnail" }),
  video: z.string().min(1, { message: "you must upload video" }),
});

export type video_values = z.infer<typeof video_schema>;
