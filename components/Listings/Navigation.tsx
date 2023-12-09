import { useListings } from "@/context/ListingsProvider";
import { useDraggableMarker } from "@/context/DraggableMarkerProvider";
import { useEditListing } from "@/context/EditListingProvider";
import { useListingImage } from "@/context/ListingImageProvider";
import { DashboardFor } from "@/lib/types";
import ButtonOnClick from "@/components/common/Button/ButtonOnClick";

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
    imageUrl,
    setImageUrl,
    imageOperationInProgress,
    imageError,
    setImageError,
    onDeleteImage,
  } = useListingImage();

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
        if (imageUrl) {
          setImageUrl("");
          onDeleteImage(imageUrl);
        }
        if (imageError) {
          setImageError(null);
        }
      }
    }
  }

  return (
    <div className="mb-2 space-x-2">
      {BUTTON_GROUP[dashboardFor as DashboardFor].map(
        (button) => (
          <ButtonOnClick
            variant={button.id === 1 ? "default" : "secondary"}
            key={button.id}
            btnText={button.text}
            onClick={() => onNavigationButtonClick(button.action, button.text)}
            disabled={imageOperationInProgress}
          />
        )
      )}
    </div>
  );
}
