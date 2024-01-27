import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useListings } from "@/context/ListingsProvider";
import { Listing } from "@/lib/types";
import { filterListings } from "@/lib/utils";
import Navigation from "@/components/Listings/Navigation";
import Filter from "@/components/Listings/Filter";
import CardList from "@/components/Listings/Card/CardList";
import CreateOrEditListing from "@/components/Listings/Actions/CreateOrEditListing";

type SidebarProps = {
  listingsToShow: Listing[] | null;
};

export default function Sidebar({ listingsToShow }: SidebarProps) {
  const { user } = useUser();

  const { dashboardFor } = useListings();

  const [currFilter, setCurrFilter] = useState("new");

  const showFilter =
    listingsToShow && listingsToShow.length > 0 && dashboardFor === "view";

  return (
    <div className="h-full overflow-y-hidden px-3">
      <div className="flex justify-between sticky top-0">
        {user && <Navigation />}
        {showFilter && <Filter setCurrFilter={setCurrFilter} />}
      </div>
      <div className="h-[calc(100%-48px)] overflow-y-auto">
        {listingsToShow ? (
          <CardList
            listingsToShow={filterListings(currFilter, listingsToShow)}
          />
        ) : (
          <CreateOrEditListing />
        )}
      </div>
    </div>
  );
}
