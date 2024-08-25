"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const singOut = () => {
  cookies().delete("user-session");

  redirect("/");
};
