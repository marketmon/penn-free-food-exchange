"use client";

import { useRouter } from "next/navigation";
import { ZodSchema, z } from "zod";
import { logInSchema } from "@/lib/validations";
import { useSignInContext } from "@/context/AuthProvider";
import AuthForm from "@/components/Auth/AuthForm";
import AuthPrompt from "@/components/Auth/AuthPrompt";

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignInContext();

  const router = useRouter();

  async function handleSubmit(values: z.infer<ZodSchema<any>>) {
    const result = await signIn!.create({
      identifier: values.email,
      password: values.password,
    });
    await setActive!({ session: result.createdSessionId });
    router.push("/listings");
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AuthForm
        title="Sign in"
        schema={logInSchema}
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
      <AuthPrompt promptTo="Sign up" />
    </>
  );
}
