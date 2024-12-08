"use client";
import { removeImageFromFirebase, uploadImageToFirebase } from "@/app/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DBImageFile, ImageFile } from "@/type";
import { CloudUploadIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import ImagePreview from "./ImagePreview";

export const ImageUpload = ({
  initialImages,
  setFormImages,
  setDisableDeploy,
  resetForm = false,
  setResetForm,
  parentCalledFrom = "stays",
}: {
  initialImages: DBImageFile[];
  setFormImages: React.Dispatch<React.SetStateAction<DBImageFile[]>>;
  setDisableDeploy: React.Dispatch<React.SetStateAction<boolean>>;
  setResetForm: React.Dispatch<React.SetStateAction<boolean>>;
  resetForm?: boolean;
  parentCalledFrom?: string;
}) => {
  const [images, setImages] = useState<ImageFile[] | DBImageFile[]>(
    initialImages ?? []
  );
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialImages.map((image) => image.firebaseUrl) ?? []
  );
  const [fileEnter, setFileEnter] = useState<boolean>(false);
  const uploadPromises: Promise<string>[] = [];

  useEffect(() => {
    const imagesWithURLS: {
      imageId: string;
      firebaseUrl: string;
    }[] = [];
    images.forEach((image, _idx) => {
      imagesWithURLS.push({
        imageId: image.imageId,
        firebaseUrl: imageUrls[_idx],
      });
    });
    setFormImages(imagesWithURLS);
  }, [imageUrls]);

  const resetImages = async () => {
    const promiseArray: Promise<void>[] = [];
    images.forEach(async (image, _idx) => {
      promiseArray.push(removeImage(_idx, image.imageId));
    });
    Promise.all(promiseArray)
      .then(() => {
        setImageUrls([]);
        setImages([]);
        setDisableDeploy(false);
        setResetForm(false);
      })
      .catch((e) => {
        console.error("error in removing images", e);
        setResetForm(false);
        setDisableDeploy(false);
      });
  };

  useEffect(() => {
    if (resetForm) {
      setDisableDeploy(true);
      resetImages();
    }
  }, [resetForm]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setDisableDeploy(true);
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const updatedImages: ImageFile[] = files.map((file) => {
      const { storagePath, firebaseUrl } = uploadImageToFirebase(
        file,
        parentCalledFrom
      );
      uploadPromises.push(firebaseUrl);
      return Object.assign(file, {
        firebaseUrl: URL.createObjectURL(file),
        imageId: storagePath,
      });
    });
    setImages((prev) => [...prev, ...updatedImages]);
    const urls = await Promise.all(uploadPromises);
    setImageUrls((prev) => [...prev, ...urls]);
    setDisableDeploy(false);
  };
  const handleImagesDrop = async (e: React.DragEvent<SVGSVGElement>) => {
    setDisableDeploy(true);
    if (!e.dataTransfer.files) return;
    const files = Array.from(e.dataTransfer.files);
    const updatedImages: ImageFile[] = files.map((file) => {
      const { storagePath, firebaseUrl } = uploadImageToFirebase(
        file,
        parentCalledFrom
      );
      uploadPromises.push(firebaseUrl);
      return Object.assign(file, {
        firebaseUrl: URL.createObjectURL(file),
        imageId: storagePath,
      });
    });
    setImages((prev) => [...prev, ...updatedImages]);
    const urls = await Promise.all(uploadPromises);
    setImageUrls((prev) => [...prev, ...urls]);
    setDisableDeploy(false);
  };

  const removeImage = async (index: number, imageId: string) => {
    setDisableDeploy(true);
    const removeImageStatusCode = await removeImageFromFirebase(imageId);
    if (!removeImageStatusCode) {
      setImages((prev) => prev.filter((_, i) => i !== index));
      setImageUrls((prev) => prev.filter((_, i) => i !== index));
    }
    setDisableDeploy(false);
  };

  return (
    <div className="h-full">
      {
        <div className="flex flex-col items-center gap-8 h-full">
          <Card className="w-full border-0 rounded-none shadow-none">
            <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
              <p className=" text-muted-foreground text-sm">
                Drag and drop your images or click the button below to select
                files.
              </p>
              <CloudUploadIcon
                className="w-16 h-16 text-zinc-500 dark:text-zinc-400"
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
              />
              <Label
                className="cursor-pointer text-center border py-2.5 px-4 rounded-md shadow-sm hover:bg-zinc-50"
                htmlFor="picture"
              >
                Select Files
              </Label>
              <Input
                onChange={handleImageChange}
                className="cursor-pointer hidden"
                multiple
                id="picture"
                type="file"
              />
            </CardContent>
          </Card>
          {images.length ? (
            <ImagePreview images={images} removeImage={removeImage} />
          ) : (
            <></>
          )}
        </div>
      }
    </div>
  );
};
