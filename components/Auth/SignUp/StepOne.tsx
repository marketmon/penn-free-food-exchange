import { useQuery } from "@tanstack/react-query";
import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { selectMeadowSchema } from "@/lib/validations";
import { getListOfMeadows } from "@/lib/queryFns";
import Form from "@/components/Auth/Form";
import Prompt from "@/components/Auth/Prompt";

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
      <Form
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
      <Prompt promptTo="Sign in from sign up" />
    </>
  );
}
