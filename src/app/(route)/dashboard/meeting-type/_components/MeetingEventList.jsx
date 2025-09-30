"use client";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { app } from "../../../../../../config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu"

export default function MeetingEventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([])
  const onDeleteMeetingEvent=async(event)=>{
    await deleteDoc(doc(db, "MeetingEvent", event?.id)).then(()=>{
        toast.success('Event Deleted Successfully')
        getEventList();
    })
  }

  useEffect(() => {
    user && getEventList();
  }, [user]);

  const getEventList = async () => {
    setEventList([]) // Clear previous events before fetching new ones
    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email),
      orderBy("id", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
      setEventList(prevEvent=>[...prevEvent, doc.data()])
    });
  };

  return (
    <div className="mt-10 grid grid-col-1 md:grid-col2 lg:grid-col-3 gap-8">
        {eventList.length>0?eventList?.map((event, index)=> (
            <div key={index} className="border shadow-md border-t-8 
            rounded-lg p-5 flex flex-col gap-5"
            style={{borderTopColor: event?.themeColor}}>
                <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Settings className="text-gray-500 cursor-pointer"/>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem className={"flex gap-2"}><Pen/> Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={"flex gap-2"}
                        onClick={()=>onDeleteMeetingEvent(event)}
                        ><Trash/> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h2 className="font-medium text-2xl">{event?.eventName}</h2>
                <div className="flex justify-between">
                    <h2 className="flex gap-2 text-gray-500"><Clock/> {event.duration} Min</h2>
                    <h2 className="flex gap-2 text-gray-500"><MapPin/> {event.locationType}</h2>
                </div>
                <hr />
                <div className="flex justify-between items-center">
                    <h2 className="flex gap-2 text-sm items-center text-blue-500 cursor-pointer"
                    onClick={()=>{
                      navigator.clipboard.writeText(event.locationUrl);
                      toast.message('URL Copied to Clipboard')
                    }}>
                        <Copy className="h-4 w-4"/> Copy Link </h2>
                    <Button variant={"outline"} 
                    className={"border-blue-400 rounded-full text-blue-500"}>Share</Button>
                </div>
            </div>
        )):
        <h2>Loading...</h2>
        }
    </div>
);
}
