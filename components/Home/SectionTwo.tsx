import Image from "next/image";
import { MutableRefObject } from "react";
import { Users, Expand, SmilePlus } from "lucide-react";

const GOALS = [
  {
    id: 1,
    goal: "EMPOWER",
    description: "communites with cooperative data ownership",
    icon: <Users />,
  },
  {
    id: 2,
    goal: "EXPAND",
    description: "data accessibility and understanding",
    icon: <Expand />,
  },
  {
    id: 3,
    goal: "RETURN",
    description: "value back to communities",
    icon: <SmilePlus />,
  },
];

type SectionTwoProps = {
  sectionRef: MutableRefObject<any>;
};

export default function SectionTwo({ sectionRef }: SectionTwoProps) {
  return (
    <div
      className="h-full flex flex-col justify-center px-2 snap-always snap-center tablet:flex-row tablet:items-center tablet:space-x-20 tablet:pt-0 tablet:px-0"
      ref={sectionRef}
    >
      <h1 className="tablet:pl-8 text-center">
        <div className="text-lg font-medium tablet:text-2xl laptop:text-4xl">
          Inspired by the Native Americans who use
        </div>
        <div className="text-3xl font-bold tablet:text-4xl laptop:text-6xl">
          all <span className="text-green-400">PAN</span> of the bison{" "}
          <span className="text-green-400">BO</span>
        </div>
      </h1>

      <div className="tablet:pr-8 tablet:flex tablet:flex-col tablet:space-y-8">
        <Image
          src="/panbo-1.png"
          width={610}
          height={370}
          priority
          alt="Picture of the author"
          className="my-2 hidden hide-image-mobile:hidden show-image-mobile:block hide-image-tablet:hidden show-image-tablet:block hide-image-laptop:hidden show-image-laptop:block"
        />
        <ul className="space-y-4 tablet:space-y-8">
          {GOALS.map((goal) => (
            <li key={goal.id}>
              <div className="inline-flex items-center">
                {goal.icon}
                <div className="text-lg font-bold ml-2 tablet:text-2xl laptop:text-3xl">
                  {goal.goal}
                </div>
              </div>
              <div className="text-base tablet:text-xl laptop:text-2xl">
                {goal.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
