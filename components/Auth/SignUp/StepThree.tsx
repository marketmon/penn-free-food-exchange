import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { SignUpVerifySchema } from "@/lib/validations";
import AuthForm from "../AuthForm";

type StepThreeProps = {
  isLoaded: boolean;
  signUp: any;
  setActive: any;
};

export default function StepThree({
  isLoaded,
  signUp,
  setActive,
}: StepThreeProps) {
  const router = useRouter();

  async function handleSubmitVerificationCode(values: z.infer<ZodSchema<any>>) {
    if (!isLoaded) {
      return;
    }
    const completeSignUp = await signUp.attemptEmailAddressVerification({
      code: values.verificationCode,
    });
    if (completeSignUp.status !== "complete") {
      /*  investigate the response, to see if there was an error
       or if the user needs to complete more steps.*/
      console.log(JSON.stringify(completeSignUp, null, 2));
    }
    if (completeSignUp.status === "complete") {
      await setActive({ session: completeSignUp.createdSessionId });
      router.push("/");
    }
  }

  return (
    <AuthForm
      schema={SignUpVerifySchema}
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
      handleInputs={handleSubmitVerificationCode}
    />
  );
}
