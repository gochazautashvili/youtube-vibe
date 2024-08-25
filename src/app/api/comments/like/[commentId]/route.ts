import getUser from "@/data/getUser";
import db from "@/lib/db";
import { InitialLikeType } from "@/types";

interface Props {
  params: {
    commentId: string;
  };
}

export async function GET(req: Request, { params: { commentId } }: Props) {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const comment = await db.comment.findUnique({
      where: { id: commentId },
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

    if (!comment) {
      return new Response("Comment does not exist!", { status: 404 });
    }

    const initialLike: InitialLikeType = {
      isLiked: !!comment.likes.length,
      likeCount: comment._count.likes,
    };

    return Response.json(initialLike);
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
