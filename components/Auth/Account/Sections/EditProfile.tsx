import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { editProfileSchema } from "@/lib/validations";
import Form from "@/components/Auth/Form/Form";

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
          disabled: true,
        },
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
      ]}
      handleInputs={updateProfile}
      showLabel={true}
      btnText="Save"
      showSuccessMessage={true}
    />
  );
}
