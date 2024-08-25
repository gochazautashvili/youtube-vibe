import { VideoPages } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useVideos = (videoId: string) => {
  return useInfiniteQuery({
    queryKey: ["videos", "single-page", videoId],
    queryFn: ({ pageParam }) =>
      axios
        .get<VideoPages>(`/api/videos?cursor=${pageParam ? pageParam : ""}`)
        .then((res) => res.data),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

export default useVideos;
