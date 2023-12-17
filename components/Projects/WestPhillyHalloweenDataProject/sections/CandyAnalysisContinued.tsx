import { RefObject } from "react";
import { getFavoriteCandies, getLeastFavoriteCandies } from "@/lib/utils";
import PanboTalk from "@/components/Projects/WestPhillyHalloweenDataProject/PanboTalk";
import CandyCountCard from "@/components/Projects/WestPhillyHalloweenDataProject/CandyCountCard";
import halloweenData from "@/assets/projects/west-philly-halloween-data-project/data.json";

type CandyAnalysisContinuedProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const MESSAGES = [
  "We've got a spectacular lineup of 51 favorite candies! It's like a candy wonderland, and there's something for everyone. But, as you'd expect, a few candies steal the limelight as the real superstars.",
  "On the flip side, we had 61 candies voted as the least favorite. Looks like we had to get creative to find the candies that we didn't like.",
  "Take a scroll through the candy universe and discover all the delightful treats!",
];

const favoriteCandies = getFavoriteCandies(halloweenData);
const leastFavoriteCandies = getLeastFavoriteCandies(halloweenData);

export default function CandyAnalysisContinued({
  sectionRef,
}: CandyAnalysisContinuedProps) {
  return (
    <div
      ref={sectionRef}
      className="h-full flex flex-col justify-center items-center space-y-4 snap-always snap-center"
    >
      <div className="text-2xl tablet:text-3xl text-green-400 text-center font-bold mb-2">
        What is West Philly&apos;s favorite candy? Least favorite?
        &#40;Cont.&#41;
      </div>
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col space-y-1">
          <h3 className="self-center px-8 text-center font-bold text-sm tablet:text-base">
            Every Favorite Candy Mentioned and Number of Votes
          </h3>
          <div className="flex space-x-3 px-8 overflow-x-scroll overflow-y-hidden">
            {favoriteCandies.map((candy) => (
              <CandyCountCard
                key={candy.name}
                color="bg-amber-600"
                candy={candy.name as string}
                count={candy.count}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="self-center px-8 text-center font-bold text-sm tablet:text-base">
            Every Least Favorite Candy Mentioned and Number of Votes
          </h3>
          <div className="flex space-x-3 px-8 overflow-x-scroll overflow-y-hidden">
            {leastFavoriteCandies.map((candy) => (
              <CandyCountCard
                key={candy.name}
                color="bg-violet-900"
                candy={candy.name as string}
                count={candy.count}
              />
            ))}
          </div>
        </div>
      </div>
      <PanboTalk messages={MESSAGES} />
    </div>
  );
}
