import { ZodSchema, z } from "zod";
import { useSignInContext } from "@/context/AuthProvider";
import { emailSchema } from "@/lib/validations";
import Form from "@/components/Auth/Form/Form";
import FormTitle from "@/components/Auth/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function StepOne() {
  const { signIn, setStep } = useSignInContext();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
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
        inputs={[{ name: "email", label: "Email address", type: "text" }]}
        handleInputs={handleSubmit}
      />
      <Prompt promptTo="Sign in from reset password" />
    </>
  );
}
