import { RefObject } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getFavoriteCandies, getLeastFavoriteCandies } from "@/lib/utils";
import PanboTalk from "@/components/Projects/WestPhillyHalloweenDataProject/PanboTalk";
import halloweenData from "@/assets/projects/west-philly-halloween-data-project/data.json";

type CandyAnalysisProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = (title: string) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: title,
    },
  },
  maintainAspectRatio: false,
});

const top10FavoriteCandies = getFavoriteCandies(halloweenData).slice(0, 10);
const top10LeastFavoriteCandies = getLeastFavoriteCandies(halloweenData).slice(0, 10);

const top10FavoriteCandiesData = {
  labels: top10FavoriteCandies.map((item) => item.name),
  datasets: [
    {
      label: "Number of votes",
      data: top10FavoriteCandies.map((item) => item.count),
      backgroundColor: "rgb(217 119 6)",
    },
  ],
};

const top10LeastFavoriteCandiesData = {
  labels: top10LeastFavoriteCandies.map((item) => item.name),
  datasets: [
    {
      label: "Number of votes",
      data: top10LeastFavoriteCandies.map((item) => item.count),
      backgroundColor: "rgb(76 29 149)",
    },
  ],
};

const MESSAGES = [
  "This is called a bar chart, it's one of the most common types. Each bar here shows how many times a specific label, like different candies, appears in the data.",
  "Skittles are the champion! Followed by lollipops, then Reeses, and then Kit Kats. The competition is fierce after Skittles!",
  "Ever heard of a 'na' bar? Me neither! 'NA' stands for 'not available.' That means 129 kids couldn't decide on their least favorite (yes candy is that good). BUT if we had to pick one, I guess it would have to be candy corn.",
];

export default function CandyAnalysis({ sectionRef }: CandyAnalysisProps) {
  return (
    <div
      ref={sectionRef}
      className="h-full flex flex-col justify-center items-center space-y-4 snap-always snap-center"
    >
      <div className="text-2xl tablet:text-3xl text-green-400 text-center font-bold mb-2">
        What is West Philly&apos;s favorite candy? Least favorite?
      </div>

      <div className="flex w-full space-x-8 self-start laptop:w-[1024px] laptop:self-center px-8 overflow-x-scroll laptop:overflow-x-hidden">
        <div className="h-[300px] w-[464px]">
          <Bar
            options={options(
              "The Top 10 Favorite Candies and their Number of Votes"
            )}
            data={top10FavoriteCandiesData}
          />
        </div>
        <div className="h-[300px] w-[464px]">
          <Bar
            options={options(
              "The Top 10 Least Favorite Candies and their Number of Votes"
            )}
            data={top10LeastFavoriteCandiesData}
          />
        </div>
      </div>

      <PanboTalk messages={MESSAGES} />
    </div>
  );
}
