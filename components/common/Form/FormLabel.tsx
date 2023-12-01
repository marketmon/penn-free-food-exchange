import { FormInput } from "@/lib/types";
import { FormLabel as FormLabelShadcn } from "@/components/ui/form";

type FormLabelType = {
  input: FormInput;
};

export default function FormLabel({ input }: FormLabelType) {
  return (
    <FormLabelShadcn
      className={`${input.disabled && "opacity-25"} text-sm font-medium`}
    >
      {input.label}
    </FormLabelShadcn>
  );
}
