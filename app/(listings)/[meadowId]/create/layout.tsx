import { CreateListingProvider } from "@/context/CreateListingProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CreateListingProvider>{children}</CreateListingProvider>;
}
