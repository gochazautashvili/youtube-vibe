import { notFound } from "next/navigation";
import Channel from "./Channel";
import Videos from "./Videos";
import { getChannelById } from "./actions";
import getUser from "@/data/getUser";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: { userId: string };
}

const YourChannelPage = async ({ params: { userId } }: Props) => {
  if (!userId) {
    notFound();
  }

  const user = await getChannelById(userId);
  const loggedInUser = await getUser();

  if (!user) {
    notFound();
  }

  return (
    <section className="lg:px-10">
      <Channel user={user} loggedInUser={loggedInUser} />
      <Separator className="mb-12 mt-5" />
      <Videos user={user} loggedInUser={loggedInUser} />
    </section>
  );
};

export default YourChannelPage;
