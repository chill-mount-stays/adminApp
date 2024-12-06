"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StayVendor, StayVendorDetails } from "@/type";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { ImageUpload } from "./ImageUpload";

const StaysForm = () => {
  const InitialStayForm: StayVendor = {
    vendorId: "",
    name: "",
    price: 0,
    availability: false,
    nextAvailability: "",
    roomsAvailable: 0,
    imgUrls: [],
    description: "",
    rating: 0,
  };
  const InitialStayDetails: StayVendorDetails = {
    vendorId: "",
    ownerName: "",
    ownerContact: "",
    address: "",
    receptionContact: "",
  };

  const [stayForm, setStayForm] = useState<StayVendor>(InitialStayForm);
  const [stayVendorDetails, setStayVendorDetails] =
    useState<StayVendorDetails>(InitialStayDetails);
  const [images, setImages] = useState<
    { imageId: string; firebaseUrl: string }[]
  >([]);

  useEffect(() => {
    setStayForm((prev) => ({ ...prev, imgUrls: [...prev.imgUrls, ...images] }));
  }, [images]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setStayForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setStayVendorDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(stayForm);
    console.log(stayVendorDetails);
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Stay Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="flex lg:flex-row gap-8">
              <div className="grid items-center gap-4 lg:w-[640px]">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={stayForm.name}
                    onChange={handleChange}
                    placeholder="Name of your vendor stay"
                    required
                  />
                </div>
                <div className="flex items-top justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="price">Price Per Day *</Label>
                    <Input
                      id="price"
                      type="number"
                      name="price"
                      value={stayForm.price === 0 ? "" : stayForm.price}
                      onChange={handleChange}
                      placeholder="Cost per day"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 max-w-fit">
                    <Label htmlFor="availability">Availability*</Label>
                    <Switch
                      id="availability"
                      name="availability"
                      checked={stayForm.availability}
                      onCheckedChange={(bool) => {
                        setStayForm((prev) => {
                          return { ...prev, availability: bool };
                        });
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="nextAvailability">Next Availability</Label>
                  <Input
                    id="nextAvailability"
                    type="text"
                    name="nextAvailability"
                    value={stayForm.nextAvailability}
                    onChange={handleChange}
                    placeholder="In hours & mins"
                  />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="roomsAvailable">Rooms Available</Label>
                    <Input
                      id="roomsAvailable"
                      type="number"
                      name="roomsAvailable"
                      value={
                        stayForm.roomsAvailable === 0
                          ? ""
                          : stayForm.roomsAvailable
                      }
                      onChange={handleChange}
                      placeholder="No of rooms available now"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      name="rating"
                      value={stayForm.rating === 0 ? "" : stayForm.rating}
                      onChange={handleChange}
                      placeholder="1 | 2 | 3 | 4 | 5"
                      min={1}
                      max={5}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={stayForm.description}
                    onChange={handleChange}
                    placeholder="Mention AC/Non-AC, No of rooms, bed count, bathroom availability."
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    type="text"
                    name="ownerName"
                    value={stayVendorDetails.ownerName}
                    onChange={handleChange}
                    placeholder="Enter the owner name"
                  />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Owner Contact</Label>
                    <Input
                      id="ownerContact"
                      type="text"
                      name="ownerContact"
                      value={stayVendorDetails.ownerContact}
                      onChange={handleChange}
                      placeholder="Owner contact"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 ">
                    <Label htmlFor="receptionContact">Reception Contact</Label>
                    <Input
                      id="receptionContact"
                      type="text"
                      name="receptionContact"
                      value={stayVendorDetails.receptionContact}
                      onChange={handleChange}
                      placeholder="Reception contact"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={stayVendorDetails.address}
                    onChange={handleChange}
                    placeholder="Enter the address"
                    required
                  />
                </div>
              </div>
              <div className="p-5 w-full border rounded-md">
                <ImageUpload setFormImages={setImages} />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("~>", stayForm);
                }}
              >
                Deploy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaysForm;
