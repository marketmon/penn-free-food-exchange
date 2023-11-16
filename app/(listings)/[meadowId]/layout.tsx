import { EditListingProvider } from "@/context/EditListingProvider";
import { DraggableMarkerProvider } from "@/context/DraggableMarkerProvider";
import { ListingsProvider } from "@/context/ListingsProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ListingsProvider>
      <DraggableMarkerProvider>
        <EditListingProvider>{children}</EditListingProvider>
      </DraggableMarkerProvider>
    </ListingsProvider>
  );
}
