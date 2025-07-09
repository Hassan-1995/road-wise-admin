"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiTruck,
  FiMap,
  FiUsers,
  FiBookOpen,
  FiBarChart2,
  FiTool,
  FiSettings,
  FiX,
  FiSidebar,
} from "react-icons/fi";

const NavSideBar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const pathName = usePathname();
  const links = [
    {
      href: "/",
      label: "Dashboard",
      icon: <FiHome />,
    },
    {
      href: "/vehicles",
      label: "Vehicles",
      icon: <FiTruck />,
    },
    {
      href: "/live-tracking",
      label: "Live Tracking",
      icon: <FiMap />,
    },
    {
      href: "/driver-management",
      label: "Driver Management",
      icon: <FiUsers />,
    },
    {
      href: "/logs",
      label: "Trips & Delivery Logs",
      icon: <FiBookOpen />,
    },
    {
      href: "/analytics",
      label: "Fuel & Cost Analytics",
      icon: <FiBarChart2 />,
    },
    {
      href: "/maintenance",
      label: "Vehicle Maintenance",
      icon: <FiTool />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <FiSettings />,
    },
  ];
  console.log(pathName);
  return (
    <>
      <div
        className={`h-screen w-full md:w-2/3 lg:w-1/3 bg-white border-r border-gray-200 flex flex-col fixed z-[1100]
        transform transition-transform duration-700 
        ${open ? "-translate-x-[85%]" : "translate-x-0"}`}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="px-6 py-4 text-2xl font-bold text-blue-900 flex items-center justify-between"
        >
          <>
            <Image
              src={"/roadWise.png"}
              alt="logo"
              width={100}
              height={100}
              className="boder-2 border-blue-950"
            />
            {/* Road Wise */}
          </>
          {open ? <FiSidebar /> : <FiX />}
        </button>

        <nav className="flex-1 px-4 space-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} passHref>
              <div
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer hover:text-indigo-500 transition
          ${
            pathName === link.href
              ? "text-blue-600 font-semibold"
              : "text-gray-700"
          }
          ${open ? "justify-end py-3" : "space-x-3"}
        `}
              >
                <span className="text-lg">{link.icon}</span>
                {!open && <span>{link.label}</span>}
              </div>
            </Link>
          ))}
        </nav>
        <div className="px-4 py-4 text-sm text-gray-400 mt-auto">
          © {new Date().getFullYear()} InkSpire
        </div>
      </div>

      {!open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-gray-500/50  z-[1050] transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default NavSideBar;
