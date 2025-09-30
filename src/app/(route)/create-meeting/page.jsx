'use client'
import React, { useState } from "react";
import MeetingForm from "./_components/MeetingForm";
import PreviewMeetingPage from "./_components/PreviewMeeting";

export default function CreateMeetingPage() {
  const [formValue, setFormValue] = useState();
  return (
    <div className="flex flex-col justify-between md:grid md:grid-cols-3">
      {/* Meeting Form */}
      <div className="shadow-md border h-screen">
        <MeetingForm setFormValue={(v)=>setFormValue(v)} />
      </div>

      {/* Preview */}
      <div className="md:col-span-2">
        <PreviewMeetingPage formValue={formValue}/>
      </div>
    </div>
  );
}
