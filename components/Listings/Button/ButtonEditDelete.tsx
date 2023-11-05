import { Button } from "@/components/ui/button";

export default function ButtonEditDelete({
  btnTxt,
  onClick,
}: {
  btnTxt: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <Button
      variant={`${btnTxt === "Edit" ? "secondary" : "destructive"}`}
      className="px-3 shadow-none"
      onClick={onClick}
    >
      {btnTxt}
    </Button>
  );
}
