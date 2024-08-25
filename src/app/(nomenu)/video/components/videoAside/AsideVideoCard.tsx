import { formateNumber, formateRelativeDate } from "@/lib/utils";
import { videoDataIncludeType } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  video: videoDataIncludeType;
}

const AsideVideoCard = ({ video }: Props) => {
  return (
    <div className="flex w-full shrink-0 gap-2">
      <Link className="shrink-0" href={`/video/${video.id}`}>
        <div>
          <Image
            width={170}
            height={100}
            alt={video.title}
            src={video.thumbnail}
            className="h-[100px] w-[170px] shrink-0 cursor-pointer rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col p-px">
        <Link className="line-clamp-2 font-medium" href={`/video/${video.id}`}>
          {video.title}
        </Link>
        <Link
          href={`/channel/${video.id}`}
          className="mb-px mt-1 text-sm text-gray-400"
        >
          {video.user.username}
        </Link>
        <p className="text-xs text-gray-400">
          {formateNumber(video._count.histories)} view .{" "}
          {formateRelativeDate(new Date(video.createdAt))}
        </p>
      </div>
    </div>
  );
};

export default AsideVideoCard;
