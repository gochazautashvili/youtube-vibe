import React from "react";
import SubscriptionVideos from "./SubscriptionVideos";
import getUser from "@/data/getUser";
import { notFound } from "next/navigation";

const SubscriptionPage = async () => {
  const user = await getUser();

  if (!user) {
    notFound();
  }

  return <SubscriptionVideos />;
};

export default SubscriptionPage;
