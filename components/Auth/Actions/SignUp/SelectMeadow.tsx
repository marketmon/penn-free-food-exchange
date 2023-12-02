import { useQuery } from "@tanstack/react-query";
import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { selectMeadowSchema } from "@/lib/validations";
import { getListOfMeadows } from "@/lib/queryFns";
import Form from "@/components/common/Form/Form";
import FormTitle from "@/components/common/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function SelectMeadow() {
  const { data, isLoading } = useQuery({
    queryKey: ["meadows"],
    queryFn: getListOfMeadows,
    staleTime: Infinity,
  });

  const { setMeadowInfo, setStep } = useSignUpContext();

  function selectMeadow(values: z.infer<ZodSchema<any>>) {
    const meadowInfo = JSON.parse(values.meadowInfo);
    setMeadowInfo!({
      id: meadowInfo.id,
      domain: meadowInfo.domain,
    });
    setStep(2);
  }

  return (
    <>
      <FormTitle title="Choose your meadow" />
      <Form
        schema={selectMeadowSchema(data)}
        defaultValues={{
          meadowInfo: "",
        }}
        inputs={[
          {
            name: "meadowInfo",
            label: "Meadow",
            type: "select",
            placeholder: "Select your meadow",
          },
        ]}
        handleSubmit={selectMeadow}
        meadowsLoading={isLoading}
        meadows={data}
        formStyles="space-y-2 mb-2"
      />
      <Prompt promptTo="Sign in from sign up" />
    </>
  );
}
