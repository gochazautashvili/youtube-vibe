"use client";
import InfinityScrollWrapper from "@/components/InfinityScrollWrapper";
import VideoCard from "@/components/VideoCard";
import VideoCardSkeletons from "@/components/VideoCardSkeletons";
import useUser from "@/hooks/useUser";
import { VideoPages } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const YourVideos = () => {
  const user = useUser();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, data } =
    useInfiniteQuery({
      queryKey: ["videos", "your-videos"],
      queryFn: ({ pageParam }) =>
        axios
          .get<VideoPages>(
            `/api/videos/your-videos?cursor=${pageParam ? pageParam : ""}`,
          )
          .then((res) => res.data),
      enabled: !!user,
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const videos = data?.pages.flatMap((page) => page.videos) || [];

  const onBottomReached = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  };

  if (!user) {
    return (
      <p className="text-center text-destructive">
        You are not authorized, go and sign in to get this page
      </p>
    );
  }

  if (isLoading) {
    return <VideoCardSkeletons />;
  }

  if (videos.length < 1) {
    return <p className="my-10 text-center">There is not any video yet!</p>;
  }

  return (
    <>
      <InfinityScrollWrapper
        onBottomReached={onBottomReached}
        className="flex w-full flex-wrap justify-center gap-10"
      >
        {videos?.map((video) => {
          return <VideoCard key={video?.id} video={video} />;
        })}
      </InfinityScrollWrapper>
      {isFetchingNextPage && <Loader2 className="mx-auto mt-10 animate-spin" />}
    </>
  );
};

export default YourVideos;
