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
      sizes="64px"
      className="h-auto w-16"
      alt="thumbnail of image"
    />
  );
}
