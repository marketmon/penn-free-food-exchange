import { BtnVariants } from "@/lib/types";
import { Button } from "@/components/ui/button";

type ButtonNavigationProps = {
  variant: BtnVariants;
  btnText: string;
  href: string;
  btnStyles?: string;
};

export default function ButtonAnchor({
  variant,
  btnText,
  href,
  btnStyles,
}: ButtonNavigationProps) {
  return (
    <a href={href}>
      <Button className={btnStyles} variant={variant}>
        {btnText}
      </Button>
    </a>
  );
}
