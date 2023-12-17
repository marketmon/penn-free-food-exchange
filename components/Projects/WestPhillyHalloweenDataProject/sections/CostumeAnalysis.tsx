import { RefObject } from "react";
import { getCostumeCategories } from "@/lib/utils";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import PanboTalk from "@/components/Projects/WestPhillyHalloweenDataProject/PanboTalk";
import halloweenData from "@/assets/projects/west-philly-halloween-data-project/data.json";

ChartJS.register(ArcElement, Tooltip, Legend);

type CostumeAnalysisProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const MESSAGES = [
  "Look at this yummy pie chart! Just like apple pie, it's made up of different slices. Each slice shows how often something pops up in the data.",
  "Spooky costumes take the top spot, with superheroes right behind! Otherwise, the spread seems pretty even. West Philly is so creative!",
  "Click or hover over the pie slices to see the numbers in each category. Want a category to vanish? Click its label! It's like data magic in a pie!",
];

const costumeCategories = getCostumeCategories(halloweenData);

const costumeCategoriesData = {
  labels: costumeCategories.map((item) => item.costume),
  datasets: [
    {
      data: costumeCategories.map((item) => item.count),
      backgroundColor: [
        "#FF6B6B",
        "#000000",
        "#FF9900",
        "#654321",
        "#FF1493",
        "#00FF00",
        "#4B0082",
        "#8B4513",
        "#800080",
        "#1E90FF",
        "#FF6347",
        "#9370DB",
        "#696969",
        "#2E8B57",
        "#CD853F",
        "#9932CC",
      ],
    },
  ],
};

export default function CostumeAnalysis({ sectionRef }: CostumeAnalysisProps) {
  return (
    <div
      ref={sectionRef}
      className="h-full flex flex-col justify-center items-center space-y-4 snap-always snap-center"
    >
      <div className="text-2xl tablet:text-3xl text-green-400 text-center font-bold mb-2">
        Wednesday Addams and Spider-Man were the most popular costumes
      </div>
      <div className="flex flex-col justify-center items-center h-1/2 w-full text-center">
        <h3>
          Of the more than 200 unique costumes, we identified 15 distinct
          categories
        </h3>
        <Pie data={costumeCategoriesData} />
      </div>
      <PanboTalk messages={MESSAGES} />
    </div>
  );
}
