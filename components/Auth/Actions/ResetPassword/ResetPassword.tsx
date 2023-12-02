import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { resetPasswordSchema } from "@/lib/validations";
import { useSignInContext } from "@/context/AuthProvider";
import Form from "@/components/common/Form/Form";
import FormTitle from "@/components/common/Form/FormTitle";

export default function ResetPassword() {
  const { signIn, setActive } = useSignInContext();

  const router = useRouter();

  async function resetPassword(values: z.infer<ZodSchema<any>>) {
    const result = await signIn!.resetPassword({
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
            placeholder: "New password",
          },
          {
            name: "verifyPassword",
            label: "Verify password",
            type: "password",
            placeholder: "Verify password",
          },
        ]}
        handleSubmit={resetPassword}
        formStyles="space-y-2"
      />
    </>
  );
}
