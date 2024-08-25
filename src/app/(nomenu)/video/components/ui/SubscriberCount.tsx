"use client";

import useSubscribe from "@/hooks/useSubscribe";
import { formateNumber } from "@/lib/utils";
import { InitialSubscribeType } from "@/types";

interface Props {
  initialSubscribed: InitialSubscribeType;
  userId: string;
  isUserSignIn: boolean;
}

const SubscriberCount = ({
  initialSubscribed,
  userId,
  isUserSignIn,
}: Props) => {
  const { data } = useSubscribe(initialSubscribed, userId, isUserSignIn);

  return (
    <p className="text-sm text-gray-400">
      {formateNumber(data.subscribeCount)}{" "}
      {data.subscribeCount > 1 ? "subscribers" : "subscriber"}
    </p>
  );
};

export default SubscriberCount;
