import React from "react";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";

const Navbar = () => {
  return (
    <div className="lg:h-[calc(100%-theme(space.24))] border rounded-md bg-white lg:w-72 lg:p-8 lg:space-y-6 flex lg:flex-col flex-row justify-between items-center lg:justify-start lg:items-start p-3 w-full">
      <div className="">
        <Logo showText />
      </div>
      <div className="lg:w-full">
        <Navigation />
      </div>
    </div>
  );
};

export default Navbar;
