import { Button } from "@/components/ui/button";
import { BtnVariants } from "@/lib/types";
import React from "react";

type ButtonOnClickProps = {
  variant: BtnVariants;
  btnText?: string;
  btnIcon?: React.ReactNode;
  btnStyles?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const ButtonOnClick = React.forwardRef<HTMLButtonElement, ButtonOnClickProps>(
  ({ variant, btnText, btnIcon, btnStyles, onClick, disabled }, ref) => {
    return (
      <Button
        type="button"
        variant={variant}
        className={`px-3 shadow-none ${btnStyles}`}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
      >
        {btnIcon}
        {btnText}
      </Button>
    );
  }
);

ButtonOnClick.displayName = "ButtonOnClick";

export default ButtonOnClick;
