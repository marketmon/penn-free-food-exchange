"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { getListOfMeadows } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import AllMeadows from "@/components/Home/Sections/AllMeadows";
import Goals from "@/components/Home/Sections/Goals";
import Steps from "@/components/Home/Sections/Steps";
import Contact from "@/components/Home/Sections/Contact";

export default function SectionContainer() {
  const { data } = useQuery({
    queryKey: ["meadows"],
    queryFn: () => getListOfMeadows(),
    staleTime: Infinity,
  });

  const sections = {
    allMeadows: useRef<HTMLDivElement>(null),
    goals: useRef<HTMLDivElement>(null),
    steps: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const [nextSection, setNextSection] =
    useState<RefObject<HTMLDivElement> | null>(sections.goals);

  function onSectionScroll(section: RefObject<HTMLDivElement>) {
    section.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionEntries = Object.entries(sections);

          // find the index of the current section in view
          const currentIndex = sectionEntries.findIndex(
            ([_, sectionRef]) => sectionRef.current === entry.target
          );

          // set nextSection to the ref of the next section, or null if it's the last section
          if (currentIndex < sectionEntries.length - 1) {
            setNextSection(sectionEntries[currentIndex + 1][1]);
          } else {
            setNextSection(null);
          }
        }
      });
    }, observerOptions);

    Object.values(sections).forEach((sectionRef) => {
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto overscroll-y-contain snap-y snap-mandatory">
      <AllMeadows data={data} sectionRef={sections.allMeadows} />
      <Goals sectionRef={sections.goals} />
      <Steps sectionRef={sections.steps} />
      <Contact sectionRef={sections.contact} />
      {nextSection && (
        <ChevronDown
          className="absolute bottom-0 left-0 right-0 m-auto cursor-pointer w-[35px] h-[35px] z-20 bg-no-repeat"
          onClick={() => onSectionScroll(nextSection)}
        />
      )}
    </div>
  );
}
