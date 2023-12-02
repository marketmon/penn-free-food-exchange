import React from "react";
import { Button } from "@/components/ui/button";

type ButtonDeleteProps = {
  btnText: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonDelete = React.forwardRef<HTMLButtonElement, ButtonDeleteProps>(
  ({ btnText, onClick }, ref) => {
    return (
      <Button
        variant="destructive"
        className="px-3 shadow-none"
        onClick={onClick}
        ref={ref}
      >
        {btnText}
      </Button>
    );
  }
);

ButtonDelete.displayName = "ButtonDelete";

export default ButtonDelete;
