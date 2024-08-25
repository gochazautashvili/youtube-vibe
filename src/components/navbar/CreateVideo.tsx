"use client";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import UploadVideoDialog from "./uploadVideo/UploadVideoDialog";

const CreateVideo = () => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    setOpen(!open);
  };

  return (
    <>
      <PlusSquare onClick={handleOpenChange} className="cursor-pointer" />
      {open && (
        <UploadVideoDialog open={open} handleOpenChange={handleOpenChange} />
      )}
    </>
  );
};

export default CreateVideo;
