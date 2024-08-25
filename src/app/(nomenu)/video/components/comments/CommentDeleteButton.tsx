import { EllipsisVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useTransition } from "react";
import LoadingButton from "@/components/LoadingButton";
import useDeleteComment from "../../mutations/useDeleteComment";

interface Props {
  commentId: string;
  videoId: string;
}

const CommentDeleteButton = ({ commentId, videoId }: Props) => {
  const [isDeleting, startDeleting] = useTransition();
  const [open, setOpen] = useState(false);

  const { mutate } = useDeleteComment(videoId);

  const handleDeleteComment = () => {
    startDeleting(() => {
      mutate(commentId, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <EllipsisVertical
          onClick={() => setOpen(true)}
          className="cursor-pointer opacity-0 group-hover:opacity-100"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This comment will be deleted
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} autoFocus>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              variant="destructive"
              className="bg-red-500 hover:bg-red-700 dark:text-white"
              onClick={handleDeleteComment}
              loading={isDeleting}
            >
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommentDeleteButton;
