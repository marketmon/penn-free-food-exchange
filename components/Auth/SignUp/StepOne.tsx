import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { selectMeadowSchema } from "@/lib/validations";
import { mapMeadowToDomain } from "@/lib/utils";
import AuthForm from "../AuthForm";
import AuthPrompt from "../AuthPrompt";

export default function StepOne() {
  const { setMeadow, setStep } = useSignUpContext();

  function handleSubmit(values: z.infer<ZodSchema<any>>) {
    setMeadow!(mapMeadowToDomain(values.meadow));
    setStep(2);
  }

  return (
    <>
      <AuthForm
        title="Choose your meadow"
        schema={selectMeadowSchema}
        defaultValues={{
          meadow: "",
        }}
        inputs={[{ name: "meadow", label: "Meadow", type: "select" }]}
        handleInputs={handleSubmit}
      />
      <AuthPrompt promptTo="Sign in" />
    </>
  );
}
