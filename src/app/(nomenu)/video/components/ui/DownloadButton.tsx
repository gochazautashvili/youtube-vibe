"use client";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { download } from "../../actions/video";
import { useTransition } from "react";

interface Props {
  videoUrl: string;
}

const DownloadButton = ({ videoUrl }: Props) => {
  const [isDownloading, startDownload] = useTransition();
  const handleDownload = () => {
    startDownload(() => {
      download(videoUrl).then((res) => {
        const link = document.createElement("a");
        link.href = res;
        link.setAttribute("download", "video.mp4");
        document.body.appendChild(link);
        link.click();
        link?.parentNode?.removeChild(link);
      });
    });
  };

  return (
    <Button
      disabled={isDownloading}
      onClick={handleDownload}
      className="bg-blue-600 hover:bg-blue-800 dark:bg-blue-400"
    >
      {isDownloading ? (
        <Loader2 className="mr-4 size-5 animate-spin" />
      ) : (
        <Download className="mr-4 size-5" />
      )}
      Download
    </Button>
  );
};

export default DownloadButton;
