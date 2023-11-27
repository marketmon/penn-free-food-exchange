import { Button } from "@/components/ui/button";

type ButtonHomeProps = {
  text: string;
};

export default function ButtonHome({ text }: ButtonHomeProps) {
  return (
    <Button className="w-[210px]" variant="home">
      {text}
    </Button>
  );
}
