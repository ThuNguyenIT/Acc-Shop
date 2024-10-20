"use client";
import React, { useEffect, useState } from "react";
import { Genders, useHomeStore } from "@/lib";

interface ITitleListSection {
  title: string;
}
export const TitleListSection: React.FC<ITitleListSection> = ({ title }) => {
  const { targetGender } = useHomeStore();
  const [color, setColor] = useState("");

  useEffect(() => {
    // Cập nhật className sau khi component đã mount trên client
    setColor(
      `${targetGender === Genders.MALE ? "male-blue" : "female-purple"}`
    );
  }, [targetGender]);
  return (
    <div className='mb-5 flex items-center justify-between'>
      <h2 className={`text-size-20 font-normal text-${color}`}>{title}</h2>
    </div>
  );
};
