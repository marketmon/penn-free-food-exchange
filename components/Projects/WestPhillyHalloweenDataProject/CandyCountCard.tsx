type CandyCountCardProps = {
  color: string;
  candy: string;
  count: number;
};

export default function CandyCountCard({
  color,
  candy,
  count,
}: CandyCountCardProps) {
  return (
    <div
      className={`${color} flex self-center rounded-md text-center text-slate-100`}
    >
      <div className="flex flex-col justify-center items-center w-[100px] h-[90px]">
        <span>{candy}</span>
        <span>{count}</span>
      </div>
    </div>
  );
}
