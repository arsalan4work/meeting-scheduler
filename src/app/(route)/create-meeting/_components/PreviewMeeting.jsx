'use client'

import { Button } from "../../../../components/ui/button";
import { Calendar } from "../../../../components/ui/calendar";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function PreviewMeeting({ formValue = {} }) {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    if (formValue?.duration) createTimeSlot(formValue.duration);
  }, [formValue?.duration]);

  const createTimeSlot = (interval) => {
    const startTime = 8 * 60; // 8 AM
    const endTime = 22 * 60; // 10 PM
    const totalSlots = Math.floor((endTime - startTime) / interval);
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
    });
    setTimeSlots(slots);
  };

  // Normalize href so links work even if user didn't type "https://"
  const normalizedHref = (() => {
    const u = formValue?.locationUrl;
    if (!u) return "#";
    return /^https?:\/\//i.test(u) ? u : `https://${u}`;
  })();

  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8 text-black"
      style={{ borderTopColor: formValue?.themeColor || "#000" }}
    >
      <Image src="/logo.svg" alt="logo" width={50} height={50} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-3xl">{formValue?.eventName || "Meeting Name"}</h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2"><Clock /> {formValue?.duration} Min</h2>
            <h2 className="flex gap-2"><MapPin /> {formValue?.locationType} Meeting</h2>

            {/* Use anchor tag for external link preview; opens in new tab */}
            <Link href={normalizedHref} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-words">
              {formValue?.locationUrl || "No URL provided"}
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 flex px-4">
          <div className="flex flex-col">
            <h2 className="font-bold text-lg">Select Date & Time</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mt-5"
              disabled={(d) => d <= new Date()}
            />
          </div>

          <div className="flex flex-col w-full overflow-auto gap-4 p-5" style={{ maxHeight: "400px" }}>
            {timeSlots?.map((time) => (
              <Button key={time} className="border-blue-400 text-blue-500" variant="outline">
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMeeting;
