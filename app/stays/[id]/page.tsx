import { getVendorDetails } from "@/app/action";
import StaysForm from "@/components/StaysForm";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;
  const getVendorData = await getVendorDetails(id, "Stays");
  // console.log(getVendorData);
  return (
    <div>
      <StaysForm formData={getVendorData} />
    </div>
  );
};

export default page;
