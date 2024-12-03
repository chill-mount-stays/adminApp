"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faHotel,
  faCar,
  faUtensils,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
export const Navlinks = () => {
  const pathname = usePathname();
  // TODO: Move navLinks to DB
  const navLinks = [
    { text: "Dashboard", url: "/", icon: faTable },
    { text: "Stays", url: "/stays", icon: faHotel },
    { text: "Travels", url: "/travel", icon: faCar },
    { text: "Foods", url: "/foods", icon: faUtensils },
    { text: "Contact Us", url: "/contact-us", icon: faEnvelope },
  ];
  return (
    <div className="flex gap-5 lg:gap-4 flex-col">
      {navLinks.map((link, idx) => (
        <Link
          key={"link__" + idx}
          className={`text-xs lg:text-sm md:text-sm pl-4 py-2 rounded-full hover:border hover:bg-zinc-100  font-medium ${
            pathname === link.url
              ? "text-white bg-zinc-800 hover:bg-zinc-600"
              : "text-black"
          }`}
          href={link.url}
        >
          <FontAwesomeIcon icon={link.icon} size="sm" />
          <span className="ml-4">{link.text}</span>
        </Link>
      ))}
    </div>
  );
};
