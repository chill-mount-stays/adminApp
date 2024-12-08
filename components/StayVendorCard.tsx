"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { StayVendorModal } from "./StayVendorModal";
import { Food, StayVendor, TravelVendor } from "@/type";
import StaysForm from "./StaysForm";

export function StayVendorCard({
  vendor,
}: {
  vendor: StayVendor | TravelVendor | Food;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(vendor);

  const isStayVendor = (vendor: any): vendor is StayVendor =>
    vendor.type === "stay";
  const isTravelVendor = (vendor: any): vendor is TravelVendor =>
    vendor.type === "travel";
  const isFood = (vendor: any): vendor is Food => vendor.type === "food";

  return (
    <>
      <Card
        className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg w-full max-w-2xl mx-auto"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-2/5 h-48 md:h-auto">
              <Image
                src={vendor.imgUrls[0]?.firebaseUrl || "/placeholder.svg"}
                alt={vendor.name}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-between p-4 md:w-3/5">
              <div>
                <h3 className="text-lg font-semibold mb-2">{vendor.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {vendor.description}
                </p>
                {vendor.rating && (
                  <div className="flex items-center mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{vendor.rating}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-4">
                {isStayVendor(vendor) && (
                  <div>
                    <p className="text-lg font-bold">₹{vendor.price}</p>
                    <p className="text-sm text-gray-600">
                      {vendor.availability
                        ? `${vendor.roomsAvailable} rooms left`
                        : `Next available: ${vendor.nextAvailability}`}
                    </p>
                  </div>
                )}
                <Button variant="outline">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <StayVendorModal
        vendor={vendor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}