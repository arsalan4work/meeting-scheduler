'use client'

import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import LocationOption from "../../../_utils/LocationOption"
import ThemeOptions from "../../../_utils/ThemeOptions"
import Image from "next/image";
import Link from "next/link";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../../../../config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function MeetingForm({setFormValue}) {
    const [location,setLocation]=useState();
    const [themeColor, setThemeColor] = useState();
    const [eventName, setEventName] = useState();
    const [duration, setDuration] = useState(30);
    const [locationType, setLocationType] = useState();
    const [locationUrl, setlocationUrl] = useState();
    const {user} = useKindeBrowserClient() ;
    const db = getFirestore(app)
    const router=useRouter()

    useEffect(()=>{
      setFormValue({
        eventName:eventName,
        duration:duration,
        locationType:locationType,
        locationUrl:locationUrl,
        themeColor:themeColor
      })
    }, [eventName, duration, locationType, locationUrl, themeColor]);

    const onCreateClick=async()=>{
      const id = Date.now().toString();
      await setDoc(doc(db, "MeetingEvent", id), {
        id:id,
        eventName:eventName,
        duration:duration,
        locationType:locationType,
        locationUrl:locationUrl,
        themeColor:themeColor,
        businessId:doc(db, "Business", user?.email),
        createdBy:user?.email
      }).then(resp=>{
        toast.success("New Meeting Created Successfully!")
        router.push('/dashboard/meeting-type')
      })
    };

  return (
    <div className="p-8">
      <Link href={"/dashboard"} className="text-gray-500 hover:text-gray-700">
        <h2 className="flex gap-2">
            <ChevronLeft /> Cancel
        </h2>
      </Link>
      {/* Form */}
      <div className="mt-4">
        {/* Heading */}
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      {/* Form Details */}
      <div className="flex flex-col gap-3 my-4 items-start">
        {/* Meeting Name Input */}
        <h2 className="font-bold">Event Name*</h2>
        <Input placeholder="Name of your meeting event" onChange={(event)=>setEventName(event.target.value)}/>
        <h2>Duration*</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} className={"max-w-40"}>
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={" flex flex-col items-center"}>
            <DropdownMenuItem onClick={()=>setDuration(15)}>15 min</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>setDuration(30)}>30 min</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>setDuration(45)}>45 min</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>setDuration(60)}>60 min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location*</h2>
        <div className="grid grid-cols-4 gap-4 w-full">
            {LocationOption.map((option, index) =>(
                <div key={index} className={`border flex flex-col 
                justify-center items-center p-3 rounded-lg
                hover:bg-blue-100 cursor-pointer hover:border-blue-500
                ${locationType==option.name&&'bg-blue-100 border-blue-500'}`}
                onClick={()=> setLocationType(option.name)}
                >
                    <Image
                    src={option.icon}
                    alt="Image Not Found!"
                    width={30}
                    height={30}
                    />
                    <h2>{option.name}</h2>
                </div>
            ))}
        </div>

        {/* URL */}
        {locationType&&<>
        <h2 className="font-bold">Add {location} URL *</h2>
        <Input 
        placeholder="Add URL Here..." 
        onChange={(e)=>setlocationUrl(e.target.value)}
        />
        </>}

        {/* Colors */}
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-between gap-8">
            {ThemeOptions.map((color, index)=> (
                <div key={index} className={`h-8 w-8 rounded-full ${themeColor==color&&"border-3 border-black"}`}
                style={{backgroundColor:color}}
                onClick={()=>setThemeColor(color)}
                ></div>
            ))}
        </div>
      </div>

      <Button className={"w-full mt-8 bg-blue-500"}
      disabled={(!eventName || !duration || !locationType || !locationUrl)}
      onClick={()=>onCreateClick()}
      >Create</Button>
    </div>
  );
}
