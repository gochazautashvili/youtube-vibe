import { InitialSubscribeType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSubscribe = (
  initialSubscribed: InitialSubscribeType,
  userId: string,
  isUserSignIn: boolean,
) => {
  return useQuery({
    queryKey: ["subscribe", userId],
    queryFn: () =>
      axios
        .get<InitialSubscribeType>(`/api/subscribe/${userId}`)
        .then((res) => res.data),
    enabled: isUserSignIn,
    initialData: initialSubscribed,
  });
};

export default useSubscribe;
