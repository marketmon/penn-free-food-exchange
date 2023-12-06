import { getLastUpdatedTimeAgo } from "@/lib/utils";
import { HeartIcon } from "@radix-ui/react-icons";
import Image from "next/image";

type CardFooterProps = {
  updatedAt: string;
  numThanks: number;
  contact: string;
  imageThumbnailUrl: string;
};

export default function CardFooter({
  updatedAt,
  numThanks,
  contact,
  imageThumbnailUrl,
}: CardFooterProps) {
  const lastUpdatedTime = getLastUpdatedTimeAgo(updatedAt, "card");

  return (
    <div className="space-x-4 flex justify-between items-end text-xs text-muted-foreground px-5 py-6">
      <div className="flex space-x-4">
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
      {/* insert image here */}
    </div>
  );
}
