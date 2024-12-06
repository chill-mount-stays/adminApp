"use client";
import { removeImageFromFirebase, uploadImageToFirebase } from "@/app/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageFile } from "@/type";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export const ImageUpload = ({
  setFormImages,
  setDisableDeploy,
}: {
  setFormImages: React.Dispatch<
    React.SetStateAction<
      {
        imageId: string;
        firebaseUrl: string;
      }[]
    >
  >;
  setDisableDeploy: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fileEnter, setFileEnter] = useState<boolean>(false);
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
    setDisableDeploy(true);
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
    setDisableDeploy(false);
  };
  const handleImagesDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    setDisableDeploy(true);
    if (!e.dataTransfer.files) return;
    const files = Array.from(e.dataTransfer.files);
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
    setDisableDeploy(false);
  };

  const removeImage = async (index: number, image: ImageFile) => {
    setDisableDeploy(true);
    const removeImageStatusCode = await removeImageFromFirebase(
      image.storagePath
    );
    if (!removeImageStatusCode) {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImageUrls((prev) => prev.filter((_, i) => i !== index));
    }
    setDisableDeploy(false);
  };
  return (
    <div>
      {
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col w-full  items-center justify-center gap-1.5">
            <p>{imageUrls.length} Images uploaded</p>
            <Label
              className="cursor-pointer text-center border-blue-950 border-2 p-2 rounded-lg"
              htmlFor="picture"
            >
              Click to upload
            </Label>
            <Input
              onChange={handleImageChange}
              className="cursor-pointer hidden"
              multiple
              id="picture"
              type="file"
            />
            <div
              className="w-full border bottom-2 h-36 flex items-center justify-center border-dotted border-gray-800 border-opacity-50"
              onDragOver={(e) => {
                e.preventDefault();
                setFileEnter(true);
              }}
              onDragLeave={(e) => {
                setFileEnter(false);
              }}
              onDragEnd={(e) => {
                e.preventDefault();
                setFileEnter(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setFileEnter(false);
                handleImagesDrop(e);
              }}
            >
              {fileEnter ? "DROP" : "Drop images here"}
            </div>
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
