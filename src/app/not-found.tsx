import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex h-[calc(100vh-56px)] w-full flex-col items-center pt-16 text-center">
      <h1 className="text-[80px] font-black md:text-[120px]">404</h1>
      <h1 className="text-[60px] font-semibold md:text-[80px]">
        Page Not Found
      </h1>
      <Button
        asChild
        size="lg"
        variant="link"
        className="bg-blue-500 text-white"
      >
        <Link href="/">GO TO HOMEPAGE</Link>
      </Button>
    </main>
  );
};

export default NotFound;
