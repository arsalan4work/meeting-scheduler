"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../../../../config/FirebaseConfig";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateBusinessPage() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [businessName, setBusinessName] = useState("");
  const router = useRouter();

  const onCreateBusiness = () => {
    if (!user) return;

    setDoc(doc(db, "Business", user.email), {
      businessName,
      email: user.email,
      userName: `${user.given_name} ${user.family_name}`,
    })
      .then(() => {
        console.log("Doc Saved!");
        toast.success("Business Created Successfully!");
        router.push("/dashboard")
      })
      .catch((err) => {
        console.error("Error saving business:", err);
      });
  };

  return (
    <div className="p-14 items-center flex flex-col gap-20 my-10">
      <Image src={"/logo.svg"} width={80} height={80} alt="Image Not Found!" />
      <div className="flex flex-col items-center gap-4 max-w-3xl">
        <h2 className="text-4xl font-bold">
          What should we call your business?
        </h2>
        <p className="text-slate-500">
          You can always change this later from settings.
        </p>
        <div className="w-full flex flex-col">
          <label className="text-slate-400">Team Name: </label>
          <Input
            onChange={(event) => setBusinessName(event.target.value)}
            type="text"
            className="w-full h-8 mt-2"
            placeholder="Example: Team A"
          />
        </div>
        <Button
          variant="default"
          size="lg"
          className="mt-2 w-full"
          disabled={!businessName}
          onClick={onCreateBusiness}
        >
          Create Business
        </Button>
      </div>
    </div>
  );
}
