import { Button } from "@/components/ui/button";
import React from "react";

type ButtonSecondaryProps = {
  btnText: string;
  btnIcon?: React.ReactNode;
  btnStyles?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonSecondary = React.forwardRef<
  HTMLButtonElement,
  ButtonSecondaryProps
>(({ btnText, btnIcon, btnStyles, onClick }, ref) => {
  return (
    <Button
      variant="secondary"
      className={`px-3 shadow-none ${btnStyles}`}
      onClick={onClick}
      ref={ref}
    >
      {btnIcon}
      {btnText}
    </Button>
  );
});

ButtonSecondary.displayName = "ButtonSecondary";

export default ButtonSecondary;
