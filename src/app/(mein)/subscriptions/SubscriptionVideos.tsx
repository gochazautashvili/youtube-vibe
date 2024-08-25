"use client";
import InfinityScrollWrapper from "@/components/InfinityScrollWrapper";
import VideoCard from "@/components/VideoCard";
import VideoCardSkeletons from "@/components/VideoCardSkeletons";
import useUser from "@/hooks/useUser";
import { VideoPages } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

const SubscriptionVideos = () => {
  const user = useUser();

  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, data } =
    useInfiniteQuery({
      queryKey: ["videos", "subscription"],
      queryFn: ({ pageParam }) =>
        axios
          .get<VideoPages>(
            `/api/videos/subscription?cursor=${pageParam ? pageParam : ""}`,
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

  if (isLoading) {
    return <VideoCardSkeletons />;
  }

  if (videos.length < 1) {
    return (
      <p className="my-10 text-center">
        There is not any video yet! subscribe users to see there videos
      </p>
    );
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
      {!user && (
        <p className="my-10 text-center">
          Unauthorized, sign in to see all your history
        </p>
      )}
      {isFetchingNextPage && <Loader2 className="mx-auto mt-10 animate-spin" />}
    </>
  );
};

export default SubscriptionVideos;
