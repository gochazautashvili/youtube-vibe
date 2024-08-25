import db from "@/lib/db";
import { videoDataInclude, VideoPages } from "@/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
  const query = req.nextUrl.searchParams.get("query") || undefined;

  let pageSize = 12;

  try {
    const videos = await db.video.findMany({
      where: {
        OR: [{ title: { search: query } }, { description: { search: query } }],
      },
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
