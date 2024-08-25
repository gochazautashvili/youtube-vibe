"use client";
import { User } from "@prisma/client";
import { createContext, ReactNode } from "react";

interface Props {
  children: ReactNode;
  user: User | null;
}
export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children, user }: Props) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
