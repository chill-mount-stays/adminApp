"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageFile } from "@/type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

// interface ImageFile extends File {
//   preview: string;
//   storagePath?: string;
// }

interface ImagePreviewProps {
  images?: ImageFile[];
  imageUrls?: string[];
  removeImage: (index: number, image: ImageFile) => Promise<void>;
}

export default function ImagePreview({
  images = [],
  imageUrls = [],
  removeImage,
}: ImagePreviewProps) {
  if (!images || images.length === 0) return null;
  const [imgIdx, setImgIndex] = useState(1);
  return (
    <Carousel className="w-full max-w-md mx-auto">
      <CarouselContent className="border-red-50">
        {images.map((image, index) => (
          <CarouselItem
            key={`Image__${index}`}
            onClick={() => removeImage(index, image)}
          >
            <div className="w-full border relative aspect-square">
              <Image
                src={image.preview}
                alt={image.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onImageChange={() => setImgIndex(imgIdx - 1)} />
      <CarouselNext onImageChange={() => setImgIndex(imgIdx + 1)} />
      <p className="text-muted-foreground text-sm text-center mt-4">
        {imgIdx} of {images.length}
      </p>
    </Carousel>
    // <div className="flex flex-wrap gap-4 mt-4">
    //   {images.map((image, index) => (
    //     <div
    //       key={`Image__${index}`}
    //       onClick={() => removeImage(index, image)}
    //       className="relative w-36 h-36 overflow-hidden rounded-lg border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-105"
    //     >
    //       <Image
    //         className="object-cover"
    //         fill
    //         sizes="(max-width: 96px) 100vw, 96px"
    //         alt={image.name}
    //         src={image.preview}
    //       />

    //       {imageUrls && !imageUrls[index] && (
    //         <div className="absolute inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center">
    //           <span className="text-white text-xs font-semibold">Error</span>
    //         </div>
    //       )}
    //     </div>
    //   ))}
    // </div>
  );
}
