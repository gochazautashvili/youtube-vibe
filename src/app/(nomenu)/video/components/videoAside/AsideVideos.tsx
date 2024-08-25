"use client";
import InfinityScrollWrapper from "@/components/InfinityScrollWrapper";
import { Loader2 } from "lucide-react";
import AsideVideoCard from "./AsideVideoCard";
import useVideos from "../../data/useVideos";

const AsideVideos = ({ videoId }: { videoId: string }) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, data } =
    useVideos(videoId);

  const videos = data?.pages.flatMap((page) => page.videos) || [];

  const onBottomReached = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Loader2 className="mx-auto mt-5 animate-spin" />;
  }

  if (videos.length < 1) {
    return (
      <p className="mx-auto my-10 text-center">There is not any video yet!</p>
    );
  }

  return (
    <InfinityScrollWrapper
      onBottomReached={onBottomReached}
      className="mr-auto space-y-4 lg:ml-auto lg:mr-0"
    >
      {videos.map((video) => (
        <AsideVideoCard key={video.id} video={video} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto mt-5 animate-spin" />}
    </InfinityScrollWrapper>
  );
};

export default AsideVideos;
