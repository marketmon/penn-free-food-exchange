import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { editProfileSchema } from "@/lib/validations";
import Form from "@/components/common/Form/Form";

export default function EditProfile() {
  const { user } = useUser();

  async function updateProfile(values: z.infer<typeof editProfileSchema>) {
    await user!.update({
      firstName: values.firstName,
      lastName: values.lastName,
    });

    user!.reload();
  }

  return (
    <Form
      schema={editProfileSchema}
      defaultValues={{
        email: user!.emailAddresses[0].emailAddress!,
        firstName: user!.firstName!,
        lastName: user!.lastName!,
      }}
      inputs={[
        {
          name: "email",
          label: "Email address",
          type: "text",
          placeholder: "Email address",
          disabled: true,
        },
        {
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "First Name",
        },
        {
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Last name",
        },
      ]}
      handleSubmit={updateProfile}
      btnText="Save"
      btnLoadingText="Saving"
      showLabel={true}
      showSuccessMessage={true}
      formStyles="space-y-2"
    />
  );
}
