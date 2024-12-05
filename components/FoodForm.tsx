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
import { Food, TravelVendor, TravelVendorDetails } from "@/type";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

const FoodForm = () => {
  const InitialFoodForm: Food = {
    foodId: "",
    name: "",
    description: "",
    price: 0,
    imgUrls: [],
    category: "Non-Veg",
    availability: false,
    nextAvailability: "",
    rating: 0,
    tags: [],
  };

  const [foodForm, setFoodForm] = useState<Food>(InitialFoodForm);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFoodForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(foodForm);
  };

  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Food</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-8">
            <div className="flex lg:flex-row gap-8">
              <div className="grid items-center gap-4 lg:w-[640px]">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Food Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={foodForm.name}
                    onChange={handleChange}
                    placeholder="Name of your vendor stay"
                    required
                  />
                </div>
                <div className="flex items-top justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5 w-full">
                    <Label htmlFor="price">Price per quantity*</Label>
                    <Input
                      id="price"
                      type="number"
                      name="price"
                      value={foodForm.price === 0 ? "" : foodForm.price}
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
                      checked={foodForm.availability}
                      onCheckedChange={(bool) => {
                        setFoodForm((prev) => {
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
                    value={foodForm.nextAvailability}
                    onChange={handleChange}
                    placeholder="In hours & mins"
                  />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="travelOption">Food Option</Label>
                    <Select
                      value={foodForm.category}
                      onValueChange={(val: "Veg" | "Non-Veg") => {
                        setFoodForm({ ...foodForm, category: val });
                      }}
                      required
                    >
                      <SelectTrigger id="travelOption">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Veg">AC</SelectItem>
                        <SelectItem value="Non-Veg">Non-AC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="rating">Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      name="rating"
                      value={foodForm.rating === 0 ? "" : foodForm.rating}
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
                    value={foodForm.description}
                    onChange={handleChange}
                    placeholder="Mention Ingredients, Quantity in gm, etc.,"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tags">Tags</Label>
                  <Textarea
                    id="tags"
                    name="tags"
                    value={foodForm.tags}
                    onChange={handleChange}
                    placeholder="Owner contact"
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
              <Button type="submit">Deploy</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodForm;
