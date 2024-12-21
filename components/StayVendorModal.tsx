"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Food, StayVendor, TravelVendor } from "@/type";
import { ImageCarousel } from "./ImageCarousel";
import { useRouter } from "next/navigation";

interface StayVendorModalProps {
  type: string;
  vendor: StayVendor | TravelVendor | Food;
  isOpen: boolean;
  onClose: () => void;
}

export function StayVendorModal({
  type,
  vendor,
  isOpen,
  onClose,
}: StayVendorModalProps) {
  const router = useRouter();

  const isStayVendor = (vendor: any): vendor is StayVendor => type === "stay";
  const isTravelVendor = (vendor: any): vendor is TravelVendor =>
    type === "travel";
  const isFood = (vendor: any): vendor is Food => type === "food";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{vendor.name}</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <ImageCarousel images={vendor.imgUrls} />
          <div className="grid gap-2">
            {isStayVendor(vendor) && (
              <p className="text-lg font-semibold">${vendor.price} per night</p>
            )}
            {isTravelVendor(vendor) && (
              <p className="text-lg font-semibold">
                ${vendor.costPerDay} per day
              </p>
            )}
            {isFood(vendor) && (
              <p className="text-lg font-semibold">
                ${vendor.price} per quantity
              </p>
            )}
            {vendor.rating && (
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{vendor.rating}</span>
              </div>
            )}
            <p className="text-gray-600">{vendor.description}</p>
            {isStayVendor(vendor) && (
              <p className="text-sm text-gray-600">
                {vendor.availability
                  ? `${vendor.roomsAvailable} rooms available`
                  : `Next available: ${vendor.nextAvailability}`}
              </p>
            )}
          </div>
          {isStayVendor(vendor) && (
            <Button
              className="w-full"
              onClick={() => router.push(`/stays/${vendor.vendorId}`)}
            >
              Edit
            </Button>
          )}
          {isTravelVendor(vendor) && (
            <Button
              className="w-full"
              onClick={() => router.push(`/travels/${vendor.vendorId}`)}
            >
              Edit
            </Button>
          )}
          {isFood(vendor) && (
            <Button
              className="w-full"
              onClick={() => router.push(`/foods/${vendor.foodId}`)}
            >
              Edit
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
