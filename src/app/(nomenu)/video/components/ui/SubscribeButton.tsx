"use client";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { subscribe, unsubscribe } from "../../actions/subscribe";
import { InitialSubscribeType } from "@/types";
import useSubscribe from "@/hooks/useSubscribe";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  loggedInUser: User | null;
  initialSubscribed: InitialSubscribeType;
  userId: string;
  className?: string;
}

const SubscribeButton = ({
  initialSubscribed,
  loggedInUser,
  userId,
  className,
}: Props) => {
  const { data } = useSubscribe(initialSubscribed, userId, !!loggedInUser);

  const queryClient = useQueryClient();
  const queryKey = ["subscribe", userId];

  const { mutate } = useMutation({
    mutationFn: !data.isSubscribed ? subscribe : unsubscribe,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey });

      const previousState =
        queryClient.getQueryData<InitialSubscribeType>(queryKey);

      queryClient.setQueryData<InitialSubscribeType>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          isSubscribed: !oldData.isSubscribed,
          subscribeCount: oldData.isSubscribed
            ? oldData.subscribeCount - 1
            : oldData.subscribeCount + 1,
        };
      });

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData<InitialSubscribeType>(
        queryKey,
        context?.previousState,
      );
    },
  });

  const isMyVideo = userId === loggedInUser?.id;

  return (
    <Button
      onClick={() => mutate(userId)}
      variant={data.isSubscribed ? "destructive" : "default"}
      disabled={!loggedInUser || isMyVideo}
      className={cn("rounded-lg disabled:bg-gray-600", className)}
    >
      <Bell className="mr-4 size-5" />
      {data.isSubscribed ? "Unsubscribe" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
