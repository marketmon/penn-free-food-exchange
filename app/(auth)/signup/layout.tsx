import { SignUpProvider } from "@/context/AuthProvider";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <SignUpProvider>{children}</SignUpProvider>;
}
