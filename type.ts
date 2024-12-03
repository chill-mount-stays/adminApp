export interface StayVendor {
  vendorId: string;
  name: string;
  prize: number;
  availability: boolean;
  nextAvailability?: string;
  roomsAvailable?: number;
  imgUrls: string[];
  description?: string;
  rating?: number;
}

export interface CarVendor {
  vendorId: string;
  name: string;
  carOption: "AC" | "Non-AC";
  costPerDay: number;
  availability: boolean;
  nextAvailability?: string;
  imgUrls: string[];
  rating?: number;
}

export interface Food {
  foodId: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  category: "Veg" | "Non-Veg";
  availability: boolean;
  nextAvailability?: string;
  rating?: number;
  tags?: string[];
}
