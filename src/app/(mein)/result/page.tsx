import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ResultsVideos = dynamic(() => import("./ResultsVideos"), {
  ssr: false,
  loading: () => <Loader2 className="mx-auto my-10 animate-spin" />,
});

interface Props {
  searchParams: {
    query: string;
  };
}

const ResultPage = ({ searchParams }: Props) => {
  return (
    <Suspense
      fallback={<Loader2 className="mx-auto my-10 animate-spin" />}
      key={searchParams.query}
    >
      <ResultsVideos query={searchParams.query} />
    </Suspense>
  );
};

export default ResultPage;
