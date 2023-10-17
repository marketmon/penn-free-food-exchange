import { useQuery } from "react-query";
import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { selectMeadowSchema } from "@/lib/validations";
import AuthForm from "../AuthForm";
import AuthPrompt from "../AuthPrompt";

export default function StepOne() {
  const { isLoading, data } = useQuery(
    "meadows",
    async () => {
      const res = await fetch("/api/meadows");
      const meadows = await res.json();
      return meadows;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const { setDomain, setStep } = useSignUpContext();

  function handleSubmit(values: z.infer<ZodSchema<any>>) {
    setDomain!(values.meadow);
    setStep(2);
  }

  return (
    <>
      <AuthForm
        title="Choose your meadow"
        schema={selectMeadowSchema(data)}
        defaultValues={{
          meadow: "",
        }}
        inputs={[{ name: "meadow", label: "Meadow", type: "select" }]}
        handleInputs={handleSubmit}
        meadowsLoading={isLoading}
        meadows={data}
      />
      <AuthPrompt promptTo="Sign in" />
    </>
  );
}
