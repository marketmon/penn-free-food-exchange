import { X } from "lucide-react";
import { FormInput } from "@/lib/types";
import { useListingImage } from "@/context/ListingImageProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import Image from "@/components/Listings/Image";
import ButtonSecondary from "@/components/common/Button/ButtonSecodary";

type FileInputProps = {
  input: FormInput;
};

export default function File({ input }: FileInputProps) {
  const {
    imageUrl,
    imageOperationInProgress,
    progress,
    onUploadImage,
    onDeleteImage,
  } = useListingImage();

  return (
    <div>
      <input
        type="file"
        id="browseImage"
        className="hidden"
        onChange={(e) =>
          onUploadImage(e.target.files ? e.target.files[0] : undefined)
        }
        onClick={(e) => ((e.target as HTMLButtonElement).value = "")}
      />
      <ButtonSecondary
        btnText="Select an image"
        disabled={input.disabled}
        onClick={() => document.getElementById("browseImage")?.click()}
      />

      {imageUrl && (
        <div className="flex justify-start space-x-1 mt-2">
          <div className="w-16 h-auto">
            <Image imageUrl={imageUrl} />
          </div>
          <X
            onClick={() => onDeleteImage()}
            className="text-red-500 h-4 w-4 cursor-pointer"
          />
        </div>
      )}
      {imageOperationInProgress && (
        <div className="flex flex-col mt-2 w-12 space-y-2">
          <Skeleton className="h-12 w-full" />
          <Progress value={progress} className="w-full h-[6px]" />
        </div>
      )}
    </div>
  );
}
