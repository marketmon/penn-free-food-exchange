import { useUser } from "@clerk/nextjs";

export default function Consent() {
  const { user } = useUser();

  const phone = user!.primaryPhoneNumber?.phoneNumber || undefined;

  return (
    <p className="opacity-75 text-sm">
      {phone ? (
        <>
          Remove your phone number to stop receiving text notifications from
          Panbo.
        </>
      ) : (
        <>
          By adding your phone number, you agree to receive text notifications
          from Panbo whenever new listings get posted in your meadow.
        </>
      )}
    </p>
  );
}
