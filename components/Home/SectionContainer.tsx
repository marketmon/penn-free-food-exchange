"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
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

  const allMeadows = useRef<HTMLDivElement>();
  const goals = useRef<HTMLDivElement>();
  const steps = useRef<HTMLDivElement>();
  const contact = useRef<HTMLDivElement>();

  const [nextSection, setNextSection] = useState<MutableRefObject<
    HTMLDivElement | undefined
  > | null>(allMeadows);

  function onSectionScroll(
    section: MutableRefObject<HTMLDivElement | undefined>
  ) {
    section.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const sections = [allMeadows, goals, steps, contact];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // frind the index of the current section in view
          const currentIndex = sections.findIndex(
            (sectionRef) => sectionRef.current === entry.target
          );

          // set nextSection to the ref of the next section, or null if it's the last section
          if (currentIndex < sections.length - 1) {
            setNextSection(sections[currentIndex + 1]);
          } else {
            setNextSection(null);
          }
        }
      });
    }, observerOptions);

    sections.forEach((sectionRef) => {
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
      <AllMeadows data={data} sectionRef={allMeadows} />
      <Goals sectionRef={goals} />
      <Steps sectionRef={steps} />
      <Contact sectionRef={contact} />
      {nextSection && (
        <ChevronDown
          className="absolute bottom-0 left-0 right-0 m-auto cursor-pointer w-[35px] h-[35px] z-20 bg-no-repeat"
          onClick={() => onSectionScroll(nextSection)}
        />
      )}
    </div>
  );
}
