import { Badge as BadgeShadcn } from "@/components/ui/badge";
import { getLastUpdatedTimeAgo } from "@/lib/utils";

export default function Badge({
  stillThere,
  stillThereUpdatedAt,
}: {
  stillThere: boolean;
  stillThereUpdatedAt: string;
}) {
  return (
    <BadgeShadcn
      className={`${
        stillThere
          ? "bg-green-500 hover:bg-green-500"
          : "bg-red-600 hover:bg-red-600"
      } text-[10px] hover:bg-green-500`}
    >
      {stillThere ? "Still there" : "Not there"} &#40;
      {getLastUpdatedTimeAgo(stillThereUpdatedAt, "badge")}
      &#41;
    </BadgeShadcn>
  );
}
