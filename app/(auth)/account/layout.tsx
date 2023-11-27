import { ManageAccountProvider } from "@/context/ManageAccountProvider";
import { AddPhoneProvider } from "@/context/AddPhoneProvider";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/Auth/Account/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ManageAccountProvider>
      <AddPhoneProvider>
        <div className="h-full py-16 w-4/5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Manage Account
            </h2>
            <p className="text-muted-foreground">
              Change your profile details, including your password and
              notification settings.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <Sidebar />
            </aside>
            <div className="flex flex-col w-full">
              {children}
            </div>
          </div>
        </div>
      </AddPhoneProvider>
    </ManageAccountProvider>
  );
}
