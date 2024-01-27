import { ICON_LIST } from "@/lib/constants";
import { FormInput } from "@/lib/types";
import {
  Select as SelectShadcn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

type SelectProps = {
  value: string;
  onChange: (...event: any[]) => void;
  input: FormInput;
  setIcon?: Dispatch<SetStateAction<string>>;
};

export default function Select({
  value,
  onChange,
  input,
  setIcon,
}: SelectProps) {
  return (
    <SelectShadcn
      onValueChange={(value) => {
        onChange(value);
        if (input.name === "icon") {
          setIcon!(value);
        }
      }}
      defaultValue={value}
      disabled={input.disabled}
    >
      <SelectTrigger hideArrowOnSmallSize={false}>
        <SelectValue placeholder={input.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {ICON_LIST!.map((icon) => (
          <SelectItem key={icon.id} value={icon.icon}>
            {icon.icon}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectShadcn>
  );
}
