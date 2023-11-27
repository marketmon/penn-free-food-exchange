"use client";

import { useManageAccount } from "@/context/ManageAccountProvider";
import { Button } from "@/components/ui/button";

const SIDEBAR_ITEMS = [
  {
    label: "Profile",
    value: "profile",
    description: "Edit your profile information",
  },
  {
    label: "Notification",
    value: "notification",
    description: "Add your phone number to receive notifications",
  },
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
      {SIDEBAR_ITEMS.map((item) => (
        <Button
          variant="ghost"
          className={`justify-start ${
            currSection.value === item.value
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          }`}
          key={item.value}
          onClick={() => setCurrSection(item)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
