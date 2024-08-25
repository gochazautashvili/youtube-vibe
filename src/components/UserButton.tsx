"use client";
import UserAvatar from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { User } from "@prisma/client";
import { singOut } from "@/actions/auth";
import Link from "next/link";

interface Props {
  user: User;
}

const UserButton = ({ user }: Props) => {
  const { setTheme, theme } = useTheme();

  const logout = () => {
    singOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar img={user?.avatar} size={40} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-3 size-4" /> Light
              {theme === "light" && <Check className="ml-2 size-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-3 size-4" /> Dark
              {theme === "dark" && <Check className="ml-2 size-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Computer className="mr-3 size-4" /> System
              {theme === "system" && <Check className="ml-2 size-4" />}
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem asChild>
          <Link href={`/channel/${user.id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Sing out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
