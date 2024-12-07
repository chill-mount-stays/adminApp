import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCar, faHotel } from "@fortawesome/free-solid-svg-icons";
import StaysForm from "./StaysForm";
import TravelsForm from "./TravelsForm";
import FoodForm from "./FoodForm";
const SwitchTabs = () => {
  const tabs = [
    { name: "Stays", value: "stays", icon: faHotel, counts: 100 },
    { name: "Travels", value: "travels", icon: faCar, counts: 100 },
    { name: "Foods", value: "foods", icon: faUtensils, counts: 100 },
  ];
  return (
    <div>
      <Tabs defaultValue="stays" className=" w-full">
        <div className="block w-full border  bg-white lg:space-y-4 space-y-2 rounded-md">
          <p className="lg:text-lg font-medium lg:pt-4 lg:pl-4 pt-2 pl-2 text-sm">
            Vendor Type
          </p>
          <hr />
          <TabsList className="lg:space-x-6 space-x-2 lg:px-6 lg:pb-6 lg:pt-2 pt-1 pb-3 px-3">
            {tabs.map((tab, idx) => (
              <TabsTrigger
                value={tab.value}
                key={idx}
                className="p-3 border flex flex-col items-start lg:w-48 w-24"
              >
                <div className="lg:py-2 lg:px-3 py-1 px-1.5 rounded-md border">
                  <FontAwesomeIcon icon={tab.icon} />
                </div>
                <p className="font-medium lg:text-sm lg:mt-6 mt-2 text-xs">
                  {tab.name}
                </p>
                <p className="lg:text-xs text-[10px] text-muted-foreground lg:mt-0.5">
                  {tab.counts} items
                </p>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="stays">
          <StaysForm />
        </TabsContent>
        <TabsContent value="travels">
          <TravelsForm />
        </TabsContent>
        <TabsContent value="foods">
          <FoodForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwitchTabs;
