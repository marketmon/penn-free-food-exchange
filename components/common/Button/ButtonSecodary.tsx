import { Button } from "@/components/ui/button";
import React from "react";

type ButtonSecondaryProps = {
  btnText: string;
  btnIcon?: React.ReactNode;
  btnStyles?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const ButtonSecondary = React.forwardRef<
  HTMLButtonElement,
  ButtonSecondaryProps
>(({ btnText, btnIcon, btnStyles, onClick, disabled }, ref) => {
  return (
    <Button
      type="button"
      variant="secondary"
      className={`px-3 shadow-none ${btnStyles}`}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {btnIcon}
      {btnText}
    </Button>
  );
});

ButtonSecondary.displayName = "ButtonSecondary";

export default ButtonSecondary;
