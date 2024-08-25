import React from "react";
import SubscriptionVideos from "./SubscriptionVideos";
import getUser from "@/data/getUser";

const SubscriptionPage = async () => {
  const user = await getUser();

  if (!user) {
    return (
      <p className="text-center text-destructive">
        You are not authorized, go and sign in to get this page
      </p>
    );
  }

  return <SubscriptionVideos />;
};

export default SubscriptionPage;
