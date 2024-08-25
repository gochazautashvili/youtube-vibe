import { videoDataIncludeType } from "@/types";
import Image from "next/image";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { formateNumber, formateRelativeDate } from "@/lib/utils";
import { usePathname } from "next/navigation";
import useUser from "@/hooks/useUser";
import VideoDeleteButton from "./VideoDeleteButton";

interface Props {
  video: videoDataIncludeType;
}

const VideoCard = ({ video }: Props) => {
  const pathname = usePathname();
  const user = useUser();

  const canDelete =
    user?.id === video.userId && pathname.includes(`/channel/${user.id}`);

  return (
    <div className="group relative max-w-[400px] flex-1 basis-[350px]">
      {canDelete && <VideoDeleteButton videoId={video.id} userId={user.id} />}
      <Link href={`/video/${video.id}`}>
        <div className="relative h-[200px] w-full">
          <Image
            fill
            priority
            alt={video.title}
            src={video.thumbnail}
            className="h-full w-full cursor-pointer rounded-xl object-cover a"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="mt-2 flex items-start gap-3">
        <Link href={`/channel/${video.user.id}`}>
          <UserAvatar img={video.user.avatar} size={38} />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/video/${video.id}`}
            className="line-clamp-1 text-base font-semibold"
          >
            {video.title}
          </Link>
          <Link
            href={`/channel/${video.user.id}`}
            className="text-sm text-gray-600 dark:text-gray-300"
          >
            {video.user.username}
          </Link>
          <p className="text-xs text-gray-400">
            {formateNumber(video._count.histories)} views .{" "}
            {formateRelativeDate(new Date(video.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
