"use client";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  className: string;
}

const Search = ({ className }: Props) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const onSUbmit = (e: FormEvent) => {
    e.preventDefault();

    router.push(`/result?query=${query}`);
  };

  return (
    <form
      onSubmit={onSUbmit}
      className={cn(
        "flex h-11 w-10/12 items-center overflow-hidden rounded-3xl border border-primary",
        className,
      )}
    >
      <Input
        onChange={(e) => setQuery(e.target.value)}
        className="h-full w-full rounded-none border-none text-base outline-none"
        placeholder="Search"
      />
      <Button type="submit" className="h-full rounded-none dark:bg-black">
        <SearchIcon className="dark:fill-white" />
      </Button>
    </form>
  );
};

export default Search;
