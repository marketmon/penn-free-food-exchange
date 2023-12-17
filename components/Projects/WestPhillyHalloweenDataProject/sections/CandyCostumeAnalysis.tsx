import { RefObject, useState } from "react";
import { Pie } from "react-chartjs-2";
import CostumeFilters from "@/components/Projects/WestPhillyHalloweenDataProject/CostumeFilters";
import PanboTalk from "@/components/Projects/WestPhillyHalloweenDataProject/PanboTalk";
import {
  getFavoriteFlavorsByCategories,
  getFavoriteFormsOfCandyByCategories,
  getFavoriteTypesOfChocolateByCategories,
} from "@/lib/utils";
import halloweenData from "@/assets/projects/west-philly-halloween-data-project/data.json";

type CandyCostumeAnalysisProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const MESSAGES = [
  "When we filter data, it's like putting on special glasses to spot cool patterns in the data. A pattern is something that stands out in a group. And each candy has its own unique qualities that we can check out along with the groups.",
  "There are hundreds of different ways to mix and match the categories. Can you find any special candy favorites?",
  "Click on a category and enjoy the pie chart dance! Each click filters the data, giving you a chance to uncover exciting patterns!",
];

export default function CandyCostumeAnalysis({
  sectionRef,
}: CandyCostumeAnalysisProps) {
  const [selectedCategories, setSelectedCategories] = useState([
    "action adventure",
  ]);

  const favoriteFlavorsBySelectedCategories = getFavoriteFlavorsByCategories(
    halloweenData,
    selectedCategories
  );
  const favoriteFormsOfCandyBySelectedCategories =
    getFavoriteFormsOfCandyByCategories(halloweenData, selectedCategories);
  const favoriteTypesOfChocolateBySelectedCategories =
    getFavoriteTypesOfChocolateByCategories(halloweenData, selectedCategories);

  const favoriteFlavorsBySelectedCategoriesData = {
    labels: favoriteFlavorsBySelectedCategories.map((item) => item.flavor),
    datasets: [
      {
        data: favoriteFlavorsBySelectedCategories.map((item) => item.count),
        backgroundColor: ["orange", "purple"],
      },
    ],
  };

  const favoriteFormsOfCandyBySelectedCategoriesData = {
    labels: favoriteFormsOfCandyBySelectedCategories.map(
      (item) => item.formOfCandy
    ),
    datasets: [
      {
        data: favoriteFormsOfCandyBySelectedCategories.map(
          (item) => item.count
        ),
        backgroundColor: ["orange", "purple", "limegreen"],
      },
    ],
  };

  const favoriteTypesOfChocolateBySelectedCategoriesData = {
    labels: favoriteTypesOfChocolateBySelectedCategories.map(
      (item) => item.typeOfChocolate
    ),
    datasets: [
      {
        data: favoriteTypesOfChocolateBySelectedCategories.map(
          (item) => item.count
        ),
        backgroundColor: ["orange", "purple", "limegreen", "black"],
      },
    ],
  };

  return (
    <div
      ref={sectionRef}
      className="h-full flex flex-col justify-center items-center space-y-4 snap-always snap-center"
    >
      <div className="text-2xl tablet:text-3xl text-green-400 text-center font-bold mb-2">
        Exploring Each Costume&apos;s Preference
      </div>
      <div className="flex flex-col justify-center items-center h-1/2 w-full text-center space-y-2">
        <CostumeFilters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        {selectedCategories.length > 0 ? (
          <div className="flex w-full space-x-8 self-start laptop:w-[1024px] laptop:self-center px-8 overflow-x-scroll tablet-lg:overflow-x-hidden">
            <div className="h-[200px] w-[200px] laptop:h-[350px] w-[350px]">
              <Pie data={favoriteFlavorsBySelectedCategoriesData} />
            </div>
            <div className="h-[200px] w-[200px] laptop:h-[350px] w-[350px]">
              <Pie data={favoriteFormsOfCandyBySelectedCategoriesData} />
            </div>
            <div className="h-[200px] w-[200px] laptop:h-[350px] w-[350px]">
              <Pie data={favoriteTypesOfChocolateBySelectedCategoriesData} />
            </div>
          </div>
        ) : (
          <div>Select a category to see the charts!</div>
        )}
      </div>
      <PanboTalk messages={MESSAGES} />
    </div>
  );
}
