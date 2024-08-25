import DeleteFileButton from "@/components/DeleteFileButton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import FileResizer from "react-image-file-resizer";

interface Props {
  onUploadThumbnail: (thumbnail: string) => void;
}

const ThumbnailUpload = ({ onUploadThumbnail }: Props) => {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const { isUploading, startUpload } = useUploadThing("thumbnail", {
    onBeforeUploadBegin(files) {
      const renamedFile = files.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `youtube_thumbnail_${crypto.randomUUID()}.${extension}`,
          { type: file.type },
        );
      });

      return renamedFile;
    },
    onClientUploadComplete: (file) => {
      setImageUrl(file[0].serverData.url);
      onUploadThumbnail(file[0].serverData.url);
    },
    onUploadError: () => {
      toast({
        variant: "destructive",
        description:
          "Something went wrong while uploading thumbnail try again!",
      });
    },
    onUploadProgress(p) {
      setProgress(p);
    },
  });

  const handleStartUpload = (file: File | undefined) => {
    if (!file) return;

    FileResizer.imageFileResizer(
      file,
      1024,
      1024,
      "WEBP",
      100,
      0,
      (url) => startUpload([url as File]),
      "file",
    );
  };

  const onDelete = () => {
    setImageUrl("");
    onUploadThumbnail("");
  };

  return (
    <>
      {imageUrl ? (
        <div className="relative">
          <Image
            src={imageUrl}
            alt="uploaded thumbnail"
            className="h-[200px] w-full rounded border-2 border-dashed border-primary bg-primary/80 object-contain"
            width={400}
            height={200}
          />
          <DeleteFileButton url={imageUrl} onDelete={onDelete} />
        </div>
      ) : (
        <>
          <Button
            className="group h-[200px] w-full border-2 border-dashed border-primary bg-transparent outline-none hover:bg-transparent"
            disabled={isUploading}
            type="button"
            onClick={() => ref.current?.click()}
          >
            <input
              disabled={isUploading}
              ref={ref}
              type="file"
              multiple={false}
              accept="image/*"
              title="thumbnail"
              className="hidden"
              onChange={(e) => {
                handleStartUpload(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center text-center text-primary">
                <Loader2 className="animate-spin stroke-primary" />
                <p className="my-2">image is uploading</p>
                <Progress value={progress} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-primary opacity-60 group-hover:opacity-90">
                <Upload className="size-20" />
                <h1>Click to upload thumbnail</h1>
              </div>
            )}
          </Button>
        </>
      )}
    </>
  );
};

export default ThumbnailUpload;
