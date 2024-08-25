import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteComment } from "../actions/comment";
import { CommentsPages } from "@/types";

const useDeleteComment = (videoId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      const queryKey = ["comments", videoId];

      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPages, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => {
              return {
                nextCursor: page.nextCursor,
                comments: page.comments.filter((e) => e.id !== data.id),
              };
            }),
          };
        },
      );
    },
  });
};

export default useDeleteComment;
