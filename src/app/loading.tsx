import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="flex h-[calc(100vh-56px)] w-full items-center justify-center bg-black/10">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
};

export default loading;
