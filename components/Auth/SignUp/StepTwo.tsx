import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/SignUpProvider";
import { SignUpSchema } from "@/lib/validations";
import AuthForm from "../AuthForm";
import AuthPrompt from "../AuthPrompt";

export default function StepTwo() {
  const { signUp, meadow, setStep } = useSignUpContext();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
    await signUp!.create({
      emailAddress: values.email,
      password: values.password,
      unsafeMetadata: { meadow },
    });

    await signUp!.prepareEmailAddressVerification({
      strategy: "email_code",
    });
    setStep(3);
  }

  return (
    <>
      <AuthForm
        title="Sign up"
        schema={SignUpSchema(meadow)}
        defaultValues={{
          email: "",
          password: "",
        }}
        inputs={[
          { name: "email", label: "Email address", type: "text" },
          { name: "password", label: "Password", type: "password" },
        ]}
        handleInputs={handleSubmit}
      />
      <AuthPrompt promptTo="Sign in" />
    </>
  );
}
