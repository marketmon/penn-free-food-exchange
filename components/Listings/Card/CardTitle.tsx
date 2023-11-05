import { CardTitle as CardTitleShadcn } from "@/components/ui/card";

type CardTitleProps = {
  icon: string;
  location: string;
};

export default function CardTitle({ icon, location }: CardTitleProps) {
  return (
    <CardTitleShadcn className="flex">
      <div className="mr-2">{icon}</div>
      <div>{location}</div>
    </CardTitleShadcn>
  );
}
