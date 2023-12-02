import { ZodSchema, z } from "zod";
import { useSignInContext } from "@/context/AuthProvider";
import { verificationCodeSchema } from "@/lib/validations";
import Form from "@/components/common/Form/Form";
import FormTitle from "@/components/common/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function VerifyEmail() {
  const { signIn, setStep } = useSignInContext(); 

  async function verifyEmail(values: z.infer<ZodSchema<any>>) {
    await signIn!.attemptFirstFactor({
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
            label: "Verification code",
            type: "text",
            placeholder: "Verification code",
          },
        ]}
        handleSubmit={verifyEmail}
        formStyles="space-y-2 mb-2"
      />
      <Prompt promptTo="Resend code" authData={signIn} />
    </>
  );
}
