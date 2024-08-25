"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import CropDialog from "./CropDialog";

interface Props {
  img: string | null;
  userId: string;
}

const Banner = ({ img, userId }: Props) => {
  const { toast } = useToast();
  const [imageToCrop, setImageToCrop] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { isUploading, startUpload } = useUploadThing("banner", {
    onBeforeUploadBegin(files) {
      const renamedFile = files.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `youtube_banner_${crypto.randomUUID()}.${extension}`,
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
    <>
      <div
        className={cn(
          "group relative h-[170px] w-full overflow-hidden rounded-lg",
          isUploading && "animate-pulse",
        )}
      >
        <Image
          fill
          src={img || "/banner.jpg"}
          alt="user banner"
          className="rounded-lg bg-black/40 object-center"
        />
        <div className="absolute h-full w-full group-hover:bg-black/30" />
        <Button
          disabled={isUploading}
          onClick={() => ref.current?.click()}
          className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100"
        >
          {isUploading ? (
            <Loader2 className="mr-3 size-5 animate-spin" />
          ) : (
            <Edit className="mr-3 size-5" />
          )}
          Edit
        </Button>
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
      </div>
      {imageToCrop && (
        <CropDialog
          src={URL.createObjectURL(imageToCrop)}
          cropAspectRation={3}
          onClose={() => {
            setImageToCrop(undefined);
            if (fileRef.current) {
              fileRef.current.value = "";
            }
          }}
          onCropped={handleStartUpload}
        />
      )}
    </>
  );
};

export default Banner;
