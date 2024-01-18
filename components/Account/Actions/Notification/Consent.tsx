import { useUser } from "@clerk/nextjs";

export default function Consent() {
  const { user } = useUser();

  const phone = user!.primaryPhoneNumber?.phoneNumber;

  return (
    <p className="opacity-75 text-sm">
      {phone ? (
        <span>
          Remove your phone number to stop receiving text notifications from
          Penn Free Food Exchange.
        </span>
      ) : (
        <span>
          By adding your phone number, you agree to receive text notifications
          from Penn Free Food Exchange whenever new listings get posted in your meadow.
        </span>
      )}
    </p>
  );
}
