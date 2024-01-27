import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { createUserToDb } from "@/lib/queryFns";
import { verificationCodeSchema } from "@/lib/validations";
import Form from "@/components/common/Form/Form";
import FormTitle from "@/components/common/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function StepThree() {
  const { signUp, setActive } = useSignUpContext();

  const router = useRouter();

  async function verifyEmailAndFinishCreatingAccount(
    values: z.infer<ZodSchema<any>>
  ) {
    const result = await signUp!.attemptEmailAddressVerification({
      code: values.verificationCode,
    });
    await createUserToDb(result);
    await setActive!({ session: result.createdSessionId });

    router.push("/");
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
        handleSubmit={verifyEmailAndFinishCreatingAccount}
        formStyles="space-y-2 mb-2"
      />
      <Prompt promptTo="Resend code" authData={signUp} />
    </>
  );
}
