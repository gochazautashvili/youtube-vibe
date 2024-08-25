"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Form from "./Form";

interface Props {
  open: boolean;
  handleOpenChange: () => void;
}

const UploadVideoDialog = ({ handleOpenChange, open }: Props) => {
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[95%] rounded md:max-w-[80%]  max-h-[600px] overflow-y-auto">
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <Form />
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoDialog;
