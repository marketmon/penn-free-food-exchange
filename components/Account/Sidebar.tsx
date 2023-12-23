"use client";

import { useManageAccount } from "@/context/ManageAccountProvider";
import ButtonOnClick from "@/components/common/Button/ButtonOnClick";

const BUTTON_GROUP = [
  {
    label: "Profile",
    value: "profile",
    description: "Edit your profile information",
  },
  // {
  //   label: "Notification",
  //   value: "notification",
  //   description: "Add your phone number to receive notifications",
  // },
  {
    label: "Security",
    value: "security",
    description: "Change your password or delete your account",
  },
  {
    label: "Danger",
    value: "danger",
    description: "Irreversible and destructive actions",
  },
];

export function Sidebar() {
  const { currSection, setCurrSection } = useManageAccount();

  return (
    <nav className="flex flex-wrap lg:flex-col lg:space-y-1">
      {BUTTON_GROUP.map((button) => (
        <ButtonOnClick
          variant="ghost"
          btnText={button.label}
          btnStyles={`justify-start ${
            currSection.value === button.value
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          }`}
          onClick={() => setCurrSection(button)}
          key={button.value}
        />
      ))}
    </nav>
  );
}
