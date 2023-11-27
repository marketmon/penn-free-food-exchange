import { Check } from "lucide-react";

type SuccessMessageType = {
  success: string;
};

export default function SuccessMessage({ success }: SuccessMessageType) {
  return (
    <div className="inline-flex justify-center">
      <Check color="#16a34a" className="mr-1 h-4 w-4" />
      <div className="text-green-600 text-[13px]">{success}</div>
    </div>
  );
}
