import { useAuth, useUser } from "@clerk/nextjs";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import { useAddPhone } from "@/context/AddPhoneProvider";
import { updateUserToDb } from "@/lib/queryFns";
import { DialogTrigger } from "@/components/ui/dialog";

export default function PhoneNumber() {
  const { user } = useUser();

  const { getToken } = useAuth();

  const phone = user!.primaryPhoneNumber?.phoneNumber;

  const { setStep } = useAddPhone();

  async function onDeletePhone() {
    const phoneListFromDb = user!.phoneNumbers;
    if (phoneListFromDb.length > 0) {
      await Promise.all(
        phoneListFromDb.map(async (phoneInDb) => {
          await phoneInDb.destroy();
        })
      );
    }

    await user!.reload();

    const token = await getToken();
    await updateUserToDb({ id: user!.id, phoneNumber: null }, token!);
    
    setStep(1);
  }

  return (
    <div className="flex flex-col space-y-2 mb-8 text-sm font-medium">
      {phone ? (
        <>
          <h3 className="font-bold">Phone number</h3>
          <div className="flex flex-col tablet:flex-row tablet:space-x-3">
            <h5>{phone}</h5>
            <div className="flex mt-2 tablet:mt-0 space-x-3">
              <DialogTrigger asChild>
                <div className="flex w-fit items-center cursor-pointer">
                  <Pencil className="h-4 w-4 mr-1" />
                  Change
                </div>
              </DialogTrigger>
              <div
                className="flex w-fit text-red-500 items-center cursor-pointer"
                onClick={onDeletePhone}
              >
                <Trash className="h-4 w-4 mr-1" />
                Delete
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>
            You don&apos;t have a phone number associated with your account.
          </p>
          <DialogTrigger asChild>
            <div className="flex w-fit text-green-500 items-center cursor-pointer">
              <PlusCircle className="h-4 w-4 mr-1" />
              add one now
            </div>
          </DialogTrigger>
        </>
      )}
    </div>
  );
}
