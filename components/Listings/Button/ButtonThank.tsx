import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function ButtonThank({
  onClick,
  currentUserLikedListing,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  currentUserLikedListing: boolean;
}) {
  return (
    <Button variant="secondary" className="px-3 shadow-none" onClick={onClick}>
      {currentUserLikedListing ? (
        <HeartFilledIcon className="mr-2 h-4 w-4" />
      ) : (
        <HeartIcon className="mr-2 h-4 w-4" />
      )}
      thank
    </Button>
  );
}
