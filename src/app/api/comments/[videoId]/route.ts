import getUser from "@/data/getUser";
import db from "@/lib/db";
import { commentsInclude, CommentsPages } from "@/types";
import { NextRequest } from "next/server";

interface Props {
  params: {
    videoId: string;
  };
}

export async function GET(req: NextRequest, { params: { videoId } }: Props) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 12;

    const user = await getUser();

    const comments = await db.comment.findMany({
      where: { videoId },
      take: pageSize + 1,
      include: commentsInclude(user?.id),
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      comments.length > pageSize ? comments[pageSize].id : null;

    const data: CommentsPages = {
      comments: comments.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
