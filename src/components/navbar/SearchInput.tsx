"use client";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import Search from "./Search";

const SearchInput = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const handleOpenSearch = () => {
    setOpenSearch(true);
  };

  return (
    <>
      <SearchIcon
        onClick={handleOpenSearch}
        className="cursor-pointer md:hidden"
      />
      {openSearch && (
        <div className="absolute left-0 right-0 top-0 flex w-full items-center justify-between bg-white px-3 py-2 md:static md:w-fit">
          <ArrowLeft
            className="size-10 cursor-pointer rounded-full p-2 transition hover:bg-gray-100 md:hidden"
            onClick={() => setOpenSearch(false)}
          />
          <Search className="flex md:hidden" />
        </div>
      )}
    </>
  );
};

export default SearchInput;
