import React from "react";
import { getData } from "../action";
import { StayVendor } from "@/type";
import { StayVendorCard } from "@/components/StayVendorCard";

const page = async () => {
  const vendorsData: any = await getData("Stays");
  //   console.log(vendorsData);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vendorsData &&
          vendorsData.map((vendor: StayVendor) => (
            <StayVendorCard key={vendor.vendorId} vendor={vendor} />
          ))}
      </div>
    </div>
  );
};

export default page;
