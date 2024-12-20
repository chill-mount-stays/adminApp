import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderData } from "../lib/types";

const CustomerOrderDisplay: React.FC<{ order?: OrderData }> = ({ order }) => {
  if (!order) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">No Order Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Sorry, there is no order data available to display.</p>
        </CardContent>
      </Card>
    );
  }

  const { customerInfo, stayItem, travelItem, foodItems } = order;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
        <p className="text-sm text-muted-foreground">Phone: {customerInfo.phone}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <section aria-labelledby="stay-info">
          <h2 id="stay-info" className="text-xl font-semibold mb-2">
            Stay Information
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Check-in</p>
              <p className="text-sm text-muted-foreground">{customerInfo.checkIn}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Check-out</p>
              <p className="text-sm text-muted-foreground">{customerInfo.checkOut}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Guests</p>
              <p className="text-sm text-muted-foreground">{customerInfo.guests}</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant="secondary">{stayItem.at(0)?.name}</Badge>
            <span className="ml-2 text-sm font-medium">${stayItem.at(0)?.price}</span>
          </div>
        </section>

        <Separator />

        <section aria-labelledby="travel-info">
          <h2 id="travel-info" className="text-xl font-semibold mb-2">
            Travel Information
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Destination</p>
              <p className="text-sm text-muted-foreground">{customerInfo.destination}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Pick-up</p>
              <p className="text-sm text-muted-foreground">{customerInfo.pickUp}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Drop-off</p>
              <p className="text-sm text-muted-foreground">{customerInfo.dropDown}</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant="secondary">{travelItem.at(0)?.name}</Badge>
            <span className="ml-2 text-sm font-medium">${travelItem.at(0)?.price}</span>
          </div>
        </section>

        <Separator />

        <section aria-labelledby="food-info">
          <h2 id="food-info" className="text-xl font-semibold mb-2">
            Food Information
          </h2>
          <p className="text-sm font-medium mb-2">Food Date: {customerInfo.foodDate}</p>
          <ul className="space-y-2">
            {foodItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div>
                  <Badge variant="secondary">{item.name}</Badge>
                  {item.category === "food" && <span className="ml-2 text-sm text-muted-foreground">x{item.itemCount}</span>}
                </div>
                <span className="text-sm font-medium">${item.price}</span>
              </li>
            ))}
          </ul>
        </section>
      </CardContent>
    </Card>
  );
};

export default CustomerOrderDisplay;