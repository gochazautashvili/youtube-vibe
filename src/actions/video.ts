"use server";
import getUser from "@/data/getUser";
import db from "@/lib/db";
import { delete_file } from "./files";

interface Props {
  videoId: string;
  userId: string;
}

export const deleteVideo = async ({ userId, videoId }: Props) => {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    if (user.id !== userId) {
      throw new Error("This video is not yours");
    }

    const deletedVideo = await db.video.delete({
      where: { id: videoId },
    });

    await Promise.all([
      delete_file(deletedVideo.thumbnail),
      delete_file(deletedVideo.video),
    ]);

    return deletedVideo.id;
  } catch (error) {
    throw new Error("Internal server error");
  }
};
