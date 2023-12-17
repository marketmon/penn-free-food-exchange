type CostumeFiltersProps = {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const CATEGORIES = [
  { id: 1, category: "action adventure", label: "Action/Adventure" },
  { id: 2, category: "sports", label: "Sports" },
  { id: 3, category: "horror", label: "Horror" },
  { id: 4, category: "animal", label: "Animal" },
  { id: 5, category: "history", label: "History" },
  { id: 6, category: "superhero", label: "Superhero" },
  { id: 7, category: "video game", label: "Video Game" },
  { id: 8, category: "food", label: "Food" },
  { id: 9, category: "fantasy", label: "Fantasy" },
  { id: 10, category: "princess", label: "Princess" },
  { id: 11, category: "cartoon character", label: "Cartoon Character" },
  { id: 12, category: "job", label: "Job" },
  { id: 13, category: "anime", label: "Anime" },
  { id: 14, category: "bug", label: "Bug" },
  { id: 15, category: "other", label: "Other" },
];

export default function CostumeFilters({
  selectedCategories,
  setSelectedCategories,
}: CostumeFiltersProps) {
  function getClassName(category?: string) {
    const shouldButtonBeSelected =
      (category && selectedCategories.includes(category)) ||
      (!category && selectedCategories.length === CATEGORIES.length);
    return `m-1 w-[200px] text-xs border-2 border-amber-600 rounded-sm cursor-pointer hover:bg-amber-600 hover:text-white px-2 py-1 ${
      shouldButtonBeSelected && "bg-amber-600 text-white"
    }`;
  }

  function selectCategory(category?: string) {
    if (category) {
      if (selectedCategories.includes(category)) {
        setSelectedCategories(
          selectedCategories.filter((item) => item !== category)
        );
      } else {
        setSelectedCategories([...selectedCategories, category]);
      }
    } else {
      setSelectedCategories(
        selectedCategories.length === CATEGORIES.length
          ? []
          : CATEGORIES.map((item) => item.category)
      );
    }
  }

  return (
    <div className="flex w-full space-x-3 px-8 overflow-x-scroll">
      <div className={getClassName()} onClick={() => selectCategory()}>
        <div className="flex justify-center items-center w-[100px] h-[30px]">
          Select All
        </div>
      </div>
      {CATEGORIES.map((category) => (
        <div
          key={category.id}
          className={getClassName(category.category)}
          onClick={() => selectCategory(category.category)}
        >
          <div className="flex justify-center items-center w-[100px] h-[30px]">
            {category.label}
          </div>
        </div>
      ))}
    </div>
  );
}
