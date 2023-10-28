import { ViewListingsProvider } from "@/context/ViewListingsProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ViewListingsProvider>{children}</ViewListingsProvider>;
}
