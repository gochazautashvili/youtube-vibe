"use server";
import utapi from "@/lib/uploadthingAPI";

export const delete_file = async (url: string) => {
  try {
    const fileId = url.split(`/a/${process.env.UPLOADTHING_APP_ID}/`)[1];

    await utapi.deleteFiles(fileId);

    return { success: true, message: "image successfully deleted :)" };
  } catch (error) {
    return { success: false, message: "Internal server error!" };
  }
};
