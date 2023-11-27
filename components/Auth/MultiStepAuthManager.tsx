type MultiStepAuthManagerProps = {
  step: number;
  stepComponents: React.ReactNode[];
};

export default function MultiStepAuthManager({
  step,
  stepComponents,
}: MultiStepAuthManagerProps) {
  return <div className="w-full">{stepComponents[step - 1]}</div>;
}
