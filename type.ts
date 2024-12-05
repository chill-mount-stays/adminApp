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

export interface TravelVendor {
  vendorId: string;
  name: string;
  travelOption: "AC" | "Non-AC";
  costPerDay: number;
  availability: boolean;
  nextAvailability?: string;
  imgUrls: string[];
  description?: string;
  rating?: number;
}

export interface TravelVendorDetails extends VendorDetails {
  driverName?: string;
  driverContact?: string;
  driverLicense?: string;
}

export interface Food {
  foodId: string;
  name: string;
  description: string;
  price: number;
  imgUrls: string[];
  category: "Veg" | "Non-Veg";
  availability: boolean;
  nextAvailability?: string;
  rating?: number;
  tags?: string[];
}
