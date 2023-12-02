import { Button } from "@/components/ui/button";

type ButtonPrimaryProps = {
  btnText: string;
  btnStyles?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function ButtonPrimary({
  btnText,
  btnStyles,
  onClick,
}: ButtonPrimaryProps) {
  return (
    <Button
      variant="default"
      className={`px-3 shadow-none ${btnStyles}`}
      onClick={onClick}
    >
      {btnText}
    </Button>
  );
}
