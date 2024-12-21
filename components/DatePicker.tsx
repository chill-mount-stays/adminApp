"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localStringToDateObject } from "@/app/action";

interface DatePickerProps {
  value?: string;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (value) return localStringToDateObject(value);
    return undefined;
  });

  const dateRange = (date: Date): boolean => {
    const onlyTodayDate = new Date();
    onlyTodayDate.setHours(0, 0, 0, 0);
    const onlyDate = new Date(date);
    onlyDate.setHours(0, 0, 0, 0);
    //Disable Past Days
    if (onlyDate < onlyTodayDate) return true;
    return false;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Next Availability</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            if (date) onChange(date);
          }}
          disabled={(date) => dateRange(date)}
        />
      </PopoverContent>
    </Popover>
  );
}
