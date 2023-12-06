import Image from "next/image";

type ThumbnailProps = {
  imageUrl: string;
};

export default function Thumbnail({ imageUrl }: ThumbnailProps) {
  return (
    <Image
      src={imageUrl}
      height={0}
      width={0}
      sizes="100vw"
      className="w-full h-auto"
      alt="image"
    />
  );
}
