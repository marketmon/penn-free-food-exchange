import { useAuth, useUser } from "@clerk/nextjs";
import { z } from "zod";
import { useAddPhone } from "@/context/AddPhoneProvider";
import { updateUserToDb } from "@/lib/queryFns";
import { verificationCodeSchema } from "@/lib/validations";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Prompt from "@/components/Auth/Prompt";
import Form from "@/components/common/Form/Form";

export default function StepTwo() {
  const { user } = useUser();

  const { getToken } = useAuth();

  const { setStep } = useAddPhone();

  async function verifyPhone(values: z.infer<typeof verificationCodeSchema>) {
    const phoneListFromDb = user!.phoneNumbers;

    const phoneToVerify = phoneListFromDb[0];
    await phoneToVerify.attemptVerification({
      code: values.verificationCode,
    });

    // delete any previous numbers from db once verified (user can only have one number at a time)
    if (phoneListFromDb.length > 1) {
      await Promise.all(
        phoneListFromDb.slice(1).map(async (phoneInDb) => {
          await phoneInDb.destroy();
        })
      );
    }

    await user!.reload();

    const token = await getToken();
    await updateUserToDb(
      { id: user!.id, phoneNumber: phoneToVerify.phoneNumber },
      token!
    );

    document.getElementById("closeDialog")?.click();

    setStep(1);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl text-left font-bold mb-4">
          Verify your phone number
        </DialogTitle>
      </DialogHeader>
      <Form
        schema={verificationCodeSchema}
        defaultValues={{
          verificationCode: "",
        }}
        inputs={[
          {
            name: "verificationCode",
            label: "Verification Code",
            type: "text",
          },
        ]}
        handleSubmit={verifyPhone}
        btnText="Verify"
        btnLoadingText="Verifying"
        showLabel={true}
        additionalPrompt={
          <Prompt promptTo="Resend code" authData={user!.phoneNumbers[0]} />
        }
        formStyles="space-y-2"
      />
    </>
  );
}
