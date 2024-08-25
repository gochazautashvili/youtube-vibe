import getUser from "@/data/getUser";
import db from "@/lib/db";
import { InitialLikeType } from "@/types";

interface Props {
  params: {
    videoId: string;
  };
}

export async function GET(req: Request, { params: { videoId } }: Props) {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const video = await db.video.findUnique({
      where: { id: videoId },
      select: {
        likes: {
          where: {
            userId: loggedInUser.id,
          },
          select: { userId: true },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    if (!video) {
      return new Response("Video does not exist!", { status: 404 });
    }

    const initialLike: InitialLikeType = {
      isLiked: !!video.likes.length,
      likeCount: video._count.likes,
    };

    return Response.json(initialLike);
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
