"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { StayVendor } from "@/type";
import { ImageCarousel } from "./ImageCarousel";

interface StayVendorModalProps {
  vendor: StayVendor;
  isOpen: boolean;
  onClose: () => void;
}

export function StayVendorModal({
  vendor,
  isOpen,
  onClose,
}: StayVendorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{vendor.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <ImageCarousel images={vendor.imgUrls} />
          <div className="grid gap-2">
            <p className="text-lg font-semibold">${vendor.price} per night</p>
            {vendor.rating && (
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{vendor.rating}</span>
              </div>
            )}
            <p className="text-gray-600">{vendor.description}</p>
            <p className="text-sm text-gray-600">
              {vendor.availability
                ? `${vendor.roomsAvailable} rooms available`
                : `Next available: ${vendor.nextAvailability}`}
            </p>
          </div>
          <Button className="w-full">Book Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
