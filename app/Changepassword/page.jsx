"use client"
import React from "react";
import Changepassword from "../ui/Changepassword/Changepassword";
import Image from "next/image";
import Chiclogo from "@/assets/assets/images/sigin/chiclogo.png";

const page = () => {
  return (
    <div className="flex flex-col xl:flex-row bg-[#F7FAFB] h-screen">
      <div className="basis-2/3 hidden xl:block">
        <Image src={Chiclogo} alt="logo" className="absolute w-[80px] h-[auto] top-5 left-5"/>
      </div>
      <div className="my-[auto] xl:mt-[auto] basis-1/1 xl:basis-1/3 flex flex-col content-center justify-center items-center">
        <Changepassword />
      </div>
    </div>
  );
};

export default page;
