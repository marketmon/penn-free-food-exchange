import { EditListingProvider } from "@/context/EditListingProvider";
import { DraggableMarkerProvider } from "@/context/DraggableMarkerProvider";
import { ListingsProvider } from "@/context/ListingsProvider";
import { EdgeStoreProvider } from "@/context/EdgeStoreProvider";
import { ListingImageProvider } from "@/context/ListingImageProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ListingsProvider>
      <DraggableMarkerProvider>
        <EditListingProvider>
          <EdgeStoreProvider>
            <ListingImageProvider>{children}</ListingImageProvider>
          </EdgeStoreProvider>
        </EditListingProvider>
      </DraggableMarkerProvider>
    </ListingsProvider>
  );
}
