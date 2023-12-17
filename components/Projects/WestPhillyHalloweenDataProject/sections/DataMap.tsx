import dynamic from "next/dynamic";
import { RefObject, useEffect, useState } from "react";
import { WestPhillyHalloweenDataProject } from "@/lib/types";
import PanboTalk from "@/components/Projects/WestPhillyHalloweenDataProject/PanboTalk";
import halloweenData from "@/assets/projects/west-philly-halloween-data-project/data.json";

type DataMapProps = {
  sectionRef: RefObject<HTMLDivElement>;
};

const Marker = dynamic(
  () => import("@/components/Projects/WestPhillyHalloweenDataProject/Marker"),
  {
    ssr: false,
  }
);

const Map = dynamic(
  () => import("@/components/Projects/WestPhillyHalloweenDataProject/Map"),
  {
    ssr: false,
  }
);

const MESSAGES = [
  "This is a map chart, like those hotspot maps from COVID times. The spots with lots of pumpkins? We call them clusters. This one also has time!",
  "I spy 3 clusters on our map, all cozy around 44th and Osage. It's like the pumpkins are parading along with the Tot Trot route!",
  "Map charts often have clickable features. Go ahead, click a pumpkin! If you replay, you can track the paths of our 3 data detectives!",
];

export default function DataMap({ sectionRef }: DataMapProps) {
  const [markers, setMarkers] = useState<React.ReactNode[]>([]);
  const [currentTime, setCurrentTime] = useState("");
  const [hasStartedMapping, setHasStartedMapping] = useState(false);

  function createMarkersWithDelay() {
    function addMarkers(item: WestPhillyHalloweenDataProject, delay: number) {
      setTimeout(() => {
        const marker = <Marker key={item.id} item={item} />;
        setMarkers((prevMarkers) => [...prevMarkers, marker]); 
        setCurrentTime(item.timestamp);
      }, delay);
    }

    halloweenData.map((item, index) => {
      addMarkers(item, index * 35);
    });
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStartedMapping) {
          setHasStartedMapping((prevHasStartedMapping) => {
            if (!prevHasStartedMapping) {
              createMarkersWithDelay();
            }
            return true;
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStartedMapping, sectionRef]);

  return (
    <div
      ref={sectionRef}
      className="h-full flex flex-col justify-center items-center space-y-4 snap-always snap-center"
    >
      <div className="text-2xl tablet:text-3xl text-green-400 text-center font-bold mb-2">
        Where is our data centered?
      </div>
      <div className="flex flex-col justify-center items-center h-1/2 w-full">
        <div className="h-full w-full tablet:w-5/6 z-10">
          <Map markers={markers} />
        </div>
        <div>{currentTime}</div>
      </div>
      <PanboTalk messages={MESSAGES} />
    </div>
  );
}
