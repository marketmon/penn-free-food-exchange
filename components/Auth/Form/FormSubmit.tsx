import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormSubmitProps = {
  isLoading: boolean;
  disabled?: boolean;
  btnText?: string;
  additionalPrompt?: React.ReactNode;
};

export default function FormSubmit({
  isLoading,
  disabled,
  btnText = "Continue",
  additionalPrompt,
}: FormSubmitProps) {
  return (
    <div className="space-y-2">
      {["Save", "Send code", "Verify"].includes(btnText) ? (
        <>
          {additionalPrompt}
          <Button type="submit" disabled={isLoading || disabled}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {btnText}
          </Button>
        </>
      ) : (
        <>
          {additionalPrompt}
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </>
      )}
    </div>
  );
}
