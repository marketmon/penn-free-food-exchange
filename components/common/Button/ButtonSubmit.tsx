import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonSubmitProps = {
  btnText: string;
  btnLoadingText: string;
  isLoading: boolean;
  disabled?: boolean;
};

export default function ButtonSubmit({
  btnText,
  btnLoadingText,
  isLoading,
  disabled,
}: ButtonSubmitProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || disabled}
      className={`px-3 shadow-none ${btnText === "Continue" && "w-full"}`}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? <span>{btnLoadingText}</span> : <span>{btnText}</span>}
    </Button>
  );
}
