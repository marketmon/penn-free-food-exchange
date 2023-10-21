import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { resetPasswordSchema } from "@/lib/validations";
import { useSignInContext } from "@/context/AuthProvider";
import AuthForm from "../AuthForm";

export default function StepThree() {
  const { signIn } = useSignInContext();

  const router = useRouter();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
    await signIn?.resetPassword({
      password: values.newPassword,
    });
    router.push("/signin");
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
