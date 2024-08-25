"use client";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import CropDialog from "./CropDialog";
import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";

interface Props {
  img: string;
  userId: string;
}

const EditAvatar = ({ img, userId }: Props) => {
  const { toast } = useToast();
  const [imageToCrop, setImageToCrop] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { isUploading, startUpload } = useUploadThing("avatar", {
    onBeforeUploadBegin(files) {
      const renamedFile = files.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `youtube_avatar_${crypto.randomUUID()}.${extension}`,
          { type: file.type },
        );
      });

      return renamedFile;
    },
    onClientUploadComplete: (file) => {
      router.refresh();
    },
    onUploadError: () => {
      toast({
        variant: "destructive",
        description: "Something went wrong while uploading banner try again!",
      });
    },
  });

  const onImageSelected = (image: File | undefined) => {
    if (!image) return;

    Resizer.imageFileResizer(
      image,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (url) => setImageToCrop(url as File),
      "file",
    );
  };

  const handleStartUpload = (croppedFile: Blob | null) => {
    const newBanner = croppedFile
      ? new File([croppedFile], `banner_${userId}.webp`)
      : undefined;

    if (!newBanner) return;

    startUpload([newBanner]);
  };

  return (
    <div
      className={cn(
        "group relative flex h-[120px] w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full",
        isUploading && "animate-pulse bg-gray-400",
      )}
    >
      {isUploading ? (
        <Loader2 className="absolute animate-spin" />
      ) : (
        <Edit
          onClick={() => ref.current?.click()}
          className="absolute h-full w-full p-12 opacity-0 hover:bg-black/50 group-hover:opacity-100"
        />
      )}
      <input
        disabled={isUploading}
        ref={ref}
        type="file"
        multiple={false}
        accept="image/*"
        title="banner"
        className="hidden"
        onChange={(e) => onImageSelected(e.target.files?.[0])}
      />
      <UserAvatar className="cursor-default" img={img} size={120} />
      {imageToCrop && (
        <CropDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRation={1}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileRef.current) {
              fileRef.current.value = "";
            }
          }}
          onCropped={handleStartUpload}
        />
      )}
    </div>
  );
};

export default EditAvatar;
