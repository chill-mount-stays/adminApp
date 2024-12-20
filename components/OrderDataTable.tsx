"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import CustomerOrderDisplay from "./CustomerOrderDisplay";
import { OrderData } from "../lib/types";

interface OrdersTableWithPopupProps {
  orders: OrderData[];
}

export const OrdersTableWithPopup: React.FC<OrdersTableWithPopupProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  const handleRowClick = (order: OrderData) => {
    setSelectedOrder(order);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S No.:</TableHead>
            <TableHead>Customer Phone</TableHead>
            <TableHead>Time & date</TableHead>
            <TableHead>Stay</TableHead>
            <TableHead>Travel</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{order.customerInfo.phone}</TableCell>
              <TableCell>{order.bookingDate}</TableCell>
              <TableCell>{order.stayItem && order.stayItem.length ? <Check className="text-green-500" aria-label="Stay included" /> : <Minus className="text-gray-300" aria-label="Stay not included" />}</TableCell>
              <TableCell>{order.travelItem && order.travelItem.length ? <Check className="text-green-500" aria-label="Travel included" /> : <Minus className="text-gray-300" aria-label="Travel not included" />}</TableCell>
              <TableCell>{order.foodItems && order.foodItems.length > 0 ? <Check className="text-green-500" aria-label="Food included" /> : <Minus className="text-gray-300" aria-label="Food not included" />}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handleRowClick(order)}>
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogTitle className="hidden">data</DialogTitle>
                    {selectedOrder && <CustomerOrderDisplay order={selectedOrder} />}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
