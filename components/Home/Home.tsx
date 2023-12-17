"use client";

import { useRef } from "react";
import AllMeadows from "@/components/Home/Sections/AllMeadows";
import Goals from "@/components/Home/Sections/Goals";
import Steps from "@/components/Home/Sections/Steps";
import Projects from "@/components/Home/Sections/Projects";
import Contact from "@/components/Home/Sections/Contact";
import SectionContainer from "@/components/common/SectionContainer";

export default function Home() {
  return (
    <SectionContainer
      sections={[
        { component: AllMeadows, ref: useRef<HTMLDivElement>(null) },
        { component: Goals, ref: useRef<HTMLDivElement>(null) },
        { component: Steps, ref: useRef<HTMLDivElement>(null) },
        { component: Projects, ref: useRef<HTMLDivElement>(null) },
        { component: Contact, ref: useRef<HTMLDivElement>(null) },
      ]}
    />
  );
}
