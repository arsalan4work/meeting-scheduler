"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";

export default function DashboardHeader() {
  const { user } = useKindeBrowserClient();

  return (
    user && (
      <div className="p-4">
        <div >

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center float-right px-5">
              <Image
                src={user?.picture}
                alt="Image Not Found!"
                width={40}
                height={40}
                className="rounded-full"
              />
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  );
}
