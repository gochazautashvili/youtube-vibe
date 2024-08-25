import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  className?: string;
  children: ReactNode;
  onBottomReached: () => void;
}

const InfinityScrollWrapper = ({
  children,
  onBottomReached,
  className,
}: Props) => {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange(inView) {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfinityScrollWrapper;
