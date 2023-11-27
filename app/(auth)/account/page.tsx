"use client";

import { useUser } from "@clerk/nextjs";
import { useManageAccount } from "@/context/ManageAccountProvider";
import { Separator } from "@/components/ui/separator";
import Loading from "@/components/common/Loading";
import EditProfile from "@/components/Auth/Account/Sections/EditProfile";
import Notification from "@/components/Auth/Account/Sections/Notification/Notification";
import Security from "@/components/Auth/Account/Sections/Security";
import Danger from "@/components/Auth/Account/Sections/Danger";

export default function Page() {
  const { currSection } = useManageAccount();

  const { user } = useUser();

  if (!user) {
    return (
      <div className="self-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {currSection.label}
        </h3>
        <p className="text-sm text-muted-foreground">
          {currSection.description}
        </p>
      </div>
      <Separator className="my-4" />
      <div className="w-full">
        {currSection.value === "profile" ? (
          <EditProfile />
        ) : currSection.value === "notification" ? (
          <Notification />
        ) : currSection.value === "security" ? (
          <Security />
        ) : (
          <Danger />
        )}
      </div>
    </div>
  );
}
