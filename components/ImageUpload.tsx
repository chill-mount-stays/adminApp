"use client";
import { removeImageFromFirebase, uploadImageToFirebase } from "@/app/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageFile } from "@/type";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export const ImageUpload = ({
  setFormImages,
}: {
  setFormImages: React.Dispatch<
    React.SetStateAction<
      {
        imageId: string;
        firebaseUrl: string;
      }[]
    >
  >;
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const uploadPromises: Promise<string>[] = [];

  useEffect(() => {
    const imagesWithURLS: {
      imageId: string;
      firebaseUrl: string;
    }[] = [];
    images.forEach((image, _idx) => {
      imagesWithURLS.push({
        imageId: image.storagePath,
        firebaseUrl: imageUrls[_idx],
      });
    });
    setFormImages(imagesWithURLS);
  }, [imageUrls]);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const updatedImages: ImageFile[] = files.map((file) => {
      const { storagePath, firebaseUrl } = uploadImageToFirebase(file);
      uploadPromises.push(firebaseUrl);
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
        storagePath: storagePath,
      });
    });
    setImages((prev) => [...prev, ...updatedImages]);
    const urls = await Promise.all(uploadPromises);
    setImageUrls((prev) => [...prev, ...urls]);
  };

  const removeImage = async (index: number, image: ImageFile) => {
    const removeImageStatusCode = await removeImageFromFirebase(
      image.storagePath
    );
    if (!removeImageStatusCode) {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImageUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };
  return (
    <div>
      {
        <div className="flex flex-col items-center gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="cursor-pointer" htmlFor="picture">
              Upload Images
            </Label>
            <Input
              onChange={handleImageChange}
              className="cursor-pointer"
              multiple
              id="picture"
              type="file"
            />
          </div>
        </div>
      }
      {images.length ? (
        <div>
          {images.map((image, _idx) => {
            return (
              <div
                key={`Image__${_idx}`}
                onClick={() => {
                  removeImage(_idx, image);
                }}
                className="w-[100px] h-[80px] relative overflow-hidden rounded-3xl border-white border-4 border-solid drop-shadow-xl cursor-pointer"
              >
                <Image
                  className="w-full h-full object-contain absolute"
                  width={1000}
                  height={1000}
                  alt={image.name}
                  src={image.preview}
                />
                {!imageUrls[_idx] ? (
                  <div className="absolute inset-0 bg-red-500 bg-opacity-50"></div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
