import { getLastUpdatedTimeAgo } from "@/lib/helpers";
import { HeartIcon } from "@radix-ui/react-icons";

type CardFooterProps = {
  updatedAt: string;
  numThanks: number;
  contact: string;
};

export default function CardFooter({
  updatedAt,
  numThanks,
  contact,
}: CardFooterProps) {
  const lastUpdatedTime = getLastUpdatedTimeAgo(updatedAt, "card");

  return (
    <div className="space-x-4 flex text-xs text-muted-foreground px-5 py-6">
      <div>{lastUpdatedTime}</div>
      {contact && (
        <a href={`tel:${contact}`} onClick={(e) => e.stopPropagation()}>
          {contact}
        </a>
      )}
      <div className="flex items-center">
        <HeartIcon className="mr-1 h-3 w-3" />
        {numThanks}
      </div>
    </div>
  );
}
