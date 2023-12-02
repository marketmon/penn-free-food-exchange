import Image from "next/image";
import { MutableRefObject } from "react";
import { CheckCircle } from "lucide-react";

const STEPS = [
  {
    id: 1,
    step: "Step 1",
    description: "Build avenues to unite community members",
  },
  {
    id: 2,
    step: "Step 2",
    description: "Gather individual insights",
  },
  {
    id: 3,
    step: "Step 3",
    description: "Combine insights and collect the full value",
  },
];

type StepsProps = {
  sectionRef: MutableRefObject<any>;
};

export default function Steps({ sectionRef }: StepsProps) {
  return (
    <div
      className="h-full flex flex-col justify-center px-2 snap-always snap-center tablet:flex-row tablet:items-center tablet:space-x-20 tablet:pt-0 tablet:px-0"
      ref={sectionRef}
    >
      <h1 className="tablet:pl-8 text-center">
        <div className="text-3xl font-bold tablet:text-4xl laptop:text-6xl">
          Deliver <span className="text-green-400">COLLECTIVE</span> benefits
        </div>
      </h1>
      <div className="tablet:pr-8 tablet:flex tablet:flex-col tablet:space-y-8">
        <Image
          src="/panbo-2.png"
          width={610}
          height={370}
          priority
          alt="Picture of the author"
          className="my-2 hidden hide-image-mobile:hidden show-image-mobile:block hide-image-tablet:hidden show-image-tablet:block hide-image-laptop:hidden show-image-laptop:block"
        />
        <ul className="space-y-4 tablet:space-y-8">
          {STEPS.map((step) => (
            <li key={step.id}>
              <div className="inline-flex items-center">
                <CheckCircle />
                <div className="text-lg font-bold ml-2 tablet:text-2xl laptop:text-3xl">
                  {step.step}
                </div>
              </div>
              <div className="text-base tablet:text-xl laptop:text-2xl">
                {step.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
