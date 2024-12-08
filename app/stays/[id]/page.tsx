import { getVendorDetails } from "@/app/action";
import StaysForm from "@/components/StaysForm";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;
  const { vendorData, vendorDetailsData }: any = await getVendorDetails(
    id,
    "Stays"
  );
  // console.log(getVendorData);
  return (
    <div>
      <StaysForm formData={vendorData} vendorDetailsData={vendorDetailsData} />
    </div>
  );
};

export default page;
