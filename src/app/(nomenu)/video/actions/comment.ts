"use server";
import getUser from "@/data/getUser";
import db from "@/lib/db";
import { commentsInclude } from "@/types";

interface Props {
  body: string;
  videoId: string;
}

export const createComment = async ({ body, videoId }: Props) => {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const comment = await db.comment.create({
      data: {
        body,
        userId: user.id,
        videoId,
      },
      include: commentsInclude(user?.id),
    });

    return comment;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    if (!commentId) {
      throw new Error("CommentId not found!");
    }

    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const deletedComment = await db.comment.delete({
      where: { id: commentId, userId: user.id },
      select: { id: true },
    });

    return deletedComment;
  } catch (error) {
    throw new Error("Internal server error");
  }
};
