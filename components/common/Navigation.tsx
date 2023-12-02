import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ButtonNavigation from "@/components/common/Button/ButtonNavigation";

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
          userProfileMode="navigation"
          userProfileUrl="/account"
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
        <ButtonNavigation
          href="/signin"
          variant="default"
          btnText="Get Started"
          btnStyles="h-[32px]"
        />
      </SignedOut>
    </div>
  );
}
