import dynamic from "next/dynamic";

const Popup = dynamic(
  () => import("react-leaflet").then((module) => module.Popup),
  { ssr: false }
);

export default function ListingPopup() {
  return <Popup>sadasdasdasdasdasdasd</Popup>;
}
