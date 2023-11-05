import { useListings } from "@/context/ListingsProvider";
import { useCreateListing } from "@/context/CreateListingProvider";
import { DashboardFor, ListingNavigationButton } from "@/lib/types";
import { Button } from "@/components/ui/button";

const BUTTON_GROUP = {
  view: [
    { id: 1, action: "create", text: "Create" },
    { id: 2, action: "manage", text: "Manage Your Listings" },
  ],
  manage: [
    { id: 1, action: "create", text: "Create" },
    { id: 2, action: "view", text: "Show All Listings" },
  ],
  create: [
    { id: 1, action: "view", text: "Back" },
    { id: 2, action: "getLocation", text: "Find My Location" },
  ],
  edit: [
    { id: 1, action: "view", text: "Back" },
    { id: 2, action: "getLocation", text: "Find My Location" },
  ],
};

export default function Navigation() {
  const { dashboardFor, setDashboardFor } = useListings();

  const { setPosition, setIsPositionBasedOnUserLocation } = useCreateListing();

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setPosition({ lat, lng });
      setIsPositionBasedOnUserLocation(true);
    });
  }

  function onClick(action: string) {
    if (action === "getLocation") {
      getCurrentLocation();
    } else {
      setDashboardFor(action);
    }
  }

  return (
    <div className="mb-2">
      {BUTTON_GROUP[dashboardFor as DashboardFor].map(
        (button: ListingNavigationButton) => (
          <Button
            key={button.id}
            onClick={() => onClick(button.action)}
            variant={`${button.id === 1 ? "default" : "outline"}`}
            className={`${button.id === 1 && "mr-2"} px-3 shadow-none`}
          >
            {button.text}
          </Button>
        )
      )}
    </div>
  );
}
