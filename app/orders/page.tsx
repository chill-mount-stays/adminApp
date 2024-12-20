import { OrdersTableWithPopup } from "@/components/OrderDataTable";
import { getData } from "../action";

const page = async () => {
  const orderData: any = await getData("Users");
  console.log(orderData);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Customer Orders</h1>
      <OrdersTableWithPopup orders={orderData} />
    </div>
  );
};

export default page;
