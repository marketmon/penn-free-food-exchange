import { Badge as BadgeShadcn } from "@/components/ui/badge";
import { getLastUpdatedTimeAgo } from "@/lib/helpers";

type BadgeProps = {
  stillThere: boolean;
  updatedAt: string;
};

export default function Badge({ stillThere, updatedAt }: BadgeProps) {
  return (
    <BadgeShadcn
      className={`${
        stillThere
          ? "bg-green-500 hover:bg-green-500"
          : "bg-red-600 hover:bg-red-600"
      } text-[10px]`}
    >
      {stillThere ? "Still there" : "Not there"} &#40;
      {getLastUpdatedTimeAgo(updatedAt, "badge")}
      &#41;
    </BadgeShadcn>
  );
}
