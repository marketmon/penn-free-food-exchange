import { CreateListingProvider } from "@/context/CreateListingProvider";
import { ListingsProvider } from "@/context/ListingsProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ListingsProvider>
      <CreateListingProvider>{children}</CreateListingProvider>
    </ListingsProvider>
  );
}
