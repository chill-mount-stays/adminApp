"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon, Trash } from "lucide-react";
import { StayVendorModal } from "./StayVendorModal";
import { Food, StayVendor, TravelVendor } from "@/type";
import { removeRecordFromDB } from "@/app/action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export function StayVendorCard({
  vendor,
  type,
}: {
  vendor: StayVendor | TravelVendor | Food;
  type: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isStayVendor = (vendor: any): vendor is StayVendor => type === "stay";
  const isTravelVendor = (vendor: any): vendor is TravelVendor =>
    type === "travel";
  const isFood = (vendor: any): vendor is Food => type === "food";

  const handleRemoveRecord = async () => {
    const storagePaths = vendor.imgUrls.map((image) => image.imageId);
    let isRecordDeleted;
    if (isStayVendor(vendor)) {
      isRecordDeleted = await removeRecordFromDB(
        storagePaths,
        vendor.vendorId,
        "Stays",
        vendor.vendorsRefId
      );
    } else if (isTravelVendor(vendor)) {
      isRecordDeleted = await removeRecordFromDB(
        storagePaths,
        vendor.vendorId,
        "Travels",
        vendor.vendorsRefId
      );
    } else {
      isRecordDeleted = await removeRecordFromDB(
        storagePaths,
        vendor.foodId,
        "Foods"
      );
    }
    if (isRecordDeleted) {
      router.refresh();
      toast({
        title: "Recor Removed!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to delete the record.",
      });
    }
  };

  return (
    <>
      <Card className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg w-full max-w-2xl mx-auto">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-2/5 min-h-48 md:h-auto">
              <Image
                src={vendor.imgUrls[0]?.firebaseUrl || "/placeholder.svg"}
                alt={vendor.name}
                sizes="100%"
                width={500}
                height={500}
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="flex flex-col justify-between p-4 md:w-3/5">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold mb-2">{vendor.name}</h3>
                  <Button
                    size={"sm"}
                    variant={"destructive"}
                    onClick={handleRemoveRecord}
                  >
                    <Trash />
                  </Button>
                </div>
                {isTravelVendor(vendor) && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {vendor.travelOption}
                  </p>
                )}
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
                {isTravelVendor(vendor) && (
                  <p className="text-lg font-bold">₹{vendor.costPerDay}</p>
                )}
                {isFood(vendor) && (
                  <p className="text-lg font-bold">₹{vendor.price}</p>
                )}
                {(isTravelVendor(vendor) || isFood(vendor)) && (
                  <div className="text-sm text-gray-600">
                    {vendor.availability ? (
                      <p className="text-green-600">Available</p>
                    ) : (
                      <p>Next available: {vendor.nextAvailability}</p>
                    )}
                  </div>
                )}
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <StayVendorModal
        type={type}
        vendor={vendor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
