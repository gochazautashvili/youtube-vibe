import { Button } from "@/components/ui/button";
import { cn, formateNumber } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { likeComment } from "../../actions/likes";
import { InitialLikeType } from "@/types";
import axios from "axios";

interface Props {
  commentId: string;
  videoId: string;
  initialLikeState: InitialLikeType;
}

const CommentLikeButton = ({ commentId, videoId, initialLikeState }: Props) => {
  const queryKey = ["comment-likes", commentId, videoId];
  const queryCLient = useQueryClient();

  const { data } = useQuery({
    queryKey,
    queryFn: () =>
      axios
        .get<InitialLikeType>(`/api/comments/like/${commentId}`)
        .then((res) => res.data),
    initialData: initialLikeState,
  });

  const { mutate } = useMutation({
    mutationFn: likeComment,
    onMutate: () => {
      queryCLient.cancelQueries({ queryKey });

      queryCLient.setQueryData<InitialLikeType>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          isLiked: !oldData?.isLiked,
          likeCount: oldData?.isLiked
            ? oldData.likeCount - 1
            : oldData.likeCount + 1,
        };
      });
    },
  });

  return (
    <Button
      onClick={() => mutate(commentId)}
      variant={data.isLiked ? "destructive" : "outline"}
    >
      <Heart
        className={cn("mr-2 size-5", data.isLiked && "fill-white stroke-white")}
      />
      {formateNumber(data.likeCount)}
    </Button>
  );
};

export default CommentLikeButton;
