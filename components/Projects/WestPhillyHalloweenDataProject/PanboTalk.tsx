import { useState } from "react";
import Image from "@/components/common/Image";

type PanboTalkProps = {
  messages: string[];
};

export default function PanboTalk({ messages }: PanboTalkProps) {
  const [currentMessage, setCurrentMessage] = useState(0);

  return (
    <div className="flex justify-center items-end w-5/6 laptop:w-3/5 space-x-4 z-50">
      <div className="flex flex-col items-center space-y-3">
        <div className="flex justify-center w-full space-x-3">
          {messages.map((_message, index) => (
            <div
              key={index}
              className={`w-6 text-center border-2 border-amber-600 ${
                currentMessage === index
                  ? "bg-amber-600 text-white"
                  : "bg-white text-amber-600"
              } hover:cursor-pointer rounded-full font-bold shadow-black shadow-sm`}
              onClick={() => {
                setCurrentMessage(index);
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="w-[95px] h-[69px] laptop:w-[130px] laptop:h-[95px] mb-1">
          <Image src="/head.png" priority={true} />
        </div>
      </div>

      <div
        key={messages[currentMessage]}
        className="border-2 rounded bg-white text-sm overflow-y-auto h-[75px]"
      >
        <div className="p-2">{messages[currentMessage]}</div>
      </div>
      <div></div>
    </div>
  );
}
