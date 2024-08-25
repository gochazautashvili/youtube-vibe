"use client";
import { Button } from "@/components/ui/button";
import { InitialLikeType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { dislike, like } from "../../actions/likes";
import { cn, formateNumber } from "@/lib/utils";

interface Props {
  initialLikeState: {
    isLiked: boolean;
    likeCount: number;
  };
  isUserSignIn: boolean;
  videoId: string;
}

const LikeButton = ({ initialLikeState, isUserSignIn, videoId }: Props) => {
  const { data } = useQuery({
    queryKey: ["likes", videoId],
    queryFn: () =>
      axios
        .get<InitialLikeType>(`/api/likes/${videoId}`)
        .then((res) => res.data),
    enabled: isUserSignIn,
    initialData: initialLikeState,
  });

  const queryClient = useQueryClient();
  const queryKey = ["likes", videoId];

  const { mutate } = useMutation({
    mutationFn: !data.isLiked ? like : dislike,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<InitialLikeType>(queryKey);

      queryClient.setQueryData<InitialLikeType>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          isLiked: !oldData.isLiked,
          likeCount: oldData.isLiked
            ? oldData.likeCount - 1
            : oldData.likeCount + 1,
        };
      });

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData<InitialLikeType>(
        queryKey,
        context?.previousState,
      );
    },
  });

  return (
    <Button
      onClick={() => mutate(videoId)}
      disabled={!isUserSignIn}
      className={cn(
        "disabled:bg-gray-600",
        data.isLiked && "bg-blue-600 hover:bg-blue-800",
      )}
    >
      <Heart
        className={cn(
          "mr-2 size-5",
          data.isLiked && "fill-red-500 stroke-red-500",
        )}
      />
      {formateNumber(data.likeCount)}
    </Button>
  );
};

export default LikeButton;
