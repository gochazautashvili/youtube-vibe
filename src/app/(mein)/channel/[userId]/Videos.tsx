import { channelIncludeType } from "@/types";
import { User } from "@prisma/client";
import UserVideos from "./UserVideos";

interface Props {
  user: channelIncludeType;
  loggedInUser: User | null;
}

const Videos = ({ loggedInUser, user }: Props) => {
  return <UserVideos userId={user.id} loggedInUserId={loggedInUser?.id} />;
};

export default Videos;
