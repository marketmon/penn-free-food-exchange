import { Button } from "@/components/ui/button";

type ButtonPrimaryProps = {
  btnText: string;
  btnStyles?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};
export default function ButtonPrimary({
  btnText,
  btnStyles,
  onClick,
  disabled,
}: ButtonPrimaryProps) {
  return (
    <Button
      variant="default"
      className={`px-3 shadow-none ${btnStyles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </Button>
  );
}
