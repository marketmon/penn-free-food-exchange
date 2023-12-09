import Link from "next/link";
import { BtnVariants } from "@/lib/types";
import { Button } from "@/components/ui/button";

type ButtonNavigationProps = {
  variant: BtnVariants;
  btnText: string;
  href: string;
  btnStyles?: string;
};

export default function ButtonNavigation({
  variant,
  btnText,
  href,
  btnStyles,
}: ButtonNavigationProps) {
  return (
    <Link href={href}>
      <Button className={`px-3 shadow-none ${btnStyles}`} variant={variant}>
        {btnText}
      </Button>
    </Link>
  );
}
