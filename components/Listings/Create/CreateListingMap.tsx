import dynamic from "next/dynamic";
import { Meadow, User } from "@/lib/types";

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
  data: User;
}) {
  const currentMeadow = data.meadows.find(
    (meadow: Meadow) => meadow.id === meadowId
  );

  return (
    <Map lat={currentMeadow!.lat} lng={currentMeadow!.lng}>
      <CreateListingMarker />
    </Map>
  );
}
