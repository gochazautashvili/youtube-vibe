import { Prisma } from "@prisma/client";

export type GoogleUserType = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export type VideoPages = {
  nextCursor: string | null;
  videos: videoDataIncludeType[];
};

export type CommentsPages = {
  nextCursor: string | null;
  comments: commentsIncludeType[];
};

export type InitialSubscribeType = {
  isSubscribed: boolean;
  subscribeCount: number;
};

export type InitialLikeType = {
  isLiked: boolean;
  likeCount: number;
};

// prisma types

// video include

export const videoDataInclude = {
  user: true,
  _count: {
    select: { histories: true },
  },
} satisfies Prisma.VideoInclude;

export type videoDataIncludeType = Prisma.VideoGetPayload<{
  include: typeof videoDataInclude;
}>;

// single video include

export const singleVideoInclude = (loggedInUserId: string | undefined) => {
  return {
    likes: {
      where: { userId: loggedInUserId || undefined },
    },
    user: {
      include: {
        _count: {
          select: {
            subscriber: true,
          },
        },
        subscriber: {
          where: { subscriberId: loggedInUserId || undefined },
        },
      },
    },
    _count: {
      select: {
        likes: true,
      },
    },
  } satisfies Prisma.VideoInclude;
};

export type singleVideoIncludeType = Prisma.VideoGetPayload<{
  include: ReturnType<typeof singleVideoInclude>;
}>;

// comment include

export const commentsInclude = (loggedInUserId: string | undefined) => {
  return {
    user: true,
    _count: { select: { likes: { where: { userId: loggedInUserId } } } },
    likes: { where: { userId: loggedInUserId } },
  } satisfies Prisma.CommentInclude;
};

export type commentsIncludeType = Prisma.CommentGetPayload<{
  include: ReturnType<typeof commentsInclude>;
}>;

// channel include

export const channelInclude = (loggedInUserId: string | undefined) => {
  return {
    _count: {
      select: { subscriber: true, videos: true },
    },
    subscriber: {
      where: { subscriberId: loggedInUserId || undefined },
    },
  } satisfies Prisma.UserInclude;
};

export type channelIncludeType = Prisma.UserGetPayload<{
  include: ReturnType<typeof channelInclude>;
}>;
