type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center overflow-y-auto">
      {children}
    </div>
  );
}
