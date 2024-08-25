import getUser from "@/data/getUser";
import db from "@/lib/db";
import { videoDataInclude, VideoPages } from "@/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

  let pageSize = 12;

  const user = await getUser();

  if (!user) {
    return new Response("Unauthorized!");
  }

  try {
    const videos = await db.video.findMany({
      where: { userId: user.id },
      take: pageSize + 1,
      include: videoDataInclude,
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = videos.length > pageSize ? videos[pageSize].id : null;

    const data: VideoPages = {
      videos: videos.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    return new Response("Internal server error!");
  }
}
