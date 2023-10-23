import { useQuery } from "@tanstack/react-query";
import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { selectMeadowSchema } from "@/lib/validations";
import { getListOfMeadows } from "@/lib/apiCalls";
import AuthForm from "@/components/Auth/AuthForm";
import AuthPrompt from "@/components/Auth/AuthPrompt";

export default function StepOne() {
  const { isLoading, data } = useQuery({
    queryKey: ["meadows"],
    queryFn: getListOfMeadows,
    staleTime: Infinity,
  });

  const { setMeadowInfo, setStep } = useSignUpContext();

  function handleSubmit(values: z.infer<ZodSchema<any>>) {
    const meadowInfo = JSON.parse(values.meadowInfo);
    setMeadowInfo!({
      id: meadowInfo.id,
      domain: meadowInfo.domain,
    });
    setStep(2);
  }

  return (
    <>
      <AuthForm
        title="Choose your meadow"
        schema={selectMeadowSchema(data)}
        defaultValues={{
          meadowInfo: "",
        }}
        inputs={[{ name: "meadowInfo", label: "Meadow", type: "select" }]}
        handleInputs={handleSubmit}
        meadowsLoading={isLoading}
        meadows={data}
      />
      <AuthPrompt promptTo="Sign in" />
    </>
  );
}
