"use client";

import { RefObject, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type SectionContainerProps = {
  sections: {
    component: React.ComponentType<any>;
    ref: React.RefObject<HTMLDivElement>;
  }[];
};

export default function SectionContainer({ sections }: SectionContainerProps) {
  const [nextSection, setNextSection] =
    useState<RefObject<HTMLDivElement> | null>(sections[1].ref);

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
          // find the index of the current section in view
          const currentIndex = sections.findIndex(
            (section) => section.ref.current === entry.target
          );

          // set nextSection to the ref of the next section, or null if it's the last section
          if (currentIndex < sections.length - 1) {
            setNextSection(sections[currentIndex + 1].ref);
          } else {
            setNextSection(null);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  return (
    <div className="h-full overflow-y-auto overscroll-y-contain overflow-x-hidden snap-y snap-mandatory">
      {sections.map(({ ref, component: Component }, index) => (
        <Component key={index} sectionRef={ref} />
      ))}
      {nextSection && (
        <ChevronDown
          className="absolute bottom-0 left-0 right-0 m-auto cursor-pointer w-[35px] h-[35px] z-20 bg-no-repeat"
          onClick={() => onSectionScroll(nextSection)}
        />
      )}
    </div>
  );
}
