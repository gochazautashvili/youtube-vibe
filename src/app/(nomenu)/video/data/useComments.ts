import { CommentsPages } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useComments = (videoId: string) => {
  return useInfiniteQuery({
    queryKey: ["comments", videoId],
    queryFn: ({ pageParam }) =>
      axios
        .get<CommentsPages>(
          `/api/comments/${videoId}?cursor=${pageParam ? pageParam : ""}`,
        )
        .then((res) => res.data),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useComments;
