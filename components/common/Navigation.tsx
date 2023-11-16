import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navigation() {
  return (
    <div className="h-10 flex justify-between items-center px-3 shadow-md">
      <Link href="/" className="h-[27px]">
        <Image
          src="/logo.png"
          width={100}
          height={27}
          priority
          alt="Picture of the author"
        />
      </Link>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
            variables: {
              colorPrimary: "#ff7000",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <Button className="h-[32px]">
          <Link href="/signin">Get Started</Link>
        </Button>
      </SignedOut>
    </div>
  );
}
