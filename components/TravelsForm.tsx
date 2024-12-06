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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TravelVendor, TravelVendorDetails } from "@/type";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { generateDocRef } from "@/app/action";

const TravelsForm = () => {
  const InitialTravelForm: TravelVendor = {
    vendorId: generateDocRef("Travels").id,
    name: "",
    travelOption: "Non-AC",
    costPerDay: 0,
    availability: false,
    nextAvailability: "",
    imgUrls: [],
    description: "",
    rating: 0,
  };
  const [travelForm, setTravelForm] = useState<TravelVendor>(InitialTravelForm);

  const InitialTravelDetails: TravelVendorDetails = {
    vendorId: travelForm.vendorId,
    ownerName: "",
    ownerContact: "",
    address: "",
  };

  const [travelVendorDetails, setTravelVendorDetails] =
    useState<TravelVendorDetails>(InitialTravelDetails);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTravelForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setTravelVendorDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(travelForm);
    console.log(travelVendorDetails);
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Travel Vendor</CardTitle>
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
                    value={travelForm.name}
                    onChange={handleChange}
                    placeholder="Name of your vendor stay"
                    required
                  />
                </div>
                <div className="flex items-top justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="costPerDay">Price Per Day *</Label>
                    <Input
                      id="costPerDay"
                      type="number"
                      name="costPerDay"
                      value={
                        travelForm.costPerDay === 0 ? "" : travelForm.costPerDay
                      }
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
                      checked={travelForm.availability}
                      onCheckedChange={(bool) => {
                        setTravelForm((prev) => {
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
                    value={travelForm.nextAvailability}
                    onChange={handleChange}
                    placeholder="In hours & mins"
                  />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="travelOption">Travel Option</Label>
                    <Select
                      value={travelForm.travelOption}
                      onValueChange={(val: "AC" | "Non-AC") => {
                        setTravelForm({ ...travelForm, travelOption: val });
                      }}
                      required
                    >
                      <SelectTrigger id="travelOption">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="AC">AC</SelectItem>
                        <SelectItem value="Non-AC">Non-AC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      name="rating"
                      value={travelForm.rating === 0 ? "" : travelForm.rating}
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
                    value={travelForm.description}
                    onChange={handleChange}
                    placeholder="Mention AC/Non-AC, No of rooms, bed count, bathroom availability."
                    required
                  />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      type="text"
                      name="ownerName"
                      value={travelVendorDetails.ownerName}
                      onChange={handleChange}
                      placeholder="Enter the owner name"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Owner Contact</Label>
                    <Input
                      id="ownerContact"
                      type="text"
                      name="ownerContact"
                      value={travelVendorDetails.ownerContact}
                      onChange={handleChange}
                      placeholder="Owner contact"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={travelVendorDetails.address}
                    onChange={handleChange}
                    placeholder="Enter the address"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-center w-full border rounded-md">
                Image Upload Area
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelsForm;
