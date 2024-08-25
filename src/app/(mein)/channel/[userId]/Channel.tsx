import SubscribeButton from "@/app/(nomenu)/video/components/ui/SubscribeButton";
import UserAvatar from "@/components/UserAvatar";
import { channelIncludeType } from "@/types";
import { User } from "@prisma/client";
import Image from "next/image";
import SubscriberCount from "@/app/(nomenu)/video/components/ui/SubscriberCount";
import EditButton from "./EditButton";
import Banner from "./Banner";
import EditAvatar from "./EditAvatar";

interface Props {
  user: channelIncludeType;
  loggedInUser: User | null;
}

const Channel = ({ user, loggedInUser }: Props) => {
  const initialSubscribedState = {
    isSubscribed: user.subscriber.some(
      (subscribe) => subscribe.subscriberId === user?.id,
    ),
    subscribeCount: user._count.subscriber,
  };

  const owner = loggedInUser?.id === user.id;

  return (
    <div>
      {owner ? (
        <Banner img={user.banner} userId={user.id} />
      ) : (
        <div className="relative h-[170px] w-full">
          <Image
            fill
            src={user.banner || "/banner.jpg"}
            alt="user banner"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
      )}
      <div className="mt-6 flex gap-4">
        {owner ? (
          <EditAvatar userId={user.id} img={user.avatar} />
        ) : (
          <div>
            <UserAvatar img={user.avatar} size={120} />
          </div>
        )}
        <div>
          <h1 className="mb-2 text-3xl font-semibold">{user?.username}</h1>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          <div className="my-1 text-sm text-gray-600">
            <SubscriberCount
              initialSubscribed={initialSubscribedState}
              isUserSignIn={!!loggedInUser}
              userId={user.id}
            />
          </div>
          {owner ? (
            <EditButton user={loggedInUser} />
          ) : (
            <SubscribeButton
              initialSubscribed={initialSubscribedState}
              loggedInUser={loggedInUser}
              userId={user.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Channel;
