import { delete_file } from "@/actions/files";
import getUser from "@/data/getUser";
import db from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnail: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const url = file.url.replace(
        "/f/",
        `/a/${process.env.UPLOADTHING_APP_ID}/`,
      );

      return { uploadedBy: metadata.userId, url };
    }),
  video: f({ video: { maxFileSize: "128MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getUser();

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const url = file.url.replace(
        "/f/",
        `/a/${process.env.UPLOADTHING_APP_ID}/`,
      );

      return { uploadedBy: metadata.userId, url };
    }),
  banner: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getUser();

      if (!user) throw new UploadThingError("Unauthorized");

      if (user.banner) {
        await delete_file(user.banner);
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const url = file.url.replace(
        "/f/",
        `/a/${process.env.UPLOADTHING_APP_ID}/`,
      );

      await db.user.update({
        where: { id: metadata.userId },
        data: { banner: url },
      });

      return { uploadedBy: metadata.userId, url };
    }),
  avatar: f({ image: { maxFileSize: "512KB", maxFileCount: 1 } })
    .middleware(async () => {
      const user = await getUser();

      if (!user) throw new UploadThingError("Unauthorized");

      if (user.avatar) {
        await delete_file(user.avatar);
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const url = file.url.replace(
        "/f/",
        `/a/${process.env.UPLOADTHING_APP_ID}/`,
      );

      await db.user.update({
        where: { id: metadata.userId },
        data: { avatar: url },
      });

      return { uploadedBy: metadata.userId, url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
