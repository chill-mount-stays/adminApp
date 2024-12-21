"use client";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Minus } from "lucide-react";
import CustomerOrderDisplay from "./CustomerOrderDisplay";
import { OrderData } from "../lib/types";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getOrderDetails } from "@/app/action";

interface OrdersTableWithPopupProps {
  orders: OrderData[];
}

export const OrdersTableWithPopup = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  // const orderDetails: any = await getOrderDetails();

  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this value as needed
  const [refresh, setRefresh] = useState(false);

  const handleRowClick = (order: OrderData) => {
    setSelectedOrder(order);
  };

  const closeDialog = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    console.log("~~>", orders);
  }, [orders]);

  useEffect(() => {
    getOrderDetails(setOrders);
  }, [refresh]);
  // Calculate total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Get current orders
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-4 min-h-[500px] flex flex-col justify-between">
      <Button
        onClick={() => {
          setRefresh((prev) => !prev);
        }}
      >
        Refresh
      </Button>
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
            {currentOrders.map((order, idx) => (
              <TableRow key={idx} className={order.isNew ? "" : "line-through"}>
                <TableCell>{indexOfFirstOrder + idx + 1}</TableCell>
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
                      {selectedOrder && <CustomerOrderDisplay order={selectedOrder} setRefresh={setRefresh} />}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => paginate(Math.max(1, currentPage - 1))} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => paginate(index + 1)} isActive={currentPage === index + 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => paginate(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
