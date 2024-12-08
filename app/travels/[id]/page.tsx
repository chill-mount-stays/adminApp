import { getVendorDetails } from "@/app/action";
import TravelsForm from "@/components/TravelsForm";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;

  const getVendorData = await getVendorDetails(id, "Travels");
  return (
    <div>
      <TravelsForm />
    </div>
  );
};

export default page;
