import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { SignUpSchema } from "@/lib/validations";
import AuthForm from "@/components/Auth/AuthForm";
import AuthPrompt from "@/components/Auth/AuthPrompt";

export default function StepTwo() {
  const { signUp, meadowInfo, setStep } = useSignUpContext();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
    await signUp!.create({
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      password: values.password,
      unsafeMetadata: { initialMeadowId: meadowInfo!.id },
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
        schema={SignUpSchema(meadowInfo!.domain)}
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        inputs={[
          { name: "firstName", label: "First name", type: "text" },
          { name: "lastName", label: "Last name", type: "text" },
          { name: "email", label: "Email address", type: "text" },
          { name: "password", label: "Password", type: "password" },
        ]}
        handleInputs={handleSubmit}
      />
      <AuthPrompt promptTo="Sign in" />
    </>
  );
}
