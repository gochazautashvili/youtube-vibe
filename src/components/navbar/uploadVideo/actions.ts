"use server";

import db from "@/lib/db";
import { video_schema, video_values } from "./validations";
import { videoDataInclude } from "@/types";
import getUser from "@/data/getUser";

export const create_video = async (values: video_values) => {
  try {
    const user = await getUser();

    if (!user) {
      return { success: false, message: "Unauthorized" };
    }

    const { data, error } = video_schema.safeParse(values);

    if (error) {
      return { success: false, message: error };
    }

    const video = await db.video.create({
      data: { ...data, userId: user.id },
      include: videoDataInclude,
    });

    return { success: true, video };
  } catch (error) {
    return { success: false, message: "Internal server error!" };
  }
};
