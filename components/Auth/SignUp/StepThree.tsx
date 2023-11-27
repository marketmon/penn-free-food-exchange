import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { verificationCodeSchema } from "@/lib/validations";
import Form from "@/components/Auth/Form/Form";
import FormTitle from "@/components/Auth/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function StepThree() {
  const { signUp, setActive } = useSignUpContext();

  const router = useRouter();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
    const result = await signUp!.attemptEmailAddressVerification({
      code: values.verificationCode,
    });
    await setActive!({ session: result.createdSessionId });
    router.push("/");
  }

  return (
    <>
      <FormTitle title="Verify email" />
      <Form
        schema={verificationCodeSchema}
        defaultValues={{
          verificationCode: "",
        }}
        inputs={[
          {
            name: "verificationCode",
            label: "Verification Code",
            type: "text",
          },
        ]}
        handleInputs={handleSubmit}
      />
      <Prompt promptTo="Resend code" authData={signUp} />
    </>
  );
}
