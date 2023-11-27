export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col items-center justify-center overflow-y-auto">
      {children}
    </div>
  );
}
