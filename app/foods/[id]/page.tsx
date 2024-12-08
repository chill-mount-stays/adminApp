import { getFood, getVendorDetails } from "@/app/action";
import FoodForm from "@/components/FoodForm";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;
  const foodData = await getFood(id);

  return (
    <div>
      <FoodForm foodData={foodData} />
    </div>
  );
};

export default page;
