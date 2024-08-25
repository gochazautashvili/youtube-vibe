import CreateVideo from "./CreateVideo";
import MenuButton from "./MenuButton";
import Notifications from "./Notifications";
import Search from "./Search";
import SearchInput from "./SearchInput";
import UserButton from "../UserButton";
import SignIn from "./SignIn";
import getUser from "@/data/getUser";

const Navbar = async () => {
  const user = await getUser();

  return (
    <header className="sticky left-0 right-0 top-0 z-50 flex h-14 w-full items-center bg-white dark:bg-black">
      <nav className="flex w-full items-center justify-between px-3">
        <MenuButton />
        <Search className="mx-10 hidden max-w-[500px] md:flex" />
        <div className="flex items-center gap-3">
          <SearchInput />
          {!user ? (
            <SignIn />
          ) : (
            <>
              <CreateVideo />
              <Notifications />
              <UserButton user={user} />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
