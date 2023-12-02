import { Button } from "@/components/ui/button";
import { BtnVariants } from "@/lib/types";

type ButtonNavigationProps = {
  variant: BtnVariants;
  btnText: string;
  btnStyles?: string;
};

export default function ButtonAnchor({
  variant,
  btnText,
  btnStyles,
}: ButtonNavigationProps) {
  return (
    <a href="mailto: etmar@wharton.upenn.edu">
      <Button className={btnStyles} variant={variant}>
        {btnText}
      </Button>
    </a>
  );
}
