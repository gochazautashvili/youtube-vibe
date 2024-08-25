import getUser from "@/data/getUser";
import YourVideos from "./YourVideos";
import { notFound } from "next/navigation";

const YourVideosPage = async () => {
  const user = await getUser();

  if (!user) {
    notFound();
  }

  return <YourVideos />;
};

export default YourVideosPage;
