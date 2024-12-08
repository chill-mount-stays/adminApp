import { getVendorDetails } from "@/app/action";
import TravelsForm from "@/components/TravelsForm";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;

  const { vendorData, vendorDetailsData }: any = await getVendorDetails(
    id,
    "Travels"
  );
  return (
    <div>
      <TravelsForm
        formData={vendorData}
        vendorDetailsData={vendorDetailsData}
      />
    </div>
  );
};

export default page;
