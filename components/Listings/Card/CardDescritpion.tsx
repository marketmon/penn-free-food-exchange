import { CardDescription as CardDescriptionShadcn } from "@/components/ui/card";

type CardDescriptionProps = {
  caption: string;
};

export default function CardDescription({ caption }: CardDescriptionProps) {
  return caption && <CardDescriptionShadcn>{caption}</CardDescriptionShadcn>;
}
