import getUser from "@/data/getUser";
import db from "@/lib/db";
import { singleVideoInclude } from "@/types";

export const getSingleVideo = async (id: string) => {
  const user = await getUser();

  const video = await db.video.findUnique({
    where: { id },
    include: singleVideoInclude(user?.id),
  });

  if (user) {
    await db.history.upsert({
      where: { userId_videoId: { videoId: id, userId: user?.id } },
      create: { videoId: id, userId: user?.id },
      update: {},
    });
  }

  return video;
};

export const download = async (url: string) => {
  const res = await fetch(url);

  const blob = await res.blob();

  const link = window.URL.createObjectURL(new Blob([blob]));

  return link;
};
