import SignUpProvider from "@/context/SignUpProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SignUpProvider>{children}</SignUpProvider>;
}
