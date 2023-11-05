import { Button } from "@/components/ui/button";

export default function ButtonEdit() {
  function onClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    console.log("Edit");
  }

  return (
    <Button variant="secondary" className="px-3 shadow-none" onClick={onClick}>
      Edit
    </Button>
  );
}
