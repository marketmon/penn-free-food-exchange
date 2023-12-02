import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { changePasswordSchema } from "@/lib/validations";
import Form from "@/components/common/Form/Form";

export default function Security() {
  const { user } = useUser();

  async function updatePassword(values: z.infer<typeof changePasswordSchema>) {
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
          placeholder: "Current password",
        },
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
      handleSubmit={updatePassword}
      btnText="Save"
      btnLoadingText="Saving"
      showLabel={true}
      showSuccessMessage={true}
      formStyles="space-y-2"
    />
  );
}
