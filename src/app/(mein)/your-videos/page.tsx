import getUser from "@/data/getUser";
import YourVideos from "./YourVideos";

const YourVideosPage = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <p className="text-center text-destructive">
        You are not authorized, go and sign in to get this page
      </p>
    );
  }

  return <YourVideos />;
};

export default YourVideosPage;
