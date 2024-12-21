import React from "react";
import { getData } from "../action";
import { StayVendor } from "@/type";
import { StayVendorCard } from "@/components/StayVendorCard";
import NoResultFound from "@/components/NoResultFound";
export const dynamic = "force-dynamic";

const page = async () => {
  const vendorsData: any = await getData("Stays");
  //   console.log(vendorsData);
  return (
    <div className="container mx-auto">
      {Object.entries(vendorsData).length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vendorsData.map((vendor: StayVendor) => (
            <StayVendorCard key={vendor.vendorId} vendor={vendor} type="stay" />
          ))}
        </div>
      ) : (
        <NoResultFound />
      )}
    </div>
  );
};

export default page;
