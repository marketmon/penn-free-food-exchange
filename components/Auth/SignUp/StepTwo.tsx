import { ZodSchema, z } from "zod";
import { useSignUpContext } from "@/context/AuthProvider";
import { signUpSchema } from "@/lib/validations";
import Form from "@/components/common/Form/Form";
import FormTitle from "@/components/common/Form/FormTitle";
import Prompt from "@/components/Auth/Prompt";

export default function StepTwo() {
  const { signUp, meadowInfo, setStep } = useSignUpContext();

  async function createAccountAndSendEmailVerification(
    values: z.infer<ZodSchema<any>>
  ) {
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
      <FormTitle title="Sign up" />
      <Form
        schema={signUpSchema(meadowInfo!.domain)}
        defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        inputs={[
          {
            name: "firstName",
            label: "First name",
            type: "text",
            placeholder: "First name",
          },
          {
            name: "lastName",
            label: "Last name",
            type: "text",
            placeholder: "Last name",
          },
          {
            name: "email",
            label: "Email address",
            type: "text",
            placeholder: "Email address",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        handleSubmit={createAccountAndSendEmailVerification}
        formStyles="space-y-2 mb-2"
      />
      <Prompt promptTo="Sign in from sign up" />
    </>
  );
}
