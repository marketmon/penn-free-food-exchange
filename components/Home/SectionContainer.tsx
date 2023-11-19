"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getListOfMeadows } from "@/lib/queryFns";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import SectionOne from "@/components/Home/SectionOne";
import SectionTwo from "@/components/Home/SectionTwo";
import SectionFour from "@/components/Home/SectionFour";
import SectionThree from "@/components/Home/SectionThree";

export default function SectionContainer() {
  const { data } = useQuery({
    queryKey: ["meadows"],
    queryFn: () => getListOfMeadows(),
    staleTime: Infinity,
  });

  const section1 = useRef<HTMLDivElement>();
  const section2 = useRef<HTMLDivElement>();
  const section3 = useRef<HTMLDivElement>();
  const section4 = useRef<HTMLDivElement>();

  const [nextSection, setNextSection] = useState<MutableRefObject<
    HTMLDivElement | undefined
  > | null>(section1);

  function onSectionScroll(
    section: MutableRefObject<HTMLDivElement | undefined>
  ) {
    section.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const sections = [section1, section2, section3, section4];
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
      <SectionOne data={data} sectionRef={section1} />
      <SectionTwo sectionRef={section2} />
      <SectionThree sectionRef={section3} />
      <SectionFour sectionRef={section4} />
      {nextSection && (
        <ChevronDown
          className="absolute bottom-0 left-0 right-0 m-auto cursor-pointer w-[35px] h-[35px] z-20 bg-no-repeat"
          onClick={() => onSectionScroll(nextSection)}
        />
      )}
    </div>
  );
}
