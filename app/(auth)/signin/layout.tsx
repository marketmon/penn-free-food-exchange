import SignInProvider from "@/context/SignInProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SignInProvider>{children}</SignInProvider>;
}
