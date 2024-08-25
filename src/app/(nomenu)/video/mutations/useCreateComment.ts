import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createComment } from "../actions/comment";
import { CommentsPages } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const useCreateComment = (videoId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newData) => {
      const queryKey = ["comments", videoId];
      queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPages, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  comments: [newData, ...firstPage.comments],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Something went wrong. tray agin!",
      });
    },
  });
};

export default useCreateComment;
