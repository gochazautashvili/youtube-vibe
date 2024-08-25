"use client";
import InfinityScrollWrapper from "@/components/InfinityScrollWrapper";
import UploadVideoDialog from "@/components/navbar/uploadVideo/UploadVideoDialog";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/VideoCard";
import VideoCardSkeletons from "@/components/VideoCardSkeletons";
import { VideoPages } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, PlusSquare } from "lucide-react";
import { useState } from "react";

interface Props {
  userId: string;
  loggedInUserId?: string;
}

const UserVideos = ({ userId, loggedInUserId }: Props) => {
  const [open, setOpen] = useState(false);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, data } =
    useInfiniteQuery({
      queryKey: ["videos", "users"],
      queryFn: ({ pageParam }) =>
        axios
          .get<VideoPages>(
            `/api/videos/user/${userId}?cursor=${pageParam ? pageParam : ""}`,
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

  const handleOpenChange = () => {
    setOpen(!open);
  };

  if (videos.length < 1) {
    if (loggedInUserId === userId) {
      return (
        <div className="flex flex-col items-center">
          <p className="mb-1 mt-10 text-center">You have not videos yet!</p>
          <Button size="lg" onClick={handleOpenChange}>
            <PlusSquare className="mr-3 size-5" />
            Create
          </Button>
          {open && (
            <UploadVideoDialog
              open={open}
              handleOpenChange={handleOpenChange}
            />
          )}
        </div>
      );
    } else {
      return <p className="my-10 text-center">There is not any video yet!</p>;
    }
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

export default UserVideos;
