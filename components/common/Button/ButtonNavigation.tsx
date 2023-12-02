import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BtnVariants } from "@/lib/types";

type ButtonNavigationProps = {
  href: string;
  variant: BtnVariants;
  btnText: string;
  btnStyles?: string;
};

export default function ButtonNavigation({
  href,
  variant,
  btnText,
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
