import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { useAddPhone } from "@/context/AddPhoneProvider";
import { verificationCodeSchema } from "@/lib/validations";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Form from "@/components/Auth/Form/Form";
import Prompt from "@/components/Auth/Prompt";

export default function StepTwo() {
  const { user } = useUser();

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

    setStep(1);

    document.getElementById("closeDialog")?.click();
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
        handleInputs={verifyPhone}
        showLabel={true}
        btnText="Verify"
        additionalPrompt={
          <Prompt promptTo="Resend code" authData={user!.phoneNumbers[0]} />
        }
      />
    </>
  );
}
