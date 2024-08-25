"use client";
import InfinityScrollWrapper from "@/components/InfinityScrollWrapper";
import VideoCard from "@/components/VideoCard";
import VideoCardSkeletons from "@/components/VideoCardSkeletons";
import { VideoPages } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Props {
  query: string;
}

const ResultsVideos = ({ query }: Props) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, data } =
    useInfiniteQuery({
      queryKey: ["videos", "result"],
      queryFn: ({ pageParam }) =>
        axios
          .get<VideoPages>(
            `/api/videos/result/?cursor=${pageParam ? pageParam : ""}&query=${query}`,
          )
          .then((res) => res.data),
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

export default ResultsVideos;
