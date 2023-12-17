import { Marker as MarkerLeaflet, Popup } from "react-leaflet";
import { DivIcon } from "leaflet";
import { WestPhillyHalloweenDataProject } from "@/lib/types";

type MarkerProps = {
  item: WestPhillyHalloweenDataProject;
};

export default function Marker({ item }: MarkerProps) {
  return (
    <MarkerLeaflet
      position={[item.lat, item.long]}
      icon={
        new DivIcon({
          html: `
            <div>
              <h1 style="font-size: 1.3rem">
                🎃
              </h1>
             <div>
          `,
          className: "test--marker--icon",
          iconSize: [24, 36],
          iconAnchor: [12, 13],
          popupAnchor: [3, -12],
        })
      }
    >
      <Popup>
        <div>
          Costume: {item.costume}
          <br></br>
          Favorite: {item.favorite}
          <br></br>
          Least Favorite: {item.worst}
        </div>
      </Popup>
    </MarkerLeaflet>
  );
}
