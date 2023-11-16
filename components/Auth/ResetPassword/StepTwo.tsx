import { ZodSchema, z } from "zod";
import { useSignInContext } from "@/context/AuthProvider";
import { verificationCodeSchema } from "@/lib/validations";
import Form from "@/components/Auth/Form";
import AuthPrompt from "@/components/Auth/AuthPrompt";

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
      <Form
        title="Verify email"
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
      <AuthPrompt promptTo="Resend code" authData={signIn} />
    </>
  );
}
