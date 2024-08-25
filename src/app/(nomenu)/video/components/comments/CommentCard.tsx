import UserAvatar from "@/components/UserAvatar";
import { commentsIncludeType, InitialLikeType } from "@/types";
import CommentLikeButton from "./CommentLikeButton";
import CommentDeleteButton from "./CommentDeleteButton";
import Link from "next/link";
import { formateRelativeDate } from "@/lib/utils";

interface Props {
  comment: commentsIncludeType;
  userId?: string;
}

const CommentCard = ({ comment, userId }: Props) => {
  const initialLikeState: InitialLikeType = {
    isLiked: comment.likes.some((like) => like.userId === userId),
    likeCount: comment._count.likes,
  };

  return (
    <div className="group flex items-start justify-between gap-5">
      <div className="flex items-start gap-5">
        <div>
          <UserAvatar size={50} img={comment.user.avatar} />
        </div>
        <div className="flex flex-col">
          <Link
            href={`/channel/${userId}`}
            className="flex items-center gap-2 font-semibold"
          >
            {comment.user.username}

            <span className="text-sm text-gray-700">
              {formateRelativeDate(new Date(comment.createdAt))}
            </span>
          </Link>
          <p>{comment.body}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <CommentLikeButton
          initialLikeState={initialLikeState}
          commentId={comment.id}
          videoId={comment.videoId}
        />
        <CommentDeleteButton commentId={comment.id} videoId={comment.videoId} />
      </div>
    </div>
  );
};

export default CommentCard;
