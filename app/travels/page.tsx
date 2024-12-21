import React from "react";
import { getData } from "../action";
import { TravelVendor } from "@/type";
import { StayVendorCard } from "@/components/StayVendorCard";
import NoResultFound from "@/components/NoResultFound";
export const dynamic = "force-dynamic";

const page = async () => {
  const vendorsData: any = await getData("Travels");
  return (
    <div className="container mx-auto">
      {Object.entries(vendorsData).length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vendorsData.map((vendor: TravelVendor) => (
            <StayVendorCard key={vendor.vendorId} vendor={vendor} type="travel" />
          ))}
        </div>
      ) : (
        <NoResultFound />
      )}
    </div>
  );
};

export default page;
