import Sidebar from "@/components/navbar/Sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="sticky left-0 top-14 hidden h-[calc(100vh-56px)] w-[300px] md:block">
        <Sidebar />
      </div>
      <main className="container my-10">{children}</main>
    </div>
  );
};

export default layout;
