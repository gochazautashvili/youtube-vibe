import ResultsVideos from "./ResultsVideos";

interface Props {
  searchParams: {
    query: string;
  };
}

const ResultPage = ({ searchParams }: Props) => {
  return <ResultsVideos query={searchParams.query} />;
};

export default ResultPage;
