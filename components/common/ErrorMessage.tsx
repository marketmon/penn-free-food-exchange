import { AlertCircle } from "lucide-react";

type ErrorMessageType = {
  error: string;
};

export default function ErrorMessage({ error }: ErrorMessageType) {
  return (
    <div className="inline-flex justify-center">
      <AlertCircle color="#ef4444" className="mr-2 h-4 w-4" />
      <div className="text-red-500 text-[13px]">{error}</div>
    </div>
  );
}
