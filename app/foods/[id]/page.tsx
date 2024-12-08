import { getVendorDetails } from "@/app/action";
import FoodForm from "@/components/FoodForm";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;
  const getVendorData = await getVendorDetails(id, "Foods");

  return (
    <div>
      <FoodForm />
    </div>
  );
};

export default page;
