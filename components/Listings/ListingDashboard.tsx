export default function ListingDashboard({
  mapcomponent,
  sidebarComponent,
}: {
  mapcomponent: React.ReactNode;
  sidebarComponent: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <div className="w-2/3">{mapcomponent}</div>
      <div className="w-1/3">{sidebarComponent}</div>
    </div>
  );
}
