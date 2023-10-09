import { SignUpProvider } from "@/context/AuthProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SignUpProvider>{children}</SignUpProvider>;
}
