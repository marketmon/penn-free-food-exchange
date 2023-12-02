import { useAddPhone } from "@/context/AddPhoneProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PhoneNumber from "@/components/Account/Actions/Notification/PhoneNumber";
import Consent from "@/components/Account/Actions/Notification/Consent";
import MultiStepAuthManager from "@/components/Auth/MultiStepAuthManager";
import EnterPhone from "@/components/Account/Actions/Notification/AddPhone/EnterPhone";
import VerifyPhone from "@/components/Account/Actions/Notification/AddPhone/VerifyPhone";
import "react-international-phone/style.css";

export default function Notification() {
  const { step } = useAddPhone();

  return (
    <Dialog>
      <PhoneNumber />
      <Consent />
      <DialogContent className="w-[300px] tablet:w-[350px]">
        <MultiStepAuthManager
          step={step}
          stepComponents={[
            <EnterPhone key="step-one" />,
            <VerifyPhone key="step-two" />,
          ]}
        />
      </DialogContent>
    </Dialog>
  );
}
