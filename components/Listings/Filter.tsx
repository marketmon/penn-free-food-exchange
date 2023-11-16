import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter as FilterLucideReact } from "lucide-react";

type FilterProps = {
  setCurrFilter: React.Dispatch<React.SetStateAction<string>>;
};

export default function Filter({ setCurrFilter }: FilterProps) {
  return (
    <div className="mb-2">
      <Select
        onValueChange={(value) => {
          setCurrFilter(value);
        }}
      >
        <SelectTrigger className="w-[45px] tablet:w-[170px] lg:w-[45px] desktop:w-[170px]">
          <FilterLucideReact className="tablet:hidden lg:block desktop:hidden" />
          <div className="hidden tablet:block lg:hidden desktop:block">
            <SelectValue placeholder="Filter by" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="old">Old</SelectItem>
            <SelectItem value="still-there">Still there</SelectItem>
            <SelectItem value="most-thanked">Most thanked</SelectItem>
            <SelectItem value="least-thanked">Least thanked</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
