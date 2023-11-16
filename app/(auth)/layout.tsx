import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
