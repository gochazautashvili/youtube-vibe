"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LoadingButton from "@/components/LoadingButton";
import useCreateComment from "../../mutations/useCreateComment";

interface Props {
  videoId: string;
  userId?: string;
}

const CreateComment = ({ videoId, userId }: Props) => {
  const [body, setBody] = useState("");
  const { mutate, isPending } = useCreateComment(videoId);

  const onSubmit = (e: any) => {
    e.preventDefault();

    mutate(
      { body, videoId },
      {
        onSuccess: () => {
          setBody("");
        },
      },
    );
  };

  return (
    <form className="mb-3 flex w-full items-center gap-2" onSubmit={onSubmit}>
      <Input
        disabled={isPending}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Comment"
        className="w-full"
        value={body}
      />
      <LoadingButton
        loading={isPending}
        className="disabled:bg-gray-600"
        disabled={!body || !userId}
      >
        Comment
      </LoadingButton>
    </form>
  );
};

export default CreateComment;
