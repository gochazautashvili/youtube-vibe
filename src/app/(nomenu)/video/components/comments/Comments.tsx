"use client";
import InfinityScrollWrapper from "@/components/InfinityScrollWrapper";
import CommentCard from "./CommentCard";
import { Loader2 } from "lucide-react";
import CreateComment from "./CreateComment";
import useComments from "../../data/useComments";
import useUser from "@/hooks/useUser";

interface Props {
  videoId: string;
}

const Comments = ({ videoId }: Props) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useComments(videoId);
  const user = useUser();

  const onBottomReached = () => {
    if (!isLoading && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  if (isLoading) {
    return <Loader2 className="mx-auto mt-5 animate-spin" />;
  }

  return (
    <div className="w-full">
      <CreateComment videoId={videoId} userId={user?.id} />
      {comments.length < 1 && (
        <p className="text-center">There is not any comment yet.</p>
      )}
      <InfinityScrollWrapper
        onBottomReached={onBottomReached}
        className="mt-6 flex flex-col gap-4"
      >
        {comments?.map((comment) => (
          <CommentCard key={comment?.id} comment={comment} userId={user?.id} />
        ))}
        {isFetchingNextPage && (
          <Loader2 className="mx-auto mt-5 animate-spin" />
        )}
      </InfinityScrollWrapper>
    </div>
  );
};

export default Comments;
