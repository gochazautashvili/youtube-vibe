"use server";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { cache } from "react";

const getUser = cache(async (): Promise<User | null> => {
  const id = cookies().get("user-session")?.value;

  if (!id) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id },
  });

  return user;
});

export default getUser;
