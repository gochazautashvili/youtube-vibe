import { deleteVideo } from "@/actions/video";
import { useToast } from "@/components/ui/use-toast";
import { VideoPages } from "@/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const useDeleteVideo = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,
    onSuccess: (deletedVideoId) => {
      const queryFilter: QueryFilters = { queryKey: ["videos"] };

      queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<VideoPages, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              videos: page.videos.filter((e) => e.id !== deletedVideoId),
            })),
          };
        },
      );

      toast({
        description: "Video deleted successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Something went wrong while deleting",
      });
    },
  });
};

export default useDeleteVideo;
