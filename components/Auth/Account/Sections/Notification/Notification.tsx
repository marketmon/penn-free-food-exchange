import { useAddPhone } from "@/context/AddPhoneProvider";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PhoneNumber from "@/components/Auth/Account/Sections/Notification/PhoneNumber";
import Consent from "@/components/Auth/Account/Sections/Notification/Consent";
import MultiStepAuthManager from "@/components/Auth/MultiStepAuthManager";
import StepOne from "@/components/Auth/Account/Sections/Notification/AddPhone/StepOne";
import StepTwo from "@/components/Auth/Account/Sections/Notification/AddPhone/StepTwo";
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
            <StepOne key="step-one" />,
            <StepTwo key="step-two" />,
          ]}
        />
      </DialogContent>
    </Dialog>
  );
}
