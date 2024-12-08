import React from "react";
import { getData } from "../action";
import { Food, StayVendor } from "@/type";
import { StayVendorCard } from "@/components/StayVendorCard";
import NoResultFound from "@/components/NoResultFound";

const page = async () => {
  const vendorsData: any = await getData("Foods");
  return (
    <div className="container mx-auto">
      {Object.entries(vendorsData).length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vendorsData.map((vendor: Food) => (
            <StayVendorCard key={vendor.foodId} vendor={vendor} />
          ))}
        </div>
      ) : (
        <NoResultFound />
      )}
    </div>
  );
};

export default page;
