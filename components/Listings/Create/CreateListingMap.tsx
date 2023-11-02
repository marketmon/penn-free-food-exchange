import dynamic from "next/dynamic";
import { Meadow } from "@/lib/types";

const CreateListingMarker = dynamic(
  () => import("@/components/Listings/Create/CreateListingMarker"),
  { ssr: false }
);

const Map = dynamic(() => import("@/components/Listings/Map"), {
  ssr: false,
});

export default function CreateListingMap({
  meadowId,
  data,
}: {
  meadowId: string;
  data: Meadow;
}) {
  return (
    <Map lat={data.lat} lng={data.lng}>
      <CreateListingMarker />
    </Map>
  );
}
