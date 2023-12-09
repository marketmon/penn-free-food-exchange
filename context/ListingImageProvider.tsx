"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useEdgeStore } from "./EdgeStoreProvider";

type ListingImageContextType = {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
  imageOperationInProgress: boolean;
  setImageOperationInProgress: Dispatch<SetStateAction<boolean>>;
  imageError: Error | null;
  setImageError: Dispatch<SetStateAction<Error | null>>;
  progress: number;
  onUploadImage: (file: File | undefined) => Promise<void>;
  onDeleteImage: (url?: string) => Promise<void>;
};

type ListingImageProviderProps = {
  children: React.ReactNode;
};

const ListingImageContext = createContext<ListingImageContextType | undefined>(
  undefined
);

export function ListingImageProvider({ children }: ListingImageProviderProps) {
  const { edgestore } = useEdgeStore();

  const [imageUrl, setImageUrl] = useState("");
  const [imageOperationInProgress, setImageOperationInProgress] =
    useState(false);
  const [imageError, setImageError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  async function onUploadImage(file?: File) {
    if (file) {
      setImageOperationInProgress(true);

      try {
        const res = await edgestore!.images.upload({
          file,
          onProgressChange: (progress) => setProgress(progress),
        });
        setImageUrl(res.url);
        setImageError(null);
      } catch (error) {
        setImageError(new Error("Error uploading image. Please try again."));
      }

      setImageOperationInProgress(false);
    }
  }

  async function onDeleteImage(url?: string) {
    setImageUrl("");

    try {
      await edgestore!.images.delete({ url: url || imageUrl });
      setImageError(null);
    } catch (error) {
      setImageError(new Error("Error deleting image. Please try again."));
    }
  }

  return (
    <ListingImageContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        imageOperationInProgress,
        setImageOperationInProgress,
        imageError,
        setImageError,
        progress,
        onUploadImage,
        onDeleteImage,
      }}
    >
      {children}
    </ListingImageContext.Provider>
  );
}

export function useListingImage() {
  const context = useContext(ListingImageContext);

  if (context === undefined) {
    throw new Error(
      "useListingImage must be used within a ListingImageProvider"
    );
  }

  return context;
}
