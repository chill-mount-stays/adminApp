export type CustomerInfo = {
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  foodDate: string;
  destination: string;
  pickUp: string;
  dropDown: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
} & (
  | {
      category: "food";
      itemCount: number;
    }
  | {
      category: "travel" | "stay";
    }
);

export type OrderData = {
  id: string;
  customerInfo: CustomerInfo;
  stayItem: CartItem[];
  travelItem: CartItem[];
  foodItems: CartItem[];
  bookingDate: string;
};
