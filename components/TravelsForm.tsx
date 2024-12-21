"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DBImageFile, TravelVendor, TravelVendorDetails } from "@/type";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { addFormData, generateDocRef } from "@/app/action";
import { DocumentReference } from "firebase/firestore";
import { ImageUpload } from "./ImageUpload";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { DatePicker } from "./DatePicker";
const TravelsForm = ({ formData, vendorDetailsData }: any) => {
  const router = useRouter();
  const { toast } = useToast();
  const [docRef, setDocRef] = useState<DocumentReference>(
    generateDocRef("Travels")
  );
  const InitialTravelForm: TravelVendor = {
    vendorId: "",
    name: "",
    travelOption: "Non-AC",
    costPerDay: 0,
    availability: false,
    nextAvailability: "",
    imgUrls: [],
    description: "",
    rating: 0,
  };
  const [travelForm, setTravelForm] = useState<TravelVendor>(
    formData ?? InitialTravelForm
  );

  const InitialTravelDetails: TravelVendorDetails = {
    vendorId: travelForm.vendorId,
    ownerName: "",
    ownerContact: "",
    address: "",
  };

  const [travelVendorDetails, setTravelVendorDetails] =
    useState<TravelVendorDetails>(vendorDetailsData ?? InitialTravelDetails);

  const [images, setImages] = useState<DBImageFile[]>(formData?.imgUrls ?? []);

  const [disableDeploy, setDisableDeploy] = useState(false);
  const [resetForm, setResetForm] = useState<number>(0);

  useEffect(() => {
    setTravelForm((prev) => ({
      ...prev,
      imgUrls: [...images],
    }));
    console.log(images);
  }, [images]);

  const handleChnageVendorDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTravelVendorDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTravelForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(travelForm);
    console.log(travelVendorDetails);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableDeploy(true);
    const submitData = await addFormData(
      docRef,
      travelForm,
      travelVendorDetails,
      "Travels"
    );
    setDisableDeploy(false);
    if (!submitData) {
      setResetForm(2);
      setDocRef(generateDocRef("Travels"));
      setTravelForm(InitialTravelForm);
      setTravelVendorDetails(InitialTravelDetails);
      toast({
        title: "Successfully done",
      });
      router.push("/travels");
    } else {
      toast({
        variant: "destructive",
        title: "Some error occured, please retry",
      });
    }

    console.log(travelForm);
    console.log(travelVendorDetails);
  };

  const handleFormReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    setResetForm(1);
    setDocRef(generateDocRef("Travels"));
    setTravelForm({ ...InitialTravelForm });
    setTravelVendorDetails(InitialTravelDetails);
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Travel Vendor</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={(e) => handleFormSubmit(e)}>
            <div className="flex lg:flex-row gap-8 items-start">
              <div className="grid items-center gap-4 lg:w-[640px]">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Vehicle Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={travelForm.name}
                    onChange={handleChange}
                    placeholder="Name of your vehicle"
                    required
                  />
                </div>
                <div className="flex items-top justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="costPerDay">Cost Per Day *</Label>
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
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="nextAvailability">Next Availability</Label>
                  <DatePicker
                    value={travelForm.nextAvailability}
                    onChange={(date) =>
                      setTravelForm((prev) => {
                        return {
                          ...prev,
                          nextAvailability: date.toLocaleString("en-IN"),
                        };
                      })
                    }
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
                    placeholder="Mention vehicle special features."
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
                      onChange={handleChnageVendorDetails}
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
                      onChange={handleChnageVendorDetails}
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
                    onChange={handleChnageVendorDetails}
                    placeholder="Enter the address"
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <ImageUpload
                  initialImages={images}
                  setDisableDeploy={setDisableDeploy}
                  setFormImages={setImages}
                  resetForm={resetForm}
                  setResetForm={setResetForm}
                  parentCalledFrom="travels"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleFormReset}>
                Cancel
              </Button>
              <Button disabled={disableDeploy} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelsForm;
