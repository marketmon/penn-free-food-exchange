import { ZodSchema, z } from "zod";
import { useSignInContext } from "@/context/AuthProvider";
import { emailSchema } from "@/lib/validations";
import AuthForm from "../AuthForm";

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
    <AuthForm
      title="Enter your email"
      schema={emailSchema}
      defaultValues={{
        email: "",
      }}
      inputs={[{ name: "email", label: "Email address", type: "text" }]}
      handleInputs={handleSubmit}
    />
  );
}
