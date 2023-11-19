import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonContinueProps = {
  isLoading: boolean;
};

export default function ButtonContinue({ isLoading }: ButtonContinueProps) {
  return (
    <Button className="w-full" type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Continue
    </Button>
  );
}
