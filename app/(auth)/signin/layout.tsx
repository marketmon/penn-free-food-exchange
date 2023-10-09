import { SignInProvider } from "@/context/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SignInProvider>{children}</SignInProvider>;
}
