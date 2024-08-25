import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  img: string | undefined;
  className?: string;
}

const UserAvatar = ({ size, img, className }: Props) => {
  return (
    <img
      src={img || "/avatar_placeholder.jpg"}
      alt="avatar"
      width={size || 48}
      height={size || 48}
      className={cn(
        "shrink-0 cursor-pointer rounded-full bg-gray-400 object-cover",
        className,
      )}
    />
  );
};

export default UserAvatar;
