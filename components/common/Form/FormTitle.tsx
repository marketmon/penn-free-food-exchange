type FormTitleProps = {
  title: string;
};

export default function FormTitle({ title }: FormTitleProps) {
  return (
    <h1 className="text-center mt-2 mb-6">{title} to continue to Penn Free Food Exchange</h1>
  );
}
