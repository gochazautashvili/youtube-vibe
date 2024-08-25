"use server";
import getUser from "@/data/getUser";
import db from "@/lib/db";

export const like = async (videoId: string) => {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      throw new Error("Unauthorized");
    }

    await db.like.create({
      data: {
        type: "VIDEO",
        userId: loggedInUser.id,
        videoId: videoId,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const dislike = async (videoId: string) => {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      throw new Error("Unauthorized");
    }

    await db.like.deleteMany({
      where: {
        userId: loggedInUser.id,
        videoId,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const likeComment = async (commentId: string) => {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      throw new Error("Unauthorized");
    }

    await db.like.create({
      data: {
        type: "COMMENT",
        userId: loggedInUser.id,
        commentId: commentId,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const dislikeComment = async (commentId: string) => {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      throw new Error("Unauthorized");
    }

    await db.like.deleteMany({
      where: {
        userId: loggedInUser.id,
        commentId,
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Internal server error");
  }
};
