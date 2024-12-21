import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderData } from "../lib/types";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { updateOrderRead } from "@/app/action";

const CustomerOrderDisplay: React.FC<{ order?: OrderData; setRefresh: any }> = ({ order, setRefresh }) => {
  const [isRead, setIsRead] = useState<boolean | undefined>(!order?.isNew);

  // useEffect(() => {
  //   return;
  // }, [isRead]);
  if (!order || (order.foodItems.length === 0 && order.travelItem.length === 0 && order.stayItem.length === 0)) {
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

  const { customerInfo, stayItem, travelItem, foodItems, isNew, orderId } = order;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
        <p className="text-sm text-muted-foreground">Phone: {customerInfo.phone}</p>
        <div className="flex flex-col space-y-1.5 max-w-fit">
          <Label htmlFor="availability">Order Reviewed</Label>
          <Switch
            id="availability"
            name="availability"
            checked={isRead}
            onCheckedChange={(bool) => {
              setRefresh((prev: boolean) => !prev);
              setIsRead(bool);
              updateOrderRead(orderId, bool);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {stayItem.length > 0 && (
          <div className="space-y-6">
            <section aria-labelledby="stay-info">
              <h2 id="stay-info" className="text-xl font-semibold mb-2">
                Stay Information
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Check-in</p>
                  <p className="text-sm text-muted-foreground">{customerInfo.checkIn.split(",").at(0)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Check-out</p>
                  <p className="text-sm text-muted-foreground">{customerInfo.checkOut.split(",").at(0)}</p>
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
          </div>
        )}
        {travelItem.length > 0 && (
          <div className="space-y-6">
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
                  <p className="text-sm text-muted-foreground">{customerInfo.pickUp.split(",").at(0)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Drop-off</p>
                  <p className="text-sm text-muted-foreground">{customerInfo.dropDown.split(",").at(0)}</p>
                </div>
              </div>
              <div className="mt-2">
                <Badge variant="secondary">{travelItem.at(0)?.name}</Badge>
                <span className="ml-2 text-sm font-medium">${travelItem.at(0)?.price}</span>
              </div>
            </section>
          </div>
        )}

        {foodItems.length > 0 && (
          <div className="space-y-6">
            <Separator />
            <section aria-labelledby="food-info">
              <h2 id="food-info" className="text-xl font-semibold mb-2">
                Food Information
              </h2>
              <p className="text-sm font-medium mb-2">Food Date: {customerInfo.foodDate.split(",").at(0)}</p>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerOrderDisplay;
