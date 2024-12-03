import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Navlinks } from "./Navlink";
import { Logo } from "./Logo";

export const Navigation = () => {
  return (
    <>
      <div className="hidden md:block ">
        <div className="mb-6">
          <hr />
        </div>
        <Navlinks />
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="hidden">Navigation</SheetTitle>
              <SheetDescription>
                <Navlinks />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
