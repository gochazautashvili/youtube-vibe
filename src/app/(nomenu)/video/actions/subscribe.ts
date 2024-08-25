"use server";
import getUser from "@/data/getUser";
import db from "@/lib/db";

export const subscribe = async (userId: string) => {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      throw new Error("Unauthorized");
    }

    if (loggedInUser.id === userId) {
      throw new Error("This user is you!");
    }

    await db.subscribe.create({
      data: {
        subscribeId: userId,
        subscriberId: loggedInUser.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);

    throw new Error("Internal server error");
  }
};

export const unsubscribe = async (userId: string) => {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      throw new Error("Unauthorized");
    }

    await db.subscribe.delete({
      where: {
        subscribeId_subscriberId: {
          subscribeId: userId,
          subscriberId: loggedInUser.id,
        },
      },
    });

    return { success: true };
  } catch (error) {
    throw new Error("Internal server error");
  }
};
