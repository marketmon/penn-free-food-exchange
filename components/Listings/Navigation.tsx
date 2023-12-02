import { useListings } from "@/context/ListingsProvider";
import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import { useEditListing } from "@/context/EditListingProvider";
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
    { id: 1, action: "manage", text: "Back" },
    { id: 2, action: "getLocation", text: "Find My Location" },
  ],
};

export default function Navigation() {
  const { dashboardFor, setDashboardFor } = useListings();

  const { currentListing, setCurrentListing } = useEditListing();

  const {
    setPosition,
    setIsPositionBasedOnUserLocation,
    setIcon,
    position,
    isPositionBasedOnUserLocation,
  } = useDraggableMarker();

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setPosition({ lat, lng });
      setIsPositionBasedOnUserLocation(true);
    });
  }

  function onNavigationButtonClick(action: string, text: string) {
    if (action === "getLocation") {
      getCurrentLocation();
    } else {
      setDashboardFor(action);
      if (text === "Back") {
        setIcon("📍");
        if (position) {
          setPosition(null);
        }
        if (isPositionBasedOnUserLocation) {
          setIsPositionBasedOnUserLocation(false);
        }
        if (currentListing) {
          setCurrentListing(null);
        }
      }
    }
  }

  return (
    <div className="mb-2">
      {BUTTON_GROUP[dashboardFor as DashboardFor].map(
        (button: ListingNavigationButton) => (
          <Button
            key={button.id}
            onClick={() => onNavigationButtonClick(button.action, button.text)}
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
