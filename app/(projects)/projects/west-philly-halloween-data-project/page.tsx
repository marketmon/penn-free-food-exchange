"use client";

import { useRef } from "react";
import SectionContainer from "@/components/common/SectionContainer";
import Intro from "@/components/Projects/WestPhillyHalloweenDataProject/sections/Intro";
import CandyAnalysis from "@/components/Projects/WestPhillyHalloweenDataProject/sections/CandyAnalysis";
import CandyAnalysisContinued from "@/components/Projects/WestPhillyHalloweenDataProject/sections/CandyAnalysisContinued";
import CostumeAnalysis from "@/components/Projects/WestPhillyHalloweenDataProject/sections/CostumeAnalysis";
import CandyCostumeAnalysis from "@/components/Projects/WestPhillyHalloweenDataProject/sections/CandyCostumeAnalysis";
import Conclusion from "@/components/Projects/WestPhillyHalloweenDataProject/sections/Conclusion";
import DataMap from "@/components/Projects/WestPhillyHalloweenDataProject/sections/DataMap";

export default function Page() {
  return (
    <SectionContainer
      sections={[
        { component: Intro, ref: useRef<HTMLDivElement>(null) },
        { component: DataMap, ref: useRef<HTMLDivElement>(null) },
        { component: CandyAnalysis, ref: useRef<HTMLDivElement>(null) },
        {
          component: CandyAnalysisContinued,
          ref: useRef<HTMLDivElement>(null),
        },
        { component: CostumeAnalysis, ref: useRef<HTMLDivElement>(null) },
        { component: CandyCostumeAnalysis, ref: useRef<HTMLDivElement>(null) },
        { component: Conclusion, ref: useRef<HTMLDivElement>(null) },
      ]}
    />
  );
}
