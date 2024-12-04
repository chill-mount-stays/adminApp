"use client";
import React, { useState } from "react";
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

const TravelsForm = () => {
  const InitialStayForm: StayVendor = {
    vendorId: "",
    name: "",
    price: 0,
    availability: false,
    nextAvailability: undefined,
    roomsAvailable: undefined,
    imgUrls: [],
    description: undefined,
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
          <form className="flex lg:flex-row gap-8">
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
                  <Label htmlFor="name">Price Per Day *</Label>
                  <Input
                    id="price"
                    type="number"
                    name="price"
                    value={stayForm.price}
                    onChange={handleChange}
                    placeholder="Cost per day"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5 max-w-fit">
                  <Label htmlFor="name">Availability*</Label>
                  <Switch
                    id="availability"
                    name="availability"
                    required
                    onCheckedChange={(bool) =>
                      setStayForm({ ...stayForm, availability: bool })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Next Availability</Label>
                <Input
                  id="nextAvailability"
                  type="text"
                  name="nextAvailability"
                  value={stayForm.nextAvailability}
                  onChange={handleChange}
                  placeholder="In hours & mins"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Rooms Available</Label>
                <Input
                  id="roomsAvailable"
                  type="number"
                  name="roomsAvailable"
                  value={stayForm.roomsAvailable}
                  onChange={handleChange}
                  placeholder="No of rooms available now"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={stayForm.description}
                  onChange={handleChange}
                  placeholder="Mention AC/Non-AC, No of rooms, bed count, bathroom availability."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  name="rating"
                  value={stayForm.roomsAvailable}
                  onChange={handleChange}
                  placeholder="1 | 2 | 3 | 4 | 5"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full border rounded-md">
              Image Upload Area
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TravelsForm;
