import { ZodSchema, z } from "zod";
import { useSignInContext } from "@/context/AuthProvider";
import { verificationCodeSchema } from "@/lib/validations";
import Form from "@/components/Auth/Form/Form";
import FormTitle from "@/components/Auth/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function StepTwo() {
  const { signIn, setStep } = useSignInContext();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
    await signIn?.attemptFirstFactor({
      strategy: "reset_password_email_code",
      code: values.verificationCode,
    });
    setStep(3);
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
      <Prompt promptTo="Resend code" authData={signIn} />
    </>
  );
}
