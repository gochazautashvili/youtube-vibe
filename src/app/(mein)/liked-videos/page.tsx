import getUser from "@/data/getUser";
import LikedVideos from "./LikedVideos";

const LikedVideosPage = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <p className="text-center text-destructive">
        You are not authorized, go and sign in to get this page
      </p>
    );
  }
  return <LikedVideos />;
};

export default LikedVideosPage;
