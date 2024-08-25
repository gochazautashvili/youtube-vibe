import UserAvatar from "@/components/UserAvatar";
import { singleVideoIncludeType } from "@/types";
import getUser from "@/data/getUser";
import Link from "next/link";
import SubscriberCount from "./ui/SubscriberCount";
import SubscribeButton from "./ui/SubscribeButton";
import LikeButton from "./ui/LikeButton";
import DownloadButton from "./ui/DownloadButton";

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
      <h1 className="my-4 text-2xl font-bold">{video.title}</h1>
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
            userId={video.user.id}
            loggedInUser={user}
            initialSubscribed={initialSubscribedState}
          />
        </div>
        <div className="flex items-center gap-4">
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
