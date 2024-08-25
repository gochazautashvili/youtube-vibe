"use server";

import getUser from "@/data/getUser";
import db from "@/lib/db";
import { channelInclude } from "@/types";
import { revalidatePath } from "next/cache";

export const getChannelById = async (userId: string) => {
  try {
    const loggedInUser = await getUser();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { id: userId },
      include: channelInclude(loggedInUser?.id),
    });

    return user;
  } catch (error) {
    throw new Error("Internal server error!");
  }
};

export const editChannel = async (username: string, userId: string) => {
  try {
    const user = await getUser();

    if (!user) {
      return { error: "Unauthorized" };
    }

    if (user.id !== userId) {
      return { error: "This channel is not your" };
    }

    await db.user.update({
      where: { id: user.id },
      data: { username },
    });

    revalidatePath(`/channel/${user.id}`);
    return { success: "Channel updated successfully :)" };
  } catch (error) {
    return { error: "Internal server error" };
  }
};
