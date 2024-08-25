import { getSingleVideo } from "../actions/video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Video from "../components/Video";
import AsideVideos from "../components/videoAside/AsideVideos";
import Comments from "../components/comments/Comments";

interface Props {
  params: { videoId: string };
}

const SingleVideoPage = async ({ params: { videoId } }: Props) => {
  const video = await getSingleVideo(videoId);

  if (!video) {
    return (
      <p className="my-10 text-center text-xl text-destructive">
        Video can not found! try agin
      </p>
    );
  }

  return (
    <main className="container grid lg:grid-cols-4 lg:px-14">
      <div className="lg:col-span-3">
        <Video video={video} />
        <Tabs
          defaultValue="videos"
          className="my-10 flex w-full flex-col items-center lg:hidden"
        >
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="videos">
              Videos
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="comments">
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent className="mt-10 w-full" value="videos">
            <AsideVideos videoId={videoId} />
          </TabsContent>
          <TabsContent className="mt-10 w-full" value="comments">
            <Comments videoId={videoId} />
          </TabsContent>
        </Tabs>
        <div className="my-10 hidden lg:flex">
          <Comments videoId={videoId} />
        </div>
      </div>
      <div className="hidden min-w-[350px] px-3 lg:flex">
        <AsideVideos videoId={videoId} />
      </div>
    </main>
  );
};

export default SingleVideoPage;
