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
  imgUrls: DBImageFile[];
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
  imgUrls: { imageId: string; firebaseUrl: string }[];
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
  imgUrls: { imageId: string; firebaseUrl: string }[];
  category: "Veg" | "Non-Veg";
  availability: boolean;
  nextAvailability?: string;
  rating?: number;
  tags?: string[];
}

export interface ImageFile extends File {
  firebaseUrl: string;
  imageId: string;
}
export interface DBImageFile {
  firebaseUrl: string;
  imageId: string;
}
