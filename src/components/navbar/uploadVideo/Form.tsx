import { useForm } from "react-hook-form";
import { video_schema, video_values } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form as VideoForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ThumbnailUpload from "./ThumbnailUpload";
import VideoUpload from "./VideoUpload";
import { useTransition } from "react";
import { create_video } from "./actions";
import LoadingButton from "@/components/LoadingButton";
import { useToast } from "@/components/ui/use-toast";

const Form = () => {
  const [isCreating, startCreate] = useTransition();
  const { toast } = useToast();
  const form = useForm<video_values>({
    resolver: zodResolver(video_schema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      video: "",
    },
  });

  const onUploadThumbnail = (thumbnail: string) => {
    form.setValue("thumbnail", thumbnail);
  };

  const onUploadVideo = (video: string) => {
    form.setValue("video", video);
  };

  function onSubmit(values: video_values) {
    startCreate(() => {
      create_video(values).then((res) => {
        if (!res.success) {
          toast({
            variant: "destructive",
            description: res.message?.toString(),
          });
        }

        if (res.success) {
          window.location.reload();
        }
      });
    });
  }

  return (
    <VideoForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-10">
          <div className="grid grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="video"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Video*</FormLabel>
                  <FormControl>
                    <VideoUpload onUploadVideo={onUploadVideo} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnail"
              render={() => (
                <FormItem>
                  <FormLabel>Upload Video Thumbnail*</FormLabel>
                  <FormControl>
                    <ThumbnailUpload onUploadThumbnail={onUploadThumbnail} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter video description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <LoadingButton
          loading={isCreating}
          className="mt-5 w-full"
          type="submit"
        >
          Submit
        </LoadingButton>
      </form>
    </VideoForm>
  );
};

export default Form;
