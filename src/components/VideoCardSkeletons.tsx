import { Skeleton } from "./ui/skeleton";

const VideoCardSkeletons = () => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-10">
      <VideoCardSkeleton />
      <VideoCardSkeleton />
      <VideoCardSkeleton />
    </div>
  );
};

export default VideoCardSkeletons;

const VideoCardSkeleton = () => {
  return (
    <div className="flex max-w-[400px] flex-1 basis-[350px] flex-col gap-4">
      <Skeleton className="h-[220px] w-full rounded-xl" />
      <div className="flex w-full items-start gap-3">
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-2 w-full max-w-[180px]" />
          <Skeleton className="h-2 w-full max-w-[130px]" />
        </div>
      </div>
    </div>
  );
};
