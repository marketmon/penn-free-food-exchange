import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import { ICON_LIST } from "@/lib/constants";
import { FormInput, Meadow } from "@/lib/types";
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
  meadows?: Meadow[];
  setIcon?: Dispatch<SetStateAction<string>>;
};

export default function Select({
  value,
  onChange,
  input,
  meadows,
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
        {input.name === "icon"
          ? ICON_LIST!.map((icon) => (
              <SelectItem key={icon.id} value={icon.icon}>
                {icon.icon}
              </SelectItem>
            ))
          : meadows!.map((meadow) => (
              <SelectItem
                key={meadow.id}
                value={JSON.stringify({
                  domain: meadow.domain,
                  id: meadow.id,
                })}
              >
                {meadow.name}
              </SelectItem>
            ))}
      </SelectContent>
    </SelectShadcn>
  );
}
