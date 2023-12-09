import ImageNext from "next/image";

type ImageProps = {
  src: string;
  width?: number;
  height?: number;
  heightAuto?: boolean;
  priority?: boolean;
  imageStyles?: string;
};

export default function Image({
  src,
  width,
  height,
  heightAuto = false,
  priority = false,
  imageStyles,
}: ImageProps) {
  return (
    <ImageNext
      src={src}
      height={height ? height : 0}
      width={width ? width : 0}
      sizes="100vw"
      className={`${
        !width && !height && `w-full ${heightAuto ? "h-auto" : "h-full"}`
      } ${imageStyles}`}
      alt="image"
      priority={priority}
    />
  );
}
