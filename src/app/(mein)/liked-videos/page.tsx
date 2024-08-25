import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LikedVideos = dynamic(() => import("./LikedVideos"), {
  ssr: false,
  loading: () => <Loader2 className="mx-auto my-10 animate-spin" />,
});

const LikedVideosPage = () => {
  return <LikedVideos />;
};

export default LikedVideosPage;
