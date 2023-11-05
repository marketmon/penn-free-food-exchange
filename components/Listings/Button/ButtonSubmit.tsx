import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonSubmitProps = {
  isLoading: boolean;
  disabled: boolean;
};

export default function ButtonSubmit({
  isLoading,
  disabled,
}: ButtonSubmitProps) {
  return (
    <Button type="submit" disabled={isLoading || disabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? <span>Saving</span> : <span>Continue</span>}
    </Button>
  );
}
