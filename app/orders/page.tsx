"use client";
import { OrdersTableWithPopup } from "@/components/OrderDataTable";
import { getOrderDetails } from "../action";
import { useEffect, useState } from "react";
import { OrderData } from "@/lib/types";
export const dynamic = "force-dynamic";

const page = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  // const orderDetails: any = await getOrderDetails();
  useEffect(() => {
    getOrderDetails(setOrders);
  }, []);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>
      <OrdersTableWithPopup orders={orders} />
    </div>
  );
};

export default page;
