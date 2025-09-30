"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavBar() {
  const menu = [
    {
      id: 1,
      name: "Meeting Type",
      path: "/dashboard/meeting-type",
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Scheduled Meeting",
      path: "/dashboard/scheduled-meeting",
      icon: Calendar,
    },
    {
      id: 3,
      name: "Availability",
      path: "/dashboard/availability",
      icon: Clock,
    },
    {
      id: 4,
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const path=usePathname();
  const [activePath, setActivePath] = useState(path);
  useEffect(()=>{
    path&&setActivePath(path);
  },[path])

  return (
    <div className="p-5 py-14">
      <div className="flex justify-center">
        <Image src="/logo.svg" alt="Image Not Found!" width={50} height={50} />
      </div>
      <div>
        <Link href="/create-meeting">
          <Button className="flex gap-2 w-full rounded-full mt-7">
            <Plus />
            Create
          </Button>
        </Link>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        {menu.map((item, index) => (
            <Link href={item.path} key={index}>
                <Button
                    className={`w-full flex gap-2 justify-start 
                        hover:bg-blue-200 duration-300 transition-all cursor-pointer
                        ${activePath==item.path&&"text-blue-900 bg-blue-300"}`}
                    variant="ghost"
                    >
                    <item.icon />
                    {item.name}
                </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
