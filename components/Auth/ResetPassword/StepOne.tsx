import { ZodSchema, z } from "zod";
import { useSignInContext } from "@/context/AuthProvider";
import { emailSchema } from "@/lib/validations";
import Form from "@/components/common/Form/Form";
import FormTitle from "@/components/common/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function StepOne() {
  const { signIn, setStep } = useSignInContext();

  async function sendEmailVerification(values: z.infer<ZodSchema<any>>) {
    await signIn!.create({
      strategy: "reset_password_email_code",
      identifier: values.email,
    });
    setStep(2);
  }

  return (
    <>
      <FormTitle title="Enter your email" />
      <Form
        schema={emailSchema}
        defaultValues={{
          email: "",
        }}
        inputs={[
          {
            name: "email",
            label: "Email address",
            type: "text",
            placeholder: "Email address",
          },
        ]}
        handleSubmit={sendEmailVerification}
        formStyles="space-y-2 mb-2"
      />
      <Prompt promptTo="Sign in from reset password" />
    </>
  );
}
