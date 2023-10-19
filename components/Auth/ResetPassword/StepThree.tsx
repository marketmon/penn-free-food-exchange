import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { resetPasswordSchema } from "@/lib/validations";
import { useSignInContext } from "@/context/AuthProvider";
import AuthForm from "../AuthForm";

export default function StepThree() {
  const { signIn, setActive } = useSignInContext();

  const router = useRouter();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
    const result = await signIn?.resetPassword({
      password: values.newPassword,
    });
    await setActive!({ session: result.createdSessionId });
    router.push("/listings");
  }

  return (
    <AuthForm
      title="Enter your email"
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
      handleInputs={handleSubmit}
    />
  );
}
