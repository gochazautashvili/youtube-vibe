import {
  Film,
  History,
  House,
  SquareUser,
  ThumbsUp,
  Video,
} from "lucide-react";

export const sidebarLinks = [
  {
    link: "/",
    name: "Home",
    icon: <House />,
  },
  {
    link: "/subscriptions",
    name: "Subscriptions",
    icon: <Film />,
  },
];

export const sidebarLinksYou = (userId?: string) => [
  {
    link: !!userId ? `/channel/${userId}` : "/",
    name: "Your channel",
    icon: <SquareUser />,
  },
  {
    link: "/history",
    name: "History",
    icon: <History />,
  },
  {
    link: "/your-videos",
    name: "Your videos",
    icon: <Video />,
  },
  {
    link: "/liked-videos",
    name: "Liked videos",
    icon: <ThumbsUp />,
  },
];
