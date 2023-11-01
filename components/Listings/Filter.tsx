import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filter() {
  return (
    <Select>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Filter by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="still-there">Still there</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="old">Old</SelectItem>
          <SelectItem value="most-thanked">Most thanked</SelectItem>
          <SelectItem value="least-thanked">Least thanked</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
