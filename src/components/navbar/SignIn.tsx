"use client";
import { Button } from "../ui/button";

const SignIn = () => {
  return (
    <Button className="bg-blue-800" asChild>
      <a href="/api/google/sign-in">Sign in</a>
    </Button>
  );
};

export default SignIn;
