import Image from "@/components/common/Image";
import PanboTalk from "@/components/Projects/WestPhillyHalloweenDataProject/PanboTalk";
import { RefObject } from "react";

type IntroProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const MESSAGES = [
  "Hey, I'm Panbo, your trusty navigator for this data adventure! My mission? To make data fun and help you discover its incredible superpowers.",
  "Before we set sail, let's get our facts straight: On October 31, 2023, our team consisted of 3 Penn student data detectives. Together, we collected a total of 266 responses from kids, all with parent/guardian permission.",
  "Now that we've got the details sorted, we're all set to embark on this exciting journey! Let's go! Scroll down to continue.",
];

export default function Intro({ sectionRef }: IntroProps) {
  return (
    <div
      ref={sectionRef}
      className="h-full relative flex flex-col justify-center items-center bg-amber-600 snap-always snap-center z-0 space-y-4 tablet:space-y-2 laptop:space-y-0"
    >
      <div className="h-1/2 w-full bg-violet-900 absolute top-0" />
      <div className="w-[200px] h-[200px] tablet-lg:w-[250px] tablet-lg:h-[250px] laptop:w-[300px] laptop:h-[300px] z-50">
        <Image src={"/west_philly_variety_pack.png"} priority={true} />
      </div>

      <PanboTalk messages={MESSAGES} />
    </div>
  );
}
