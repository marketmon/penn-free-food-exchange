import { ZodSchema, z } from "zod";
import { useSignInContext } from "@/context/SignInProvider";
import { verificationCodeSchema } from "@/lib/validations";
import AuthForm from "../AuthForm";
import AuthPrompt from "../AuthPrompt";

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
      <AuthForm
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
