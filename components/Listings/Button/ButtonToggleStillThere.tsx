import { Button } from "@/components/ui/button";

type ButtonToogleStillThereProps = {
  stillThere: boolean;
  onClick: (arg: undefined) => void;
};

export default function ButtonToogleStillThere({
  stillThere,
  onClick,
}: ButtonToogleStillThereProps) {
  return (
    <Button
      variant="secondary"
      className={`${
        stillThere
          ? "border-red-500 text-red-500"
          : "border-green-500 text-green-500"
      } border bg-transparent text-[10px] h-6 py-0"`}
      onClick={() => onClick(undefined)}
    >
      {stillThere ? "Not there?" : "Still there?"}
    </Button>
  );
}
