import React from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
const SubscriptionVideos = dynamic(() => import("./SubscriptionVideos"), {
  ssr: false,
  loading: () => <Loader2 className="mx-auto my-10 animate-spin" />,
});

const SubscriptionPage = () => {
  return <SubscriptionVideos />;
};

export default SubscriptionPage;
