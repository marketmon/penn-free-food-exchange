import { Dispatch, SetStateAction } from "react";
import { ZodSchema, z } from "zod";
import { SignUpSelectMeadowSchema } from "@/lib/validations";
import { mapMeadowToDomain } from "@/lib/utils";
import AuthForm from "../AuthForm";

type StepOneProps = {
  setMeadow: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
};

export default function StepOne({ setMeadow, setStep }: StepOneProps) {
  function handleSubmitMeadow(values: z.infer<ZodSchema<any>>) {
    setMeadow(mapMeadowToDomain(values.meadow));
    setStep(2);
  }

  return (
    <AuthForm
      schema={SignUpSelectMeadowSchema}
      defaultValues={{
        meadow: "",
      }}
      inputs={[{ name: "meadow", label: "Choose your meadow", type: "select" }]}
      handleInputs={handleSubmitMeadow}
    />
  );
}
