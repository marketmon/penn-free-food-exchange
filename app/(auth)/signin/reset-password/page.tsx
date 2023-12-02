"use client";

import { useSignInContext } from "@/context/AuthProvider";
import EnterEmail from "@/components/Auth/Actions/ResetPassword/EnterEmail";
import VerifyEmail from "@/components/Auth/Actions/ResetPassword/VerifyEmail";
import ResetPassword from "@/components/Auth/Actions/ResetPassword/ResetPassword";
import MultiStepAuthManager from "@/components/Auth/MultiStepAuthManager";
import Loading from "@/components/common/Loading";

export default function Page() {
  const { isLoaded, step } = useSignInContext();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-[350px]">
      <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
      <MultiStepAuthManager
        step={step}
        stepComponents={[
          <EnterEmail key="enter-email" />,
          <VerifyEmail key="verify-email" />,
          <ResetPassword key="reset-password" />,
        ]}
      />
    </div>
  );
}
