import { RefObject } from "react";
import ButtonAnchor from "@/components/common/Button/ButtonAnchor";
import PanboTalk from "@/components/Projects/WestPhillyHalloweenDataProject/PanboTalk";

type ConclusionProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const MESSAGES = [
  "Well, that's a wrap on our adventure! Thanks for coming along! Our insights are truly amazing and can unlock a world of knowledge.",
  "Data is like a superpower – if you know how to wield it. This is just the beginning of our grand journey, so stay tuned for more exciting projects. Who knows you might even be able to buy this variety pack in local stores???",
  "If you enjoyed this project, consider leaving your email at the button below. We'll keep you in the loop about all the awesomeness in the works!",
];

export default function Conclusion({ sectionRef }: ConclusionProps) {
  return (
    <div
      ref={sectionRef}
      className="h-full relative flex flex-col justify-center items-center bg-amber-600 snap-always snap-center z-0 space-y-16"
    >
      <div className="h-1/2 w-full bg-violet-900 absolute top-0" />
      <PanboTalk messages={MESSAGES} />
      <div className="flex flex-col items-center text-white z-50 space-y-2">
        <div>powered by powered by Panbo 2023</div>
        <ButtonAnchor
          variant="default"
          btnText="Sign up for updates"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdJdUgQCTBQTm1R16LKvLuS5_Z8g-_KYxdhiRhi3QkvahDDjA/viewform"
        />
      </div>
    </div>
  );
}
