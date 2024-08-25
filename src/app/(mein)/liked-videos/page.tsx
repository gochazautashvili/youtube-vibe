import getUser from "@/data/getUser";
import LikedVideos from "./LikedVideos";
import { notFound } from "next/navigation";

const LikedVideosPage = async () => {
  const user = await getUser();

  if (!user) {
    notFound();
  }

  return <LikedVideos />;
};

export default LikedVideosPage;
