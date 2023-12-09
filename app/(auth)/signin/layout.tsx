import { SignInProvider } from "@/context/AuthProvider";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <SignInProvider>{children}</SignInProvider>;
}