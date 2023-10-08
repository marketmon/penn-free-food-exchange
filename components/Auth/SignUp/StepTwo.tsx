import { Dispatch, SetStateAction } from "react";
import { ZodSchema, z } from "zod";
import { SignUpSchema } from "@/lib/validations";
import AuthForm from "../AuthForm";

type StepOneProps = {
  meadow: string;
  isLoaded: boolean;
  signUp: any;
  setStep: Dispatch<SetStateAction<number>>;
};

export default function StepTwo({
  meadow,
  isLoaded,
  signUp,
  setStep,
}: StepOneProps) {
  async function handleSubmitEmailAndPassword(values: z.infer<ZodSchema<any>>) {
    if (!isLoaded) {
      return;
    }
    await signUp.create({
      emailAddress: values.email,
      password: values.password,
    });

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    setStep(3);
  }

  return (
    <AuthForm
      schema={SignUpSchema(meadow)}
      defaultValues={{
        email: "",
        password: "",
      }}
      inputs={[
        { name: "email", label: "Email address", type: "text" },
        { name: "password", label: "Password", type: "password" },
      ]}
      handleInputs={handleSubmitEmailAndPassword}
    />
  );
}
