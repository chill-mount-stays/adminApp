"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageCarouselProps {
  images: { imageId: string; firebaseUrl: string }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.imageId}>
            <div className="relative aspect-video">
              <Image
                src={image.firebaseUrl}
                alt="Stay vendor image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
