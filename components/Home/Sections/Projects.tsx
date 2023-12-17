import Image from "@/components/common/Image";
import Link from "next/link";
import { RefObject } from "react";

type ProjectsProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const PROJECTS = [
  {
    id: 1,
    name: "West Philly Halloween Data Project",
    href: "/projects/west-philly-halloween-data-project",
    image: "/west_philly_variety_pack.png",
  },
];

export default function Projects({ sectionRef }: ProjectsProps) {
  return (
    <div
      className="h-full flex flex-col justify-center snap-always snap-center space-y-6 tablet-lg:space-y-0 tablet-lg:flex-row tablet-lg:items-center tablet-lg:space-x-20"
      ref={sectionRef}
    >
      <h1 className="tablet-lg:pl-8 text-center">
        <div className="text-3xl font-bold tablet-lg:text-4xl laptop:text-6xl">
          Discover our <span className="text-green-400">PROJECTS</span>
        </div>
      </h1>

      <div className="tablet-lg:pr-8 tablet-lg:flex tablet-lg:flex-col tablet-lg:space-y-8">
        <ul className="space-y-4 tablet:space-y-8">
          {PROJECTS.map((project) => (
            <li
              key={project.id}
              className="flex flex-col items-center text-center text-xl space-y-2"
            >
              <Link
                href={project.href}
                className="w-[200px] h-[200px] tablet-lg:w-[250px] tablet-lg:h-[250px] laptop:w-[300px] laptop:h-[300px] z-50"
              >
                <Image src={"/west_philly_variety_pack.png"} priority={true} />
              </Link>
              <h2>{project.name}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
