import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
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
              <Button variant="destructive">Delete account</Button>
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
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={onDeleteAccount}>
              Delete account
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
