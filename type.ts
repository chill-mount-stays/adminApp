export interface VendorDetails {
  vendorId: string;
  ownerName: string;
  ownerContact: string;
  address: string;
}
export interface StayVendor {
  vendorId: string;
  name: string;
  price: number;
  availability: boolean;
  nextAvailability?: string;
  roomsAvailable?: number;
  imgUrls: string[];
  description?: string;
  rating?: number;
}

export interface StayVendorDetails extends VendorDetails {
  receptionContact: string;
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

export interface CarVendorDetails extends VendorDetails {
  driverName: string;
  driverContact: string;
  driverLicense?: string;
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
