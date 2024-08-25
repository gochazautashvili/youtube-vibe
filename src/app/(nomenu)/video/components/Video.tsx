import UserAvatar from "@/components/UserAvatar";
import { singleVideoIncludeType } from "@/types";
import getUser from "@/data/getUser";
import Link from "next/link";
import SubscriberCount from "./ui/SubscriberCount";
import SubscribeButton from "./ui/SubscribeButton";
import LikeButton from "./ui/LikeButton";
import DownloadButton from "./ui/DownloadButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface Props {
  video: singleVideoIncludeType;
}

const Video = async ({ video }: Props) => {
  const user = await getUser();
  const initialSubscribedState = {
    isSubscribed: video.user.subscriber.some(
      (subscribe) => subscribe.subscriberId === user?.id,
    ),
    subscribeCount: video.user._count.subscriber,
  };

  const initialLikeState = {
    isLiked: video.likes.some((like) => like.userId === user?.id),
    likeCount: video._count.likes,
  };

  return (
    <div className="w-full">
      <video
        className="w-full rounded-lg border border-gray-300 bg-black object-contain lg:aspect-video"
        width={900}
        height={500}
        src={video.video}
        autoPlay
        controls
      />
      <h1 className="mt-4 text-xl md:text-2xl font-bold">{video.title}</h1>
      <h1 className="mb-4 mt-2 text-sm md:text-base font-semibold">{video.description}</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-start gap-3">
            <Link href={`/channel/${video.user.id}`}>
              <UserAvatar img={video.user.avatar} />
            </Link>
            <div>
              <Link
                href={`/channel/${video.user.id}`}
                className="text-base font-semibold"
              >
                {video.user.username}
              </Link>
              <SubscriberCount
                userId={video.user.id}
                initialSubscribed={initialSubscribedState}
                isUserSignIn={!!user}
              />
            </div>
          </div>
          <SubscribeButton
            className="hidden md:flex"
            userId={video.user.id}
            loggedInUser={user}
            initialSubscribed={initialSubscribedState}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <SubscribeButton
                userId={video.user.id}
                loggedInUser={user}
                initialSubscribed={initialSubscribedState}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LikeButton
                className="w-full"
                isUserSignIn={!!user}
                initialLikeState={initialLikeState}
                videoId={video.id}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadButton videoUrl={video.video} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="hidden items-center gap-4 md:flex">
          <LikeButton
            isUserSignIn={!!user}
            initialLikeState={initialLikeState}
            videoId={video.id}
          />
          <DownloadButton videoUrl={video.video} />
        </div>
      </div>
    </div>
  );
};

export default Video;
