import { delete_file } from "@/actions/files";
import { cn } from "@/lib/utils";
import { Loader2, X } from "lucide-react";
import { useTransition } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface Props {
  url: string;
  className?: string;
  onDelete: () => void;
}

const DeleteFileButton = ({ url, className, onDelete }: Props) => {
  const [isDeleting, startDelete] = useTransition();
  const { toast } = useToast();

  const handleDeleteFile = () => {
    if (isDeleting) return;

    startDelete(() => {
      delete_file(url).then((res) => {
        if (!res.success) {
          toast({
            variant: "destructive",
            description: res.message,
          });
        }

        if (res.success) {
          onDelete();
          toast({
            description: res.message,
          });
        }
      });
    });
  };

  return (
    <Button
      type="button"
      size="icon"
      variant="destructive"
      className={cn("absolute right-2 top-2", className)}
    >
      {isDeleting ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <X className="cursor-pointer" onClick={handleDeleteFile} />
      )}
    </Button>
  );
};

export default DeleteFileButton;
