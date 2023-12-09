import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import ButtonOnClick from "@/components/common/Button/ButtonOnClick";

export default function Danger() {
  const router = useRouter();

  const { user } = useUser();

  async function onDeleteAccount() {
    await user!.delete();
    router.push("/");
  }

  return (
    <Dialog>
      <div className="text-sm">
        <h3 className="font-bold">Delete account</h3>
        <div className="flex flex-col">
          <span>Delete your account and all its associated data</span>
          <div className="pt-4">
            <DialogTrigger asChild>
              <ButtonOnClick variant="destructive" btnText="Delete account" />
            </DialogTrigger>
          </div>
        </div>
      </div>
      <DialogContent className="w-[300px] tablet:w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-left font-bold">
            Delete account
          </DialogTitle>
          <DialogDescription className="text-left py-2">
            Are you sure you want to delete your account and all its associated
            data? This action cannot be undone.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <ButtonOnClick variant="secondary" btnText="Close" />
            </DialogClose>
            <ButtonOnClick
              variant="destructive"
              btnText="Confirm"
              onClick={onDeleteAccount}
            />
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
