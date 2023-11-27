import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { resetPasswordSchema } from "@/lib/validations";
import { useSignInContext } from "@/context/AuthProvider";
import Form from "@/components/Auth/Form/Form";
import FormTitle from "@/components/Auth/Form/FormTitle";

export default function StepThree() {
  const { signIn, setActive } = useSignInContext();

  const router = useRouter();

  async function resetPassword(values: z.infer<ZodSchema<any>>) {
    const result = await signIn?.resetPassword({
      password: values.newPassword,
    });
    await setActive!({ session: result.createdSessionId });
    router.push("/");
  }

  return (
    <>
      <FormTitle title="Reset your password" />
      <Form
        schema={resetPasswordSchema}
        defaultValues={{
          newPassword: "",
          verifyPassword: "",
        }}
        inputs={[
          {
            name: "newPassword",
            label: "New password",
            type: "password",
          },
          {
            name: "verifyPassword",
            label: "Verify password",
            type: "password",
          },
        ]}
        handleInputs={resetPassword}
      />
    </>
  );
}
