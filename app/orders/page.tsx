import { OrdersTableWithPopup } from "@/components/OrderDataTable";
import { getOrderDetails } from "../action";

const page = async () => {
  const orderDetails: any = await getOrderDetails();
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>
      <OrdersTableWithPopup orders={orderDetails} />
    </div>
  );
};

export default page;
