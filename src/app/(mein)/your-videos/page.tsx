import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const YourVideos = dynamic(() => import("./YourVideos"), {
  ssr: false,
  loading: () => <Loader2 className="mx-auto my-10 animate-spin" />,
});

const YourVideosPage = () => {
  return <YourVideos />;
};

export default YourVideosPage;
