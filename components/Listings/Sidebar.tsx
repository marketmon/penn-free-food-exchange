import { SignedIn } from "@clerk/nextjs";
import { Listing } from "@/lib/types";
import { useListings } from "@/context/ListingsProvider";
import Navigation from "@/components/Listings/Navigation";
import Filter from "@/components/Listings/Filter";
import CreateListingSidebar from "@/components/Listings/CreateListingSidebar";
import CardList from "@/components/Listings/Card/CardList";

type SidebarProps = {
  meadowUsers: string[];
  userId: string | undefined;
  listingsToShow: Listing[] | null;
};

export default function Sidebar({
  meadowUsers,
  userId,
  listingsToShow,
}: SidebarProps) {
  const { dashboardFor } = useListings();

  return (
    <div className="h-full overflow-y-hidden px-3">
      <div className="flex justify-between sticky top-0">
        {userId && meadowUsers.includes(userId) && (
          <SignedIn>
            <Navigation />
          </SignedIn>
        )}
        {listingsToShow && listingsToShow.length > 0 && <Filter />}
      </div>
      <div className="h-[calc(100%-48px)] overflow-y-auto">
        {listingsToShow ? (
          <CardList listingsToShow={listingsToShow} />
        ) : dashboardFor === "create" ? (
          <CreateListingSidebar />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
