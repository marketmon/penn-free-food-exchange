import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { changePasswordSchema } from "@/lib/validations";
import Form from "@/components/Auth/Form/Form";

export default function Security() {
  const { user } = useUser();

  async function handleSubmit(values: z.infer<typeof changePasswordSchema>) {
    await user!.updatePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  }

  return (
    <Form
      schema={changePasswordSchema}
      defaultValues={{
        currentPassword: "",
        newPassword: "",
        verifyPassword: "",
      }}
      inputs={[
        {
          name: "currentPassword",
          label: "Current password",
          type: "password",
        },
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
      showLabel={true}
      btnText="Save"
      showSuccessMessage={true}
    />
  );
}
