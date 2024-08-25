import DeleteFileButton from "@/components/DeleteFileButton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { Loader2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  onUploadVideo: (video: string) => void;
}

const VideoUpload = ({ onUploadVideo }: Props) => {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLInputElement>(null);
  const { isUploading, startUpload } = useUploadThing("video", {
    onBeforeUploadBegin(files) {
      const renamedFile = files.map((file) => {
        const extension = file.name.split(".").pop();

        return new File(
          [file],
          `youtube_video_${crypto.randomUUID()}.${extension}`,
          { type: file.type },
        );
      });

      return renamedFile;
    },
    onClientUploadComplete: (file) => {
      setVideoUrl(file[0].serverData.url);
      onUploadVideo(file[0].serverData.url);
    },
    onUploadError: () => {
      toast({
        variant: "destructive",
        description: "Something went wrong while uploading video try again!",
      });
    },
    onUploadProgress(p) {
      setProgress(p);
    },
  });

  const handleStartUpload = (file: File[] | undefined) => {
    if (!file || file.length > 1) return;

    startUpload(file);
  };

  const onDelete = () => {
    setVideoUrl("");
    onUploadVideo("");
  };

  return (
    <>
      {videoUrl ? (
        <div className="relative">
          <video
            autoPlay
            src={videoUrl}
            className="object-contain/70 h-[200px] w-full rounded border-2 border-dashed border-primary bg-primary/80"
            width={400}
            height={200}
          />
          <DeleteFileButton url={videoUrl} onDelete={onDelete} />
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
              accept="video/*"
              title="thumbnail"
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                handleStartUpload(files);
                e.target.value = "";
              }}
            />
            {isUploading ? (
              <div className="flex flex-col items-center justify-center text-center text-primary">
                <Loader2 className="animate-spin stroke-primary" />
                <p className="my-2">video is uploading</p>
                <Progress value={progress} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-primary opacity-60 group-hover:opacity-90">
                <UploadCloud className="size-20" />
                <h1>Click to upload video</h1>
              </div>
            )}
          </Button>
        </>
      )}
    </>
  );
};

export default VideoUpload;
