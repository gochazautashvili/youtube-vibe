import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface Props extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({ loading, ...props }: Props) => {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading && <Loader2 className="mr-2 size-5 animate-spin" />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
