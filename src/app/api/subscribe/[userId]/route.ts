import getUser from "@/data/getUser";
import db from "@/lib/db";
import { InitialSubscribeType } from "@/types";

interface Props {
  params: {
    userId: string;
  };
}

export async function GET(req: Request, { params: { userId } }: Props) {
  try {
    const loggedInUser = await getUser();

    if (!loggedInUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        subscriber: {
          where: {
            subscribeId: loggedInUser.id,
          },
          select: { subscribeId: true },
        },
        _count: {
          select: {
            subscriber: true,
          },
        },
      },
    });

    if (!user) {
      return new Response("User does not exist!", { status: 404 });
    }

    const initialSubscribe: InitialSubscribeType = {
      isSubscribed: !!user.subscriber.length,
      subscribeCount: user._count.subscriber,
    };

    return Response.json(initialSubscribe);
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}
