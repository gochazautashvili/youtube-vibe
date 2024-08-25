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
import useDeleteVideo from "@/hooks/useDeleteVideo";
import { Button } from "./ui/button";

interface Props {
  videoId: string;
  userId: string;
}

const VideoDeleteButton = ({ videoId, userId }: Props) => {
  const [isDeleting, startDeleting] = useTransition();
  const [open, setOpen] = useState(false);

  const { mutate } = useDeleteVideo();

  const handleDeleteVideo = () => {
    startDeleting(() => {
      mutate(
        { videoId, userId },
        {
          onSuccess: () => {
            setOpen(false);
          },
        },
      );
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          className="absolute right-3 top-3 z-10 cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <EllipsisVertical onClick={() => setOpen(true)} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This video will be deleted
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
              onClick={handleDeleteVideo}
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

export default VideoDeleteButton;
